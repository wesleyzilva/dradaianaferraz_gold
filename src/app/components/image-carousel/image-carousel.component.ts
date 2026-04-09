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
      <div class="ic-wrapper" [class.ic-wrapper-showcase]="variant() === 'showcase'" [attr.aria-label]="ariaLabel()">
        @if (title()) {
          <h3 class="ic-title">{{ title() }}</h3>
        }

        <div class="ic-shell" [class.ic-shell-showcase]="variant() === 'showcase'">
          @if (variant() === 'showcase') {
            <div class="ic-controls ic-controls-showcase" aria-label="Navegação superior do carrossel">
              <button class="ic-btn ic-btn-showcase" (click)="prev()" aria-label="Anterior">‹</button>
              <button class="ic-btn ic-btn-showcase" (click)="next()" aria-label="Próximo">›</button>
            </div>
          }

          <div class="ic-frame" role="region" aria-roledescription="carousel" [class.ic-frame-portrait]="aspectRatio() === 'portrait'" [class.ic-frame-showcase]="variant() === 'showcase'">
            <div class="ic-track" [style.transform]="trackTransform()">
              @for (img of images(); track img.src; let i = $index) {
                <article class="ic-slide" [attr.aria-hidden]="i !== currentIndex()" [attr.aria-label]="img.label">
                  <div class="ic-slide-card" [class.ic-slide-card-showcase]="variant() === 'showcase'">
                    <div class="ic-img-wrap" [class.ic-img-wrap-portrait]="aspectRatio() === 'portrait'">
                      <img [src]="img.src" [alt]="img.label" class="ic-img" [class.ic-img-contain]="imageFit() === 'contain'" loading="lazy" />
                      @if (badgeText()) {
                        <div class="ic-photo-badge">{{ badgeText() }}</div>
                      }
                      @if (img.comingSoon) {
                        <div class="ic-overlay">
                          <span aria-hidden="true">⏱</span>
                          <span>Em Breve</span>
                        </div>
                      }
                    </div>

                    <div class="ic-info" [class.ic-info-showcase]="variant() === 'showcase'">
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
                </article>
              }
            </div>
          </div>

          <div class="ic-controls" [class.ic-controls-showcase]="variant() === 'showcase'">
            <button class="ic-btn" [class.ic-btn-showcase]="variant() === 'showcase'" (click)="prev()" aria-label="Anterior">‹</button>
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
            <button class="ic-btn" [class.ic-btn-showcase]="variant() === 'showcase'" (click)="next()" aria-label="Próximo">›</button>
          </div>
        </div>

        <p class="ic-counter" aria-live="polite">{{ currentIndex() + 1 }} / {{ images().length }}</p>
      </div>
    }
  `,
  styles: [`
    .ic-wrapper { margin: 2rem 0 0; }
    .ic-wrapper-showcase { margin-top: 1.5rem; }
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
    .ic-shell {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* ── FRAME / TRACK ── */
    .ic-frame {
      overflow: hidden;
      border-radius: 18px;
    }
    .ic-frame-portrait {
      max-width: 760px;
      margin: 0 auto;
    }
    .ic-frame-showcase {
      box-shadow: 0 16px 42px rgba(0, 0, 0, 0.28);
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
    .ic-slide-card {
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.18);
      border-radius: 16px;
      overflow: hidden;
    }
    .ic-slide-card-showcase {
      border-color: rgba(201,168,76,0.22);
    }
    .ic-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      background: #1a1a1a;
    }
    .ic-img-wrap-portrait {
      aspect-ratio: 4 / 5;
      min-height: clamp(380px, 65vw, 640px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
      background: linear-gradient(135deg, rgba(18,18,18,0.98), rgba(42,31,10,0.95));
    }
    .ic-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .ic-img-contain {
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
      border-radius: 12px;
      background: #111;
    }
    .ic-photo-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--gold);
      color: var(--dark);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 1;
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

    /* ── INFO ── */
    .ic-info {
      background: var(--dark-light);
      padding: 1rem 1.25rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .ic-info-showcase {
      padding: 1.25rem 1.5rem 1.5rem;
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
      margin-top: 0.25rem;
    }
    .ic-controls-showcase {
      justify-content: space-between;
      width: 100%;
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
    .ic-btn-showcase {
      width: 44px;
      height: 44px;
      font-size: 1.6rem;
      border-width: 1px;
      background: rgba(26,26,26,0.9);
    }
    .ic-btn:hover { background: rgba(201,168,76,0.15); transform: scale(1.04); }

    .ic-dots {
      display: flex;
      gap: 0.45rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .ic-dot {
      width: 9px;
      height: 9px;
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
      .ic-wrapper {
        margin: 1.2rem 0 0;
        padding: 0 0.5rem;
      }
      .ic-shell {
        gap: 0.5rem;
      }
      .ic-frame {
        max-width: 100vw;
        margin: 0 auto;
      }
      .ic-img-wrap { aspect-ratio: 4 / 3; }
      .ic-img-wrap-portrait {
        min-height: 220px;
        padding: 0.25rem;
      }
      .ic-info,
      .ic-info-showcase { padding: 0.7rem 0.5rem 0.8rem; }
      .ic-controls,
      .ic-controls-showcase {
        gap: 0.5rem;
        justify-content: center;
      }
      .ic-dots {
        gap: 0.25rem;
      }
      .ic-slide-card {
        border-radius: 10px;
      }
    }
  `],
})
export class ImageCarouselComponent {
  readonly images = input<CarouselImage[]>([]);
  readonly title = input('');
  readonly ariaLabel = input('Carrossel de imagens');
  readonly aspectRatio = input<'landscape' | 'portrait'>('landscape');
  readonly imageFit = input<'cover' | 'contain'>('cover');
  readonly variant = input<'default' | 'showcase'>('default');
  readonly badgeText = input('');

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

