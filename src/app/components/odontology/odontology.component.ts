import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';

@Component({
  selector: 'app-odontology',
  standalone: true,
  imports: [ImageCarouselComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="odontology-section" [id]="sectionId()">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Saúde bucal e sorriso</p>
          <h2 class="section-title">{{ config.odontology.title }}</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">{{ config.odontology.subtitle }}</p>
        </div>

        <div class="odonto-intro-callout" aria-label="Como funciona a consulta">
          <div class="callout-main">
            <span class="callout-icon" aria-hidden="true">🦷</span>
            <p>Cada consulta começa com <strong>câmera intraoral</strong>: você vê em tempo real o que a Dra. Daiana vê, recebe um diagnóstico visual e um plano de cuidado completo — com todas as opções e valores — antes de qualquer decisão.</p>
          </div>
          <div class="callout-faq">
            <div class="faq-item">
              <span class="faq-q">🪥 Com que frequência?</span>
              <p>A cada 6 meses para limpeza e prevenção. Tratamentos têm retorno definido no seu plano individual.</p>
            </div>
            <div class="faq-item">
              <span class="faq-q">✅ Tratamento é seguro?</span>
              <p>Sim, baseado na avaliação bucal e da saúde do paciente antes de qualquer protocolo.</p>
            </div>
            <div class="faq-item">
              <span class="faq-q">💳 Como é o pagamento?</span>
              <p>Orçamento apresentado antes de qualquer procedimento, sem surpresas. Parcelamento disponível.</p>
            </div>
          </div>
        </div>

        <div class="carousel-block">
          <app-image-carousel
            [images]="config.imagesOdontologia"
            title="Conheça os Procedimentos"
            ariaLabel="Imagens dos procedimentos odontológicos"
          ></app-image-carousel>
        </div>

        <div class="odonto-cta" data-track="odontologia-whatsapp">
          <a
            [href]="odontologiaWhatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-odonto-wa"
            data-track="conversion_whatsapp_odontologia"
          >
            WhatsApp · Solicitar avaliação com dentista
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .odontology-section {
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
        color: rgba(255, 255, 255, 0.65);
        max-width: 680px;
        margin: 0 auto;
        line-height: 1.8;
      }

      .carousel-block {
        margin-top: 0.75rem;
      }

      .odonto-cta {
        margin-top: 1.5rem;
        text-align: center;
      }

      .btn-odonto-wa {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #25D366;
        color: #fff;
        text-decoration: none;
        border-radius: 999px;
        padding: 0.75rem 1.2rem;
        font-weight: 700;
        font-size: 0.9rem;
      }

      /* Intro callout odontologia */
      .odonto-intro-callout {
        background: rgba(201,168,76,0.07);
        border: 1px solid rgba(201,168,76,0.25);
        border-radius: 16px;
        padding: 1.5rem;
        margin: 0 auto 2rem;
        max-width: 860px;
      }
      .callout-main {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.1rem;
        padding-bottom: 1.1rem;
        border-bottom: 1px solid rgba(201,168,76,0.18);
      }
      .callout-icon {
        font-size: 1.75rem;
        flex-shrink: 0;
        margin-top: 0.1rem;
      }
      .callout-main p {
        color: rgba(255,255,255,0.82);
        font-size: 0.95rem;
        line-height: 1.7;
        margin: 0;
      }
      .callout-main strong { color: var(--gold-light); }
      .callout-faq {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
      }
      .faq-item { padding: 0; }
      .faq-q {
        display: block;
        color: var(--gold-light);
        font-weight: 700;
        font-size: 0.85rem;
        margin-bottom: 0.3rem;
      }
      .faq-item p {
        color: rgba(255,255,255,0.62);
        font-size: 0.83rem;
        line-height: 1.6;
        margin: 0;
      }
      @media (max-width: 700px) {
        .callout-faq { grid-template-columns: 1fr; }
      }
      @media (max-width: 600px) {
        .odontology-section {
          padding: 4rem 1rem;
        }
      }
    `,
  ],
})
export class OdontologyComponent {
  config = SITE_CONFIG;
  readonly sectionId = input('services-odontologia');
  readonly odontologiaWhatsappUrl = `${this.config.professional.whatsapp}?text=${encodeURIComponent('Olá! Vim do site. Origem: Serviços Odontologia. Interesse: avaliação odontológica.')}`;
}
