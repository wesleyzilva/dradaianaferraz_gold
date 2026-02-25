import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-odontology',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="odontology-section" id="services">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Saúde bucal e sorriso</p>
          <h2 class="section-title">{{ config.odontology.title }}</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">{{ config.odontology.subtitle }}</p>
        </div>

        <div class="odontology-grid">
          @for (service of generalServices; track service.title) {
            <article class="odontology-card">
              <span class="odontology-icon" aria-hidden="true">{{ service.icon }}</span>
              <h3 class="odontology-title">{{ service.title }}</h3>
              <p class="odontology-description">{{ service.description }}</p>
            </article>
          }
        </div>

        @if (orthodonticsService) {
          <div class="specialty-section">
            <div class="specialty-header">
              <p class="section-eyebrow">Especialidade</p>
              <h3 class="specialty-title">Ortodontia</h3>
            </div>
            <article class="specialty-card">
              <span class="odontology-icon" aria-hidden="true">{{ orthodonticsService.icon }}</span>
              <h4 class="odontology-title">{{ orthodonticsService.title }}</h4>
              <p class="odontology-description">{{ orthodonticsService.description }}</p>
            </article>
          </div>
        }

        @if (forensicService) {
          <div class="specialty-section">
            <div class="specialty-header">
              <p class="section-eyebrow">Especialidade</p>
              <h3 class="specialty-title">Perícia Judicial</h3>
            </div>
            <article class="specialty-card">
              <span class="odontology-icon" aria-hidden="true">{{ forensicService.icon }}</span>
              <h4 class="odontology-title">{{ forensicService.title }}</h4>
              <p class="odontology-description">{{ forensicService.description }}</p>
            </article>
          </div>
        }
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

      .odontology-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2.25rem;
      }

      .odontology-card {
        background: var(--dark-light);
        border: 1px solid rgba(201, 168, 76, 0.2);
        border-radius: 16px;
        padding: 1.8rem;
        text-align: center;
        transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
      }

      .odontology-card:hover {
        transform: translateY(-6px);
        border-color: var(--gold);
        box-shadow: 0 12px 40px rgba(201, 168, 76, 0.15);
      }

      .odontology-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.85rem;
      }

      .odontology-title {
        font-family: 'Playfair Display', serif;
        color: var(--gold);
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
      }

      .odontology-description {
        color: rgba(255, 255, 255, 0.72);
        line-height: 1.7;
        font-size: 0.92rem;
      }

      .specialty-section {
        margin-top: 2rem;
      }

      .specialty-header {
        text-align: center;
        margin-bottom: 1rem;
      }

      .specialty-title {
        font-family: 'Playfair Display', serif;
        color: var(--white);
        font-size: clamp(1.3rem, 2.5vw, 1.8rem);
        margin: 0;
      }

      .specialty-card {
        background: var(--dark-light);
        border: 1px solid rgba(201, 168, 76, 0.25);
        border-radius: 16px;
        padding: 1.8rem;
        text-align: center;
      }

      @media (max-width: 600px) {
        .odontology-section {
          padding: 4rem 1rem;
        }

        .odontology-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class OdontologyComponent {
  config = SITE_CONFIG;

  readonly orthodonticsService = this.config.odontology.services.find((service) =>
    service.title.toLowerCase().includes('ortodontia'),
  );

  readonly forensicService = this.config.odontology.services.find((service) =>
    service.title.toLowerCase().includes('perícia judicial'),
  );

  readonly generalServices = this.config.odontology.services.filter(
    (service) => service !== this.orthodonticsService && service !== this.forensicService,
  );
}
