import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, computed, signal } from '@angular/core';

type ClickStatsMap = Record<string, number>;

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
        position: fixed;
        right: 10px;
        bottom: 10px;
        z-index: 998;
        border: 1px solid rgba(201, 168, 76, 0.2);
        background: rgba(0, 0, 0, 0.55);
        color: rgba(255, 255, 255, 0.55);
        border-radius: 999px;
        padding: 0.25rem 0.55rem;
        font-size: 0.68rem;
        letter-spacing: 0.2px;
        cursor: pointer;
        opacity: 0.32;
        transition: opacity 0.2s ease, border-color 0.2s ease;
      }

      .mini-analytics:hover {
        opacity: 0.95;
        border-color: rgba(201, 168, 76, 0.55);
      }
    `,
  ],
})
export class MiniAnalyticsComponent implements OnInit, OnDestroy {
  private readonly visitsKey = 'ddf_total_visits';
  private readonly clickStatsKey = 'ddf_click_stats';
  private readonly sessionKey = 'ddf_session_counted';

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
    const currentVisits = Number(localStorage.getItem(this.visitsKey) ?? '0');
    let updatedVisits = currentVisits;

    if (!sessionStorage.getItem(this.sessionKey)) {
      updatedVisits += 1;
      localStorage.setItem(this.visitsKey, String(updatedVisits));
      sessionStorage.setItem(this.sessionKey, '1');
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

      const key = this.resolveTrackingKey(trackedElement);
      if (!key) {
        return;
      }

      const stats = this.readClickStats();
      stats[key] = (stats[key] ?? 0) + 1;
      localStorage.setItem(this.clickStatsKey, JSON.stringify(stats));
      this.clickStats.set(stats);
    };

    document.addEventListener('click', listener, { passive: true });
    this.removeClickListener = () => document.removeEventListener('click', listener);
  }

  private resolveTrackingKey(element: HTMLElement): string | null {
    const customTrack = element.dataset['track'];
    if (customTrack) {
      return customTrack;
    }

    if (element.tagName === 'A') {
      const text = (element.textContent ?? '').trim().slice(0, 40);
      return text ? `Link: ${text}` : 'Link';
    }

    if (element.tagName === 'BUTTON') {
      const text = (element.textContent ?? '').trim().slice(0, 40);
      return text ? `Botão: ${text}` : 'Botão';
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
