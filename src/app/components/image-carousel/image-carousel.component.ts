import { Component, computed, input, signal } from '@angular/core';

export type CarouselImage = {
  src: string;
  label: string;
  comingSoon?: boolean;
};

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  template: `
    @if (images().length > 0) {
      <div class="ic-wrapper" [attr.aria-label]="ariaLabel()">
        @if (title()) {
          <h3 class="ic-title">{{ title() }}</h3>
        }

        <div class="ic-track-outer">
          <button
            class="ic-nav ic-prev"
            (click)="prev()"
            aria-label="Imagem anterior"
            [disabled]="currentIndex() === 0"
          >
            <i class="fas fa-chevron-left" aria-hidden="true"></i>
          </button>

          <div class="ic-track">
            @for (img of visibleImages(); track img.src; let i = $index) {
              <div
                class="ic-card"
                [class.ic-card-center]="i === centerIdx()"
              >
                <div class="ic-img-wrap">
                  <img
                    [src]="img.src"
                    [alt]="img.label"
                    class="ic-img"
                    loading="lazy"
                  />
                  @if (img.comingSoon) {
                    <div class="ic-overlay">
                      <i class="fas fa-clock" aria-hidden="true"></i>
                      <span>Em Breve</span>
                    </div>
                  }
                </div>
                <p class="ic-label">
                  {{ img.label }}
                  @if (img.comingSoon) {
                    <span class="ic-badge">Em Breve</span>
                  }
                </p>
              </div>
            }
          </div>

          <button
            class="ic-nav ic-next"
            (click)="next()"
            aria-label="Próxima imagem"
            [disabled]="currentIndex() === images().length - 1"
          >
            <i class="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>

        <div class="ic-dots" role="tablist" [attr.aria-label]="'Navegação de ' + images().length + ' imagens'">
          @for (img of images(); track img.src; let i = $index) {
            <button
              class="ic-dot"
              [class.ic-dot-active]="i === currentIndex()"
              (click)="goTo(i)"
              [attr.aria-label]="'Ver imagem ' + (i + 1) + ': ' + img.label"
              [attr.aria-selected]="i === currentIndex()"
              role="tab"
            ></button>
          }
        </div>

        <p class="ic-counter" aria-live="polite">{{ currentIndex() + 1 }} / {{ images().length }}</p>
      </div>
    }
  `,
  styles: [`
    .ic-wrapper {
      margin: 2rem 0 0;
    }
    .ic-title {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 1.25rem;
    }

    /* ── TRACK ── */
    .ic-track-outer {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .ic-track {
      flex: 1;
      display: flex;
      gap: 0.75rem;
      overflow: hidden;
      min-width: 0;
    }

    /* ── CARD ── */
    .ic-card {
      flex: 0 0 calc(33.333% - 0.5rem);
      min-width: 0;
      transition: transform 0.35s ease, opacity 0.35s ease;
      opacity: 0.55;
      transform: scale(0.93);
    }
    .ic-card-center {
      opacity: 1;
      transform: scale(1);
    }
    .ic-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(201,168,76,0.2);
      background: #1a1a1a;
    }
    .ic-card-center .ic-img-wrap {
      border-color: rgba(201,168,76,0.55);
      box-shadow: 0 6px 28px rgba(201,168,76,0.18);
    }
    .ic-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .ic-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.62);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--gold);
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      letter-spacing: 1.5px;
      backdrop-filter: blur(3px);
    }
    .ic-overlay i { font-size: 1.4rem; }
    .ic-label {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.62);
      text-align: center;
      margin: 0.55rem 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      flex-wrap: wrap;
      line-height: 1.4;
    }
    .ic-card-center .ic-label { color: var(--gold); font-weight: 600; }
    .ic-badge {
      font-size: 0.62rem;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      color: var(--dark);
      padding: 0.15rem 0.5rem;
      border-radius: 20px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    /* ── NAVIGATION ── */
    .ic-nav {
      flex-shrink: 0;
      background: rgba(201,168,76,0.1);
      border: 2px solid rgba(201,168,76,0.4);
      color: var(--gold);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.25s, transform 0.2s, opacity 0.2s;
    }
    .ic-nav:hover:not(:disabled) {
      background: var(--gold);
      color: var(--dark);
      transform: scale(1.07);
    }
    .ic-nav:disabled {
      opacity: 0.25;
      cursor: default;
    }

    /* ── DOTS ── */
    .ic-dots {
      display: flex;
      justify-content: center;
      gap: 0.45rem;
      margin-top: 0.9rem;
      flex-wrap: wrap;
    }
    .ic-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      background: transparent;
      cursor: pointer;
      padding: 0;
      transition: background 0.25s, transform 0.2s;
    }
    .ic-dot-active { background: var(--gold); transform: scale(1.3); }
    .ic-counter {
      text-align: center;
      color: rgba(255,255,255,0.3);
      font-size: 0.78rem;
      margin-top: 0.4rem;
    }

    /* ── MOBILE ── */
    @media (max-width: 700px) {
      .ic-card { flex: 0 0 calc(100% - 0px); opacity: 1; transform: none; }
      .ic-card-center { transform: none; }
      .ic-track { gap: 0; }
    }
    @media (min-width: 701px) and (max-width: 1000px) {
      .ic-card { flex: 0 0 calc(50% - 0.375rem); }
    }
  `],
})
export class ImageCarouselComponent {
  readonly images = input<CarouselImage[]>([]);
  readonly title = input('');
  readonly ariaLabel = input('Carrossel de imagens');

  readonly currentIndex = signal(0);

  /** Índice do item central na janela de 3 */
  readonly centerIdx = computed(() => {
    const len = this.images().length;
    if (len <= 3) return this.currentIndex();
    return 1; // sempre o do meio na janela de 3
  });

  readonly visibleImages = computed(() => {
    const imgs = this.images();
    const idx = this.currentIndex();
    const len = imgs.length;
    if (len <= 3) return imgs;
    // janela deslizante de 3: [prev, current, next]
    const start = Math.max(0, Math.min(idx - 1, len - 3));
    return imgs.slice(start, start + 3);
  });

  prev() {
    const idx = this.currentIndex();
    if (idx > 0) this.currentIndex.set(idx - 1);
  }

  next() {
    const idx = this.currentIndex();
    if (idx < this.images().length - 1) this.currentIndex.set(idx + 1);
  }

  goTo(i: number) {
    this.currentIndex.set(i);
  }
}
