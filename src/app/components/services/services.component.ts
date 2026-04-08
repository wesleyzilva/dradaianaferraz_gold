import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';

type Invasiveness = 'Invasivo' | 'Não invasivo';

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ImageCarouselComponent],
  template: `
    <section class="services-section" [id]="sectionId()">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">O que oferecemos</p>
          <h2 class="section-title">Serviços de Harmonização Orofacial</h2>
          <div class="gold-line"></div>

          <!-- Planejamento junto com você: Antes, Durante e Depois -->
          <div class="jornada-wrapper" aria-label="Etapas do atendimento de harmonização">
            <p class="jornada-heading">Seu atendimento: do planejamento ao acompanhamento</p>
            <div class="jornada-steps">
              <div class="jornada-step">
                <div class="jornada-icon-wrap" aria-hidden="true">📋</div>
                <h4 class="jornada-label">Antes</h4>
                <p class="jornada-desc">Avaliação facial individualizada, escuta das suas expectativas e apresentação do plano com opções e valores. Nenhum procedimento é realizado sem a sua aprovação.</p>
              </div>
              <div class="jornada-connector" aria-hidden="true">›</div>
              <div class="jornada-step">
                <div class="jornada-icon-wrap" aria-hidden="true">✨</div>
                <h4 class="jornada-label">Durante</h4>
                <p class="jornada-desc">Procedimento realizado com técnica atualizada e materiais de qualidade. Você é informada de cada etapa em tempo real, com todo o cuidado e conforto.</p>
              </div>
              <div class="jornada-connector" aria-hidden="true">›</div>
              <div class="jornada-step">
                <div class="jornada-icon-wrap" aria-hidden="true">🩺</div>
                <h4 class="jornada-label">Depois</h4>
                <p class="jornada-desc">Retorno de acompanhamento, avaliação do resultado, orientações pós-procedimento e planejamento da próxima etapa quando indicado.</p>
              </div>
            </div>
          </div>

          <div class="services-filter" role="group" aria-label="Filtrar procedimentos por tipo">
            <button
              type="button"
              class="filter-btn"
              [class.filter-btn-active]="selectedInvasiveness() === 'Não invasivo'"
              [attr.aria-pressed]="selectedInvasiveness() === 'Não invasivo'"
              (click)="setInvasiveness('Não invasivo')"
            >
              Não invasivo
            </button>
            <button
              type="button"
              class="filter-btn"
              [class.filter-btn-active]="selectedInvasiveness() === 'Invasivo'"
              [attr.aria-pressed]="selectedInvasiveness() === 'Invasivo'"
              (click)="setInvasiveness('Invasivo')"
            >
              Invasivo
            </button>
          </div>
          <p class="filter-description">{{ invasivenessDescription() }}</p>
        </div>

        <!-- Carrossel de imagens por tipo -->
        <div class="carousel-block">
          <app-image-carousel
            [images]="carouselImages()"
            [title]="carouselTitle()"
            ariaLabel="Imagens dos procedimentos de harmonização"
          ></app-image-carousel>
        </div>

        <div class="faq-strip" aria-label="Dúvidas frequentes sobre harmonização">
          <div class="faq-item">
            <span class="faq-q">💊 Dói?</span>
            <p>Procedimentos invasivos usam anestésico tópico ou local. O desconforto é mínimo e acompanhado em todo momento pela Dra. Daiana.</p>
          </div>
          <div class="faq-item">
            <span class="faq-q">⏱️ Quanto tempo leva?</span>
            <p>A maioria dos procedimentos dura 30–60 minutos. A consulta de avaliação é separada, sem compromisso imediato.</p>
          </div>
          <div class="faq-item">
            <span class="faq-q">🌱 Quando vejo resultado?</span>
            <p>Alguns resultados aparecem em dias, outros em semanas. No retorno, avaliamos juntos a evolução.</p>
          </div>
          <div class="faq-item">
            <span class="faq-q">💳 E o pagamento?</span>
            <p>O orçamento completo é apresentado antes do procedimento, sem surpresas. Parcelamento disponível.</p>
          </div>
        </div>
        <div class="services-cta" data-track="harmonizacao-whatsapp">
          <a
            [href]="harmonizacaoWhatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-harmo-wa"
            data-track="conversion_whatsapp_harmonizacao"
          >
            WhatsApp · Solicitar avaliação de Harmonização
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
    .services-filter {
      margin: 1rem auto 0.6rem;
      display: inline-flex;
      gap: 0.35rem;
      border: 1px solid rgba(201,168,76,0.4);
      border-radius: 999px;
      padding: 0.2rem;
      background: rgba(255,255,255,0.03);
    }
    .filter-btn {
      border: 0;
      background: transparent;
      color: rgba(255,255,255,0.82);
      border-radius: 999px;
      padding: 0.38rem 0.85rem;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .filter-btn-active {
      background: var(--gold);
      color: var(--dark);
    }
    .filter-description {
      margin: 0.25rem auto 0;
      max-width: 760px;
      color: rgba(255,255,255,0.72);
      font-size: 0.88rem;
      line-height: 1.65;
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
    /* Jornada Antes / Durante / Depois */
    .jornada-wrapper {
      background: rgba(201,168,76,0.06);
      border: 1px solid rgba(201,168,76,0.25);
      border-radius: 16px;
      padding: 1.5rem 1.25rem;
      margin: 1.25rem auto 1rem;
      max-width: 860px;
      width: 100%;
    }
    .jornada-heading {
      text-align: center;
      color: var(--gold);
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 1.1rem;
    }
    .jornada-steps {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 0.5rem;
    }
    .jornada-step {
      flex: 1 1 180px;
      max-width: 240px;
      text-align: center;
    }
    .jornada-icon-wrap { font-size: 1.8rem; margin-bottom: 0.4rem; }
    .jornada-label {
      color: var(--gold);
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      margin-bottom: 0.4rem;
    }
    .jornada-desc {
      color: rgba(255,255,255,0.7);
      font-size: 0.85rem;
      line-height: 1.6;
    }
    .jornada-connector {
      font-size: 1.6rem;
      color: rgba(201,168,76,0.45);
      padding-top: 1.2rem;
      flex-shrink: 0;
    }
    .carousel-block {
      margin-top: 1rem;
    }
    /* FAQ Strip harmonização */
    .faq-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 0.75rem;
      margin: 1.25rem 0 0;
      padding: 1.25rem;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(201,168,76,0.14);
      border-radius: 14px;
    }
    .faq-item { padding: 0.5rem 0.5rem 0.5rem 0; }
    .faq-q {
      display: block;
      color: var(--gold-light);
      font-weight: 700;
      font-size: 0.88rem;
      margin-bottom: 0.35rem;
    }
    .faq-item p {
      color: rgba(255,255,255,0.65);
      font-size: 0.84rem;
      line-height: 1.6;
      margin: 0;
    }
    @media (max-width: 600px) {
      .services-section { padding: 4rem 1rem; }
      .jornada-steps { flex-direction: column; align-items: center; gap: 0.25rem; }
      .jornada-connector { padding-top: 0; transform: rotate(90deg); }
    }
  `],
})
export class ServicesComponent {
  config = SITE_CONFIG;
  readonly sectionId = input('services-harmonizacao');
  readonly selectedInvasiveness = signal<Invasiveness>('Não invasivo');

  readonly carouselImages = computed(() =>
    this.selectedInvasiveness() === 'Invasivo'
      ? this.config.imagesHarmonizacaoInvasivo
      : this.config.imagesHarmonizacaoNaoInvasivo,
  );

  readonly carouselTitle = computed(() =>
    this.selectedInvasiveness() === 'Invasivo' ? 'Procedimentos Invasivos' : 'Procedimentos Não Invasivos',
  );

  readonly invasivenessDescription = computed(() =>
    this.selectedInvasiveness() === 'Não invasivo'
      ? 'Procedimentos não invasivos atuam na pele sem cortes, com recuperação mais rápida e foco em melhora progressiva de textura, viço e sustentação.'
      : 'Procedimentos invasivos envolvem aplicação injetável ou técnica minimamente invasiva, com planejamento clínico para correções estruturais e resultados mais direcionados.',
  );

  readonly harmonizacaoWhatsappUrl = `${this.config.professional.whatsapp}?text=${encodeURIComponent('Olá! Vim do site. Origem: Serviços Harmonização. Interesse: avaliação de harmonização.')}`;

  setInvasiveness(value: Invasiveness): void {
    this.selectedInvasiveness.set(value);
  }
}
