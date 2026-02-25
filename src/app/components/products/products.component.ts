import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-products',
  standalone: true,
  template: `
    <section class="products-section" id="products">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Qualidade & Excelência</p>
          <h2 class="section-title">Produtos Anna Pegova</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">
            Priorizamos protocolos com foco na linha profissional Anna Pegova,
            associando tecnologia dermocosmética, segurança e alta performance em cada atendimento.
          </p>
        </div>
        <div class="products-grid">
          @for (product of config.products; track product.name) {
            <div class="product-card">
              <div class="product-image-wrapper">
                <img [src]="product.image" [alt]="product.name" class="product-image" />
                <div class="product-badge">Premium</div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-desc">{{ product.description }}</p>
              </div>
            </div>
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
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
    }
    .product-card {
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
    }
    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(201,168,76,0.15);
      border-color: var(--gold);
    }
    .product-image-wrapper {
      position: relative;
      overflow: hidden;
    }
    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
      transition: transform 0.4s;
    }
    .product-card:hover .product-image { transform: scale(1.05); }
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
    @media (max-width: 600px) {
      .products-section { padding: 4rem 1rem; }
      .products-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 400px) {
      .products-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class ProductsComponent {
  config = SITE_CONFIG;
}
