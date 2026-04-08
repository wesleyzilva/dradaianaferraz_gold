import { Component, computed, input, signal } from '@angular/core';

export type CarouselImage = {
  src: string;
  label: string;
  icon?: string;
  description?: string;
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

        <!-- FRAME -->
        <div class="ic-frame" role="region" aria-roledescription="carousel">
          <div
            class="ic-track"
            [style.transform]="trackTransform()"
          >
            @for (img of images(); track img.src; let i = $index) {
              <div
                class="ic-slide"
                [attr.aria-hidden]="i !== currentIndex()"
                [attr.aria-label]="img.label"
              >
                <div class="ic-img-wrap">
                  <img [src]="img.src" [alt]="img.label" class="ic-img" loading="lazy" />
                  @if (img.comingSoon) {
                    <div class="ic-overlay">
                      <span aria-hidden="true">⏱</span>
                      <span>Em Breve</span>
                    </div>
                  }
                </div>

                <div class="ic-info">
                  @if (img.icon) {
                    <span class="ic-icon" aria-hidden="true">{{ img.icon }}</span>
                  }
                  <h4 class="ic-label">
                    {{ img.label }}
                    @if (img.comingSoon) {
                      <span class="ic-badge">Em Breve</span>
                    }
                  </h4>
                  @if (img.description) {
                    <p class="ic-desc">{{ img.description }}</p>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- CONTROLS -->
        <div class="ic-controls">
          <button class="ic-btn" (click)="prev()" aria-label="Anterior">‹</button>
          <div class="ic-dots" role="tablist">
            @for (img of images(); track img.src; let i = $index) {
              <button
                class="ic-dot"
                [class.ic-dot-active]="i === currentIndex()"
                (click)="goTo(i)"
                [attr.aria-label]="img.label"
                [attr.aria-selected]="i === currentIndex()"
                role="tab"
              ></button>
            }
          </div>
          <button class="ic-btn" (click)="next()" aria-label="Próximo">›</button>
        </div>

        <p class="ic-counter" aria-live="polite">{{ currentIndex() + 1 }} / {{ images().length }}</p>
      </div>
    }
  `,
  styles: [`
    .ic-wrapper { margin: 2rem 0 0; }
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

    /* ── FRAME / TRACK ── */
    .ic-frame {
      overflow: hidden;
      border-radius: 16px;
    }
    .ic-track {
      display: flex;
      transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    /* ── SLIDE ── */
    .ic-slide {
      flex: 0 0 100%;
      min-width: 0;
    }
    .ic-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: #1a1a1a;
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
      background: rgba(0,0,0,0.65);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.6rem;
      color: var(--gold);
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      letter-spacing: 2px;
      backdrop-filter: blur(4px);
    }
    .ic-overlay i { font-size: 1.6rem; }

    /* ── INFO ── */
    .ic-info {
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.18);
      border-top: none;
      border-radius: 0 0 16px 16px;
      padding: 1rem 1.25rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .ic-icon {
      font-size: 1.5rem;
      line-height: 1;
    }
    .ic-label {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1.05rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.55rem;
      flex-wrap: wrap;
    }
    .ic-badge {
      font-family: 'Lato', sans-serif;
      font-size: 0.62rem;
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      color: var(--dark);
      padding: 0.15rem 0.55rem;
      border-radius: 20px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .ic-desc {
      color: rgba(255,255,255,0.68);
      font-size: 0.88rem;
      line-height: 1.65;
      margin: 0;
    }

    /* ── CONTROLS ── */
    .ic-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }
    .ic-btn {
      background: rgba(201,168,76,0.1);
      border: 2px solid rgba(201,168,76,0.4);
      color: var(--gold);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      transition: background 0.25s, transform 0.2s;
      flex-shrink: 0;
    }
    .ic-btn:hover { background: var(--gold); color: var(--dark); transform: scale(1.07); }

    .ic-dots {
      display: flex;
      gap: 0.45rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .ic-dot {
      width: 9px; height: 9px;
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
      margin-top: 0.35rem;
    }

    @media (max-width: 600px) {
      .ic-img-wrap { aspect-ratio: 4 / 3; }
      .ic-info { padding: 0.75rem 1rem; }
    }
  `],
})
export class ImageCarouselComponent {
  readonly images = input<CarouselImage[]>([]);
  readonly title = input('');
  readonly ariaLabel = input('Carrossel de imagens');

  readonly currentIndex = signal(0);

  readonly trackTransform = computed(() => `translateX(-${this.currentIndex() * 100}%)`);

  prev() {
    const total = this.images().length;
    this.currentIndex.update((i) => (i - 1 + total) % total);
  }

  next() {
    const total = this.images().length;
    this.currentIndex.update((i) => (i + 1) % total);
  }

  goTo(i: number) {
    this.currentIndex.set(i);
  }
}

