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

      const stats = this.readClickStats();
      stats[key] = (stats[key] ?? 0) + 1;
      localStorage.setItem(this.clickStatsKey, JSON.stringify(stats));
      this.clickStats.set(stats);

      if (window.gtag) {
        window.gtag('event', trackingMeta.eventName, {
          event_category: trackingMeta.eventCategory,
          event_label: key,
          value: 1,
        });
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: trackingMeta.eventName,
          event_category: trackingMeta.eventCategory,
          event_label: key,
          event_value: stats[key],
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
