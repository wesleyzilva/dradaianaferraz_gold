import { Component, computed, input } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-gold-card',
  standalone: true,
  template: `
    <section class="gold-card-section" [id]="sectionId()">
      <div class="section-container">
        <div class="card-wrapper">
          <!-- Decorative background elements -->
          <div class="card-bg-circle card-bg-circle--1"></div>
          <div class="card-bg-circle card-bg-circle--2"></div>

          <div class="card-content">
            <div class="card-badge">
              <i class="fas fa-crown"></i> Exclusivo
            </div>
            <h2 class="card-title">{{ activeCard().title }}</h2>
            <p class="card-subtitle">{{ activeCard().subtitle }}</p>
            <p class="card-description">{{ activeCard().description }}</p>

            <ul class="benefits-list">
              @for (benefit of activeCard().benefits; track benefit) {
                <li class="benefit-item">
                  <span class="benefit-check"><i class="fas fa-check"></i></span>
                  @if (benefit.includes(hoverTriggerText())) {
                    <span>
                      {{ benefitBeforeTrigger(benefit) }}
                      <span class="benefit-tooltip-trigger" tabindex="0">
                        {{ hoverTriggerText() }}
                        <span class="benefit-tooltip" role="note">
                          <span class="benefit-tooltip-title">Serviços elegíveis</span>
                          <ul class="benefit-tooltip-list">
                            @for (service of discountEligibleServices(); track service) {
                              <li>{{ service }}</li>
                            }
                          </ul>
                        </span>
                      </span>
                      {{ benefitAfterTrigger(benefit) }}
                    </span>
                  } @else {
                    <span>{{ benefit }}</span>
                  }
                </li>
              }
            </ul>

            <a [href]="whatsappUrl" target="_blank" class="btn-gold-cta">
              <i class="fab fa-whatsapp"></i>
              {{ activeCard().ctaText }}
            </a>
          </div>

          <div class="card-visual">
            <div class="gold-card-visual">
              <div class="gc-top">
                <i class="fas fa-crown gc-crown"></i>
                <span class="gc-label">{{ visualLabel() }}</span>
              </div>
              <div class="gc-name">{{ config.professional.name }}</div>
              <div class="gc-tagline">{{ visualTagline() }}</div>
              <div class="gc-discount">
                <span class="gc-discount-value">{{ visualDiscountValue() }}</span>
                <span class="gc-discount-label">{{ visualDiscountLabel() }}</span>
              </div>
              <div class="gc-footer">
                <span>{{ visualFooter() }}</span>
                <i class="fas fa-gem"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gold-card-section {
      background: linear-gradient(135deg, #0d0d0d 0%, #1a1200 50%, #0d0d0d 100%);
      padding: 6rem 2rem;
      position: relative;
      overflow: hidden;
    }
    .section-container {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    .card-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
    }
    .card-bg-circle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
    .card-bg-circle--1 {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
      top: -200px;
      left: -200px;
    }
    .card-bg-circle--2 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
      bottom: -150px;
      right: -100px;
    }

    /* Content side */
    .card-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(201,168,76,0.15);
      border: 1px solid rgba(201,168,76,0.4);
      color: var(--gold);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      margin-bottom: 1.5rem;
    }
    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4vw, 3rem);
      color: var(--white);
      margin-bottom: 0.75rem;
      line-height: 1.2;
    }
    .card-subtitle {
      color: var(--gold);
      font-size: 1.05rem;
      margin-bottom: 1rem;
      font-style: italic;
    }
    .card-description {
      color: rgba(255,255,255,0.75);
      line-height: 1.8;
      margin-bottom: 2rem;
      font-size: 1rem;
    }
    .benefits-list {
      list-style: none;
      padding: 0;
      margin: 0 0 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .benefit-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: rgba(255,255,255,0.85);
      font-size: 0.95rem;
    }
    .benefit-tooltip-trigger {
      position: relative;
      color: var(--gold-light);
      text-decoration: underline;
      text-decoration-style: dotted;
      cursor: help;
      outline: none;
    }
    .benefit-tooltip {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 0.45rem);
      transform: translateX(-50%);
      min-width: 290px;
      max-width: min(90vw, 360px);
      padding: 0.7rem 0.8rem;
      border-radius: 10px;
      border: 1px solid rgba(201,168,76,0.45);
      background: rgba(22, 22, 22, 0.98);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.45);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.18s ease, visibility 0.18s ease;
      z-index: 8;
    }
    .benefit-tooltip-trigger:hover .benefit-tooltip,
    .benefit-tooltip-trigger:focus .benefit-tooltip {
      opacity: 1;
      visibility: visible;
    }
    .benefit-tooltip-title {
      display: block;
      color: var(--gold);
      font-size: 0.78rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
    }
    .benefit-tooltip-list {
      margin: 0;
      padding-left: 1rem;
      color: rgba(255,255,255,0.92);
      font-size: 0.8rem;
      line-height: 1.45;
    }
    .benefit-check {
      width: 22px;
      height: 22px;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .benefit-check i {
      color: var(--dark);
      font-size: 0.65rem;
      font-weight: 900;
    }
    .btn-gold-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: var(--dark);
      padding: 1rem 2.25rem;
      border-radius: 35px;
      text-decoration: none;
      font-weight: 800;
      font-size: 1.05rem;
      transition: transform 0.3s, box-shadow 0.3s;
      box-shadow: 0 6px 25px rgba(201,168,76,0.45);
      letter-spacing: 0.5px;
    }
    .btn-gold-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(201,168,76,0.55);
    }
    .btn-gold-cta i { font-size: 1.2rem; }

    /* Gold Card Visual */
    .card-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .gold-card-visual {
      width: 360px;
      height: 220px;
      background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 30%, #A07D28 60%, #C9A84C 100%);
      border-radius: 20px;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow:
        0 20px 60px rgba(201,168,76,0.5),
        0 0 0 1px rgba(255,255,255,0.15) inset,
        inset 0 1px 0 rgba(255,255,255,0.3);
      position: relative;
      overflow: hidden;
      transform: rotate(-3deg);
      transition: transform 0.4s;
    }
    .gold-card-visual:hover { transform: rotate(0deg) scale(1.02); }
    .gold-card-visual::before {
      content: '';
      position: absolute;
      top: -40px;
      right: -40px;
      width: 160px;
      height: 160px;
      background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
      border-radius: 50%;
    }
    .gc-top {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .gc-crown {
      color: var(--dark);
      font-size: 1.2rem;
    }
    .gc-label {
      color: var(--dark);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    .gc-name {
      font-family: 'Playfair Display', serif;
      color: var(--dark);
      font-size: 1rem;
      font-weight: 700;
    }
    .gc-tagline {
      color: rgba(26,26,26,0.7);
      font-size: 0.75rem;
      letter-spacing: 1px;
    }
    .gc-discount {
      display: flex;
      align-items: baseline;
      gap: 0.2rem;
    }
    .gc-discount-value {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--dark);
      line-height: 1;
    }
    .gc-discount-label {
      font-size: 1rem;
      font-weight: 800;
      color: var(--dark);
    }
    .gc-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(26,26,26,0.2);
      padding-top: 0.5rem;
      color: rgba(26,26,26,0.8);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .gc-footer i { font-size: 0.9rem; color: var(--dark); }

    @media (max-width: 900px) {
      .card-wrapper { grid-template-columns: 1fr; gap: 3rem; }
      .card-visual { order: -1; }
      .gold-card-visual { width: 320px; height: 195px; transform: rotate(-2deg); }
    }
    @media (max-width: 500px) {
      .gold-card-section { padding: 4rem 1rem; }
      .gold-card-visual { width: 280px; height: 175px; }
      .gc-discount-value { font-size: 1.8rem; }
    }
  `],
})
export class GoldCardComponent {
  config = SITE_CONFIG;
  readonly cardType = input<'gold' | 'fidelity'>('gold');

