import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, signal } from '@angular/core';

type ClickStatsMap = Record<string, number>;

type TrackingMeta = {
  key: string;
  eventName: string;
  eventCategory: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

@Component({
  selector: 'app-mini-analytics',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="mini-analytics"
      [attr.title]="tooltipText()"
      aria-label="Resumo de acessos e cliques"
      (click)="showTopClicks()"
    >
      <span>Acessos: {{ visits() }}</span>
    </button>
  `,
  styles: [
    `
      .mini-analytics {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(201, 168, 76, 0.28);
        background: rgba(201, 168, 76, 0.08);
        color: rgba(255, 255, 255, 0.78);
        border-radius: 999px;
        padding: 0.34rem 0.7rem;
        font-size: 0.75rem;
        letter-spacing: 0.2px;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease;
      }

      .mini-analytics:hover {
        background: rgba(201, 168, 76, 0.14);
        border-color: rgba(201, 168, 76, 0.45);
      }
    `,
  ],
})
export class MiniAnalyticsComponent implements OnInit, OnDestroy {
  private readonly visitsKey = 'ddf_total_visits';
  private readonly clickStatsKey = 'ddf_click_stats';
  private readonly sessionKey = 'ddf_session_counted';
  private readonly firstVisitKey = 'ddf_first_visit';
  private readonly visitLogKey = 'ddf_visit_log';
  private readonly ipLogKey = 'ddf_ip_log';

  readonly visits = signal(0);
  readonly clickStats = signal<ClickStatsMap>({});

  readonly tooltipText = computed(() => {
    const top = this.getTopClicks(3);
    if (top.length === 0) {
      return `Acessos: ${this.visits()} · Clique para ver cliques mais frequentes`;
    }

    const topText = top.map(([key, count]) => `${key} (${count})`).join(' · ');
    return `Acessos: ${this.visits()} · Mais clicados: ${topText}`;
  });

  private removeClickListener?: () => void;

  ngOnInit(): void {
    this.initVisits();
    this.initClickStats();
    this.attachClickTracking();
    this.fetchAndStoreIp();
  }

  ngOnDestroy(): void {
    this.removeClickListener?.();
  }

  showTopClicks(): void {
    const top = this.getTopClicks(5);
    if (top.length === 0) {
      window.alert('Ainda não há cliques registrados.');
      return;
    }

    const lines = top.map(([key, count], index) => `${index + 1}. ${key}: ${count}`);
    window.alert(`Áreas mais clicadas:\n\n${lines.join('\n')}`);
  }

  private initVisits(): void {
    const now = new Date().toISOString();
    const currentVisits = Number(localStorage.getItem(this.visitsKey) ?? '0');
    let updatedVisits = currentVisits;

    if (!localStorage.getItem(this.firstVisitKey)) {
      localStorage.setItem(this.firstVisitKey, now);
    }

    if (!sessionStorage.getItem(this.sessionKey)) {
      updatedVisits += 1;
      localStorage.setItem(this.visitsKey, String(updatedVisits));
      sessionStorage.setItem(this.sessionKey, '1');

      const rawLog = localStorage.getItem(this.visitLogKey);
      const log: string[] = rawLog ? (JSON.parse(rawLog) as string[]) : [];
      log.push(now);
      if (log.length > 100) { log.splice(0, log.length - 100); }
      localStorage.setItem(this.visitLogKey, JSON.stringify(log));
    }

    this.visits.set(updatedVisits);
  }

  private initClickStats(): void {
    this.clickStats.set(this.readClickStats());
  }

  /** Obtém o IP público do visitante (via ipify.org) e salva no localStorage. */
  private fetchAndStoreIp(): void {
    const sessionIpKey = 'ddf_session_ip';
    if (sessionStorage.getItem(sessionIpKey)) return;

    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then((data: { ip: string }) => {
        const rawLog = localStorage.getItem(this.ipLogKey);
        const log: Array<{ ip: string; ts: string; ua: string }> = rawLog
          ? (JSON.parse(rawLog) as Array<{ ip: string; ts: string; ua: string }>)
          : [];

        const now = new Date().toISOString();
        const ua  = navigator.userAgent.slice(0, 140);
        const lastIp = log.length > 0 ? log[log.length - 1].ip : null;

        if (lastIp !== data.ip) {
          log.push({ ip: data.ip, ts: now, ua });
          if (log.length > 50) log.splice(0, log.length - 50);
          localStorage.setItem(this.ipLogKey, JSON.stringify(log));
        }

        sessionStorage.setItem(sessionIpKey, data.ip);

        if (window.dataLayer) {
          window.dataLayer.push({ event: 'visitor_ip', visitor_ip: data.ip });
        }
      })
      .catch(() => { /* ipify indisponível — falha silenciosa */ });
  }

  private attachClickTracking(): void {
    const listener = (event: Event): void => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const trackedElement = target.closest<HTMLElement>('[data-track],a,button');
      if (!trackedElement) {
        return;
      }

      const trackingMeta = this.resolveTrackingMeta(trackedElement);
      if (!trackingMeta) {
        return;
      }

      const key = trackingMeta.key;

      const anchorEl = trackedElement.tagName === 'A'
        ? trackedElement
        : trackedElement.closest('a');
      const destinationUrl = anchorEl?.getAttribute('href') ?? undefined;

      const stats = this.readClickStats();
      stats[key] = (stats[key] ?? 0) + 1;
      localStorage.setItem(this.clickStatsKey, JSON.stringify(stats));
      this.clickStats.set(stats);

      if (window.gtag) {
        window.gtag('event', trackingMeta.eventName, {
          event_category: trackingMeta.eventCategory,
          event_label: key,
          value: 1,
          ...(destinationUrl ? { outbound_url: destinationUrl } : {}),
        });
        // Google Ads: dispara conversão em todos os cliques de WhatsApp
        if (trackingMeta.eventCategory === 'lead' && key.includes('whatsapp')) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-10874062456/ijghCNfp2pkcEPiMlMEo',
            ...(destinationUrl ? { outbound_url: destinationUrl } : {}),
          });
        }
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: trackingMeta.eventName,
          event_category: trackingMeta.eventCategory,
          event_label: key,
          event_value: stats[key],
          ...(destinationUrl ? { outbound_url: destinationUrl } : {}),
        });
      }
    };

    document.addEventListener('click', listener, { passive: true });
    this.removeClickListener = () => document.removeEventListener('click', listener);
  }

  private resolveTrackingMeta(element: HTMLElement): TrackingMeta | null {
    const customTrack = element.dataset['track'];
    if (customTrack) {
      if (customTrack.includes('whatsapp')) {
        return { key: customTrack, eventName: 'generate_lead', eventCategory: 'lead' };
      }
      if (customTrack.includes('route')) {
        return { key: customTrack, eventName: 'route_click', eventCategory: 'location' };
      }
      if (customTrack.includes('uber')) {
        return { key: customTrack, eventName: 'uber_click', eventCategory: 'location' };
      }
      if (customTrack.includes('phone')) {
        return { key: customTrack, eventName: 'generate_lead', eventCategory: 'lead' };
      }
      if (customTrack.includes('email')) {
        return { key: customTrack, eventName: 'contact_click', eventCategory: 'contact' };
      }
      if (customTrack.startsWith('social_')) {
        return { key: customTrack, eventName: 'social_click', eventCategory: 'social' };
      }
      if (customTrack.startsWith('legal_')) {
        return { key: customTrack, eventName: 'page_view_legal', eventCategory: 'legal' };
      }
      return { key: customTrack, eventName: 'engagement_click', eventCategory: 'engagement' };
    }

    if (element.tagName === 'A') {
      const href = element.getAttribute('href') ?? '';
      if (href.includes('wa.me')) {
        return { key: 'link_whatsapp', eventName: 'generate_lead', eventCategory: 'lead' };
      }
      if (href.includes('uber.com')) {
        return { key: 'link_uber', eventName: 'uber_click', eventCategory: 'location' };
      }
      if (href.includes('google.com/maps/dir')) {
        return { key: 'link_route_maps', eventName: 'route_click', eventCategory: 'location' };
      }
      if (href.includes('linkedin.com')) {
        return { key: 'social_linkedin', eventName: 'social_click', eventCategory: 'social' };
      }
      if (href.includes('instagram.com')) {
        return { key: 'social_instagram', eventName: 'social_click', eventCategory: 'social' };
      }
      if (href.includes('doctoralia')) {
        return { key: 'social_doctoralia', eventName: 'social_click', eventCategory: 'social' };
      }
      if (href.includes('business.google') || href.includes('g.page')) {
        return { key: 'social_google_business', eventName: 'social_click', eventCategory: 'social' };
      }
      if (href.startsWith('tel:')) {
        return { key: 'conversion_phone', eventName: 'generate_lead', eventCategory: 'lead' };
      }
      if (href.startsWith('mailto:')) {
        return { key: 'conversion_email', eventName: 'contact_click', eventCategory: 'contact' };
      }
      const text = (element.textContent ?? '').trim().slice(0, 40);
      const key = text ? `Link: ${text}` : 'Link';
      return { key, eventName: 'engagement_click', eventCategory: 'engagement' };
    }

    if (element.tagName === 'BUTTON') {
      const text = (element.textContent ?? '').trim().slice(0, 40);
      const key = text ? `Botão: ${text}` : 'Botão';
      return { key, eventName: 'engagement_click', eventCategory: 'engagement' };
    }

    return null;
  }

  private readClickStats(): ClickStatsMap {
    const value = localStorage.getItem(this.clickStatsKey);
    if (!value) {
      return {};
    }

    try {
      return JSON.parse(value) as ClickStatsMap;
    } catch {
      return {};
    }
  }

  private getTopClicks(limit: number): Array<[string, number]> {
    return Object.entries(this.clickStats())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }
}
