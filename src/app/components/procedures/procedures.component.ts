import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-procedures',
  standalone: true,
  template: `
    <section class="procedures-section" id="procedures">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Resultados Reais</p>
          <h2 class="section-title">Antes & Depois</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">
            Veja transformações reais que combinam técnica, precisão e naturalidade para revelar a melhor versão de cada paciente.
          </p>
        </div>

        <div class="carousel-wrapper">
          <div class="carousel-slide">
            <div class="procedure-name">{{ currentProcedure.name }}</div>
            <div class="comparison-grid">
              <div class="comparison-item">
                <span class="comparison-label">Antes</span>
                <img [src]="currentProcedure.beforeImage" [alt]="'Antes - ' + currentProcedure.name" class="comparison-img" />
              </div>
              <div class="comparison-divider">
                <span class="divider-text">VS</span>
              </div>
              <div class="comparison-item">
                <span class="comparison-label after">Depois</span>
                <img [src]="currentProcedure.afterImage" [alt]="'Depois - ' + currentProcedure.name" class="comparison-img" />
              </div>
            </div>
          </div>

          <div class="carousel-controls">
            <button class="carousel-btn" (click)="prev()" aria-label="Anterior">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="carousel-dots">
              @for (procedure of config.procedures; track procedure.name; let i = $index) {
                <button
                  class="dot"
                  [class.active]="i === currentIndex"
                  (click)="goTo(i)"
                  [attr.aria-label]="'Ver procedimento ' + (i + 1)"
                ></button>
              }
            </div>
            <button class="carousel-btn" (click)="next()" aria-label="Próximo">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>

          <p class="carousel-counter">{{ currentIndex + 1 }} / {{ config.procedures.length }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .procedures-section {
      background: var(--dark-light);
      padding: 6rem 2rem;
    }
    .section-container {
      max-width: 1100px;
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
      color: rgba(255,255,255,0.65);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.8;
    }

    .carousel-wrapper {
      max-width: 900px;
      margin: 0 auto;
    }
    .procedure-name {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1.3rem;
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 1rem;
      align-items: center;
      margin-bottom: 2rem;
    }
    .comparison-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }
    .comparison-label {
      background: rgba(136,136,136,0.8);
      color: var(--white);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 0.3rem 1.2rem;
      border-radius: 20px;
    }
    .comparison-label.after {
      background: rgba(201,168,76,0.85);
      color: var(--dark);
    }
    .comparison-img {
      width: 100%;
      max-width: 380px;
      height: 440px;
      object-fit: cover;
      border-radius: 12px;
      border: 2px solid rgba(201,168,76,0.25);
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    .comparison-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      border-radius: 50%;
      flex-shrink: 0;
    }
    .divider-text {
      color: var(--dark);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .carousel-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 0.75rem;
    }
    .carousel-btn {
      background: rgba(201,168,76,0.15);
      border: 2px solid var(--gold);
      color: var(--gold);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s, transform 0.2s;
    }
    .carousel-btn:hover { background: var(--gold); color: var(--dark); transform: scale(1.05); }
    .carousel-dots {
      display: flex;
      gap: 0.5rem;
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      background: transparent;
      cursor: pointer;
      transition: background 0.3s, transform 0.2s;
      padding: 0;
    }
    .dot.active { background: var(--gold); transform: scale(1.3); }
    .carousel-counter {
      text-align: center;
      color: var(--gray);
      font-size: 0.85rem;
    }

    @media (max-width: 700px) {
      .procedures-section { padding: 4rem 1rem; }
      .comparison-grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
      }
      .comparison-divider {
        width: 40px;
        height: 40px;
        margin: 0 auto;
      }
      .comparison-img { height: 260px; }
    }
  `],
})
export class ProceduresComponent {
  config = SITE_CONFIG;
  currentIndex = 0;

  get currentProcedure() {
    return this.config.procedures[this.currentIndex];
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.config.procedures.length) % this.config.procedures.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.config.procedures.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