  readonly hoverTriggerText = computed(() =>
    this.cardType() === 'fidelity'
      ? 'serviços de odontologia selecionados'
      : 'serviços de harmonização selecionados',
  );

  readonly discountEligibleServices = computed<string[]>(() =>
    this.cardType() === 'fidelity'
      ? [
          'Prevenção Bucal com Câmera Intraoral',
          'Clareamento Dental',
          'Facetas de Resina',
          'Implantes Dentários',
          'Prótese Dentária',
        ]
      : [
          'Ultrassom Microfocado',
          'Toxina Botulínica (Botox)',
          'Preenchimento Labial',
          'Skinbooster',
          'Bioestimuladores de Colágeno',
        ],
  );

  readonly activeCard = computed(() =>
    this.cardType() === 'fidelity' ? this.config.fidelityCard : this.config.goldCard,
  );

  readonly sectionId = computed(() => (this.cardType() === 'fidelity' ? 'fidelity-card' : 'gold-card'));

  readonly visualLabel = computed(() =>
    this.cardType() === 'fidelity' ? 'Cartão Fidelidade' : 'Cartão Ouro',
  );

  readonly visualTagline = computed(() =>
    this.cardType() === 'fidelity' ? 'Odontologia VIP' : 'Harmonização Orofacial Premium',
  );

  readonly visualDiscountValue = computed(() => (this.cardType() === 'fidelity' ? 'VIP' : 'OURO'));

  readonly visualDiscountLabel = computed(() => (this.cardType() === 'fidelity' ? 'DESC.' : 'VIP'));

  readonly visualFooter = computed(() =>
    this.cardType() === 'fidelity'
      ? 'Retorno em até 12 meses + indicação/família'
      : 'Benefícios exclusivos para Harmonização',
  );

  get whatsappUrl(): string {
    const msg = encodeURIComponent(this.activeCard().whatsappMessage);
    return `${this.config.professional.whatsapp}?text=${msg}`;
  }

  benefitBeforeTrigger(benefit: string): string {
    const trigger = this.hoverTriggerText();
    const triggerStart = benefit.indexOf(trigger);
    if (triggerStart < 0) {
      return benefit;
    }

    return benefit.slice(0, triggerStart);
  }

  benefitAfterTrigger(benefit: string): string {
    const trigger = this.hoverTriggerText();
    const triggerStart = benefit.indexOf(trigger);
    if (triggerStart < 0) {
      return '';
    }

    return benefit.slice(triggerStart + trigger.length);
  }
}
