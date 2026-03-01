import { Component, input } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section class="services-section" [id]="sectionId()">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">O que oferecemos</p>
          <h2 class="section-title">Serviços de Alta Performance</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">
            Procedimentos de harmonização realizados sem ingestão de produtos e com máquinas de
            tecnologia dermatológica, em uma abordagem personalizada para valorizar sua beleza com
            naturalidade e segurança.
          </p>
        </div>
        <div class="services-grid">
          @for (service of config.services; track service.title) {
            <div class="service-card">
              <span class="service-icon">{{ service.icon }}</span>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-desc">{{ service.description }}</p>
            </div>
          }
        </div>
        <div class="services-cta" data-track="harmonizacao-whatsapp">
          <a
            [href]="harmonizacaoWhatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-harmo-wa"
            data-track="conversion_whatsapp_harmonizacao"
          >
            <i class="fab fa-whatsapp"></i>
            Solicitar avaliação de Harmonização
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      background: var(--dark-light);
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
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .services-cta {
      margin-top: 1.4rem;
      text-align: center;
    }
    .btn-harmo-wa {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.2rem;
      border-radius: 999px;
      background: #25D366;
      color: #fff;
      font-size: 0.9rem;
      font-weight: 700;
      text-decoration: none;
    }
    .service-card {
      background: var(--dark);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      padding: 2rem;
      text-align: center;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .service-card:hover {
      transform: translateY(-6px);
      border-color: var(--gold);
      box-shadow: 0 12px 40px rgba(201,168,76,0.15);
    }
    .service-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 1rem;
    }
    .service-title {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1.15rem;
      margin-bottom: 0.75rem;
    }
    .service-desc {
      color: rgba(255,255,255,0.7);
      font-size: 0.92rem;
      line-height: 1.7;
    }
    @media (max-width: 600px) {
      .services-section { padding: 4rem 1rem; }
      .services-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class ServicesComponent {
  config = SITE_CONFIG;
  readonly sectionId = input('services-harmonizacao');
  readonly harmonizacaoWhatsappUrl = `${this.config.professional.whatsapp}?text=${encodeURIComponent('Oi, quero marcar uma avaliação de harmonização.')}`;
}
