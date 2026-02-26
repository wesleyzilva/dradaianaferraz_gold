import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="products-section" id="products">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Qualidade & Excelência</p>
          <h2 class="section-title">Linha Anna Pegova</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">
            Priorizamos protocolos com foco na linha profissional Anna Pegova,
            associando tecnologia dermocosmética, segurança e alta performance em cada atendimento.
          </p>
          <div class="anna-callout" data-track="anna-pegova-amostras">
            <i class="fas fa-vial"></i>
            <p>
              Descubra a experiência Anna Pegova no conforto da sua casa: solicite amostras e uma
              demonstração personalizada. Fórmulas premium, seguras e eficazes para realçar o melhor da sua
              pele, inclusive as mais sensíveis.
            </p>
            <a [href]="annaPegovaWhatsappUrl" target="_blank" rel="noopener noreferrer" class="anna-cta">
              <i class="fab fa-whatsapp"></i>
              Solicite amostras
            </a>
          </div>
        </div>

        <div class="carousel-shell">
          <button type="button" class="carousel-btn" aria-label="Foto anterior" (click)="previousSlide()">
            ‹
          </button>

          <div class="carousel-frame">
            <div class="carousel-track" [style.transform]="carouselTransform()">
              @for (product of config.products; track product.name) {
                <article class="slide-card">
                  <div class="product-image-wrapper">
                    <img [src]="product.image" [alt]="product.name" class="product-image" />
                    <div class="product-badge">Anna Pegova</div>
                  </div>
                  <div class="product-info">
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-desc">{{ product.description }}</p>
                  </div>
                </article>
              }
            </div>
          </div>

          <button type="button" class="carousel-btn" aria-label="Próxima foto" (click)="nextSlide()">
            ›
          </button>
        </div>

        <div class="carousel-dots" role="tablist" aria-label="Selecionar foto do produto">
          @for (product of config.products; track product.name; let i = $index) {
            <button
              type="button"
              class="dot"
              [class.dot-active]="currentIndex() === i"
              [attr.aria-label]="'Ver ' + product.name"
              [attr.aria-selected]="currentIndex() === i"
              (click)="goToSlide(i)"
            ></button>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .products-section {
      background: var(--dark);
      padding: 6rem 2rem;
    }
    .section-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-header {
      text-align: center;
      margin-bottom: 3.5rem;
    }
    .section-eyebrow {
      color: var(--gold);
      font-size: 0.85rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 3.5vw, 2.8rem);
      color: var(--white);
      margin-bottom: 0.75rem;
    }
    .gold-line {
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, var(--gold), var(--gold-light));
      margin: 0 auto 1.5rem;
      border-radius: 2px;
    }
    .section-subtitle {
      color: rgba(255,255,255,0.65);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.8;
    }
    .anna-callout {
      margin: 1.5rem auto 0;
      max-width: 760px;
      border: 1px solid rgba(201,168,76,0.3);
      background: rgba(201,168,76,0.08);
      border-radius: 14px;
      padding: 1rem 1.1rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      align-items: center;
    }
    .anna-callout > i {
      color: var(--gold);
      font-size: 1.1rem;
    }
    .anna-callout p {
      color: rgba(255,255,255,0.82);
      text-align: center;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    .anna-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: #25D366;
      color: #fff;
      text-decoration: none;
      padding: 0.55rem 1rem;
      border-radius: 999px;
      font-size: 0.88rem;
      font-weight: 700;
    }
    .carousel-shell {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 1rem;
      align-items: center;
    }
    .carousel-frame {
      overflow: hidden;
      border-radius: 18px;
    }
    .carousel-track {
      display: flex;
      transition: transform 0.35s ease;
      will-change: transform;
    }
    .slide-card {
      min-width: 100%;
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      overflow: hidden;
    }
    .carousel-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.5);
      background: rgba(26,26,26,0.9);
      color: var(--gold);
      font-size: 1.6rem;
      line-height: 1;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .carousel-btn:hover {
      background: rgba(201,168,76,0.15);
      transform: scale(1.04);
    }
    .product-image-wrapper {
      position: relative;
      overflow: hidden;
    }
    .product-image {
      width: 100%;
      height: min(52vw, 420px);
      object-fit: cover;
      display: block;
    }
    .product-badge {
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
    }
    .product-info {
      padding: 1.25rem 1.5rem 1.5rem;
    }
    .product-name {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1.05rem;
      margin-bottom: 0.5rem;
    }
    .product-desc {
      color: rgba(255,255,255,0.65);
      font-size: 0.88rem;
      line-height: 1.6;
    }
    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.6);
      background: transparent;
      cursor: pointer;
    }
    .dot-active {
      background: var(--gold);
    }
    @media (max-width: 600px) {
      .products-section { padding: 4rem 1rem; }
      .carousel-shell {
        grid-template-columns: 1fr;
      }
      .carousel-btn {
        justify-self: center;
      }
    }
  `],
})
export class ProductsComponent {
  config = SITE_CONFIG;
  readonly currentIndex = signal(0);
  readonly annaPegovaWhatsappUrl = `${this.config.professional.whatsapp}?text=${encodeURIComponent('Oi, quero marcar um papo sobre as amostras dos produtos Anna Pegova.')}`;

  readonly carouselTransform = computed(() => `translateX(-${this.currentIndex() * 100}%)`);

  previousSlide(): void {
    const total = this.config.products.length;
    this.currentIndex.update((index) => (index - 1 + total) % total);
  }

  nextSlide(): void {
    const total = this.config.products.length;
    this.currentIndex.update((index) => (index + 1) % total);
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
  }
}
