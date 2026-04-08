import { Component, computed, input, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import type { AppArea } from '../../app';

@Component({
  selector: 'app-before-after',
  standalone: true,
  template: `
    <section class="ba-section" [id]="sectionId()">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Transformações</p>
          <h2 class="section-title">Antes &amp; Depois</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">
            Resultados reais com planejamento clínico e respeito às características individuais de cada paciente.
          </p>
        </div>

        <div class="ba-grid">
          @for (item of items(); track item.label) {
            <div class="ba-card">
              <div class="ba-comparison">
                <!-- ANTES -->
                <div class="ba-side ba-antes">
                  @if (item.before) {
                    <img [src]="item.before" [alt]="'Antes: ' + item.label" class="ba-img" loading="lazy" />
                  } @else {
                    <div class="ba-placeholder">
                      <i class="fas fa-camera ba-placeholder-icon" aria-hidden="true"></i>
                      <span class="ba-placeholder-text">Foto em breve</span>
                    </div>
                  }
                  <span class="ba-tag">Antes</span>
                </div>

                <!-- DIVISOR -->
                <div class="ba-divider" aria-hidden="true">
                  <div class="ba-divider-line"></div>
                </div>

                <!-- DEPOIS -->
                <div class="ba-side ba-depois">
                  @if (item.after) {
                    <img [src]="item.after" [alt]="'Depois: ' + item.label" class="ba-img" loading="lazy" />
                  } @else {
                    <div class="ba-placeholder">
                      <i class="fas fa-camera ba-placeholder-icon" aria-hidden="true"></i>
                      <span class="ba-placeholder-text">Foto em breve</span>
                    </div>
                  }
                  <span class="ba-tag ba-tag-depois">Depois</span>
                </div>
              </div>
              <p class="ba-label">{{ item.label }}</p>
            </div>
          }
        </div>

        <p class="ba-disclaimer">
          Resultados podem variar conforme as características individuais de cada paciente. Todos os procedimentos são realizados por profissional habilitada.
        </p>
      </div>
    </section>
  `,
  styles: [`
    .ba-section {
      background: var(--dark);
      padding: 6rem 2rem;
    }
    .section-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .section-header {
      text-align: center;
      margin-bottom: 3rem;
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
      color: rgba(255,255,255,0.62);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.8;
      font-size: 0.93rem;
    }

    /* ── GRID ── */
    .ba-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    /* ── CARD ── */
    .ba-card {
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.18);
      border-radius: 16px;
      overflow: hidden;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    .ba-card:hover {
      border-color: rgba(201,168,76,0.45);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }

    /* ── COMPARISON ── */
    .ba-comparison {
      display: flex;
      align-items: stretch;
      height: 240px;
      position: relative;
    }
    .ba-side {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
    .ba-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .ba-placeholder {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1a1a1a 0%, #222 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.55rem;
      border-right: 1px solid rgba(201,168,76,0.08);
    }
    .ba-placeholder-icon {
      color: rgba(201,168,76,0.25);
      font-size: 1.5rem;
    }
    .ba-placeholder-text {
      color: rgba(255,255,255,0.25);
      font-size: 0.75rem;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .ba-tag {
      position: absolute;
      top: 0.55rem;
      left: 0.55rem;
      background: rgba(0,0,0,0.7);
      color: rgba(255,255,255,0.6);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 0.18rem 0.55rem;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.12);
      pointer-events: none;
    }
    .ba-tag-depois {
      left: auto;
      right: 0.55rem;
      color: var(--gold);
      border-color: rgba(201,168,76,0.35);
      background: rgba(0,0,0,0.7);
    }

    /* ── DIVIDER ── */
    .ba-divider {
      width: 2px;
      flex-shrink: 0;
      background: transparent;
      position: relative;
      z-index: 2;
    }
    .ba-divider-line {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent, var(--gold) 40%, var(--gold) 60%, transparent);
      opacity: 0.6;
    }

    /* ── LABEL ── */
    .ba-label {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 0.95rem;
      text-align: center;
      padding: 0.85rem 1rem;
      margin: 0;
      border-top: 1px solid rgba(201,168,76,0.12);
    }

    /* ── DISCLAIMER ── */
    .ba-disclaimer {
      text-align: center;
      color: rgba(255,255,255,0.3);
      font-size: 0.75rem;
      max-width: 640px;
      margin: 0 auto;
      line-height: 1.6;
    }

    @media (max-width: 600px) {
      .ba-section { padding: 4rem 1rem; }
      .ba-comparison { height: 180px; }
      .ba-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class BeforeAfterComponent {
  config = SITE_CONFIG;
  readonly area = input<AppArea>('harmonizacao');
  readonly sectionId = input('before-after-harmonizacao');

  readonly items = computed(() =>
    this.area() === 'odontologia'
      ? this.config.beforeAfterOdontologia
      : this.config.beforeAfterHarmonizacao,
  );
}
