import { Component, computed, input } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import type { AppArea } from '../../app';

@Component({
  selector: 'app-procedures',
  standalone: true,
  template: `
    <section class="procedures-section" [id]="sectionId()">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Nossos Tratamentos</p>
          <h2 class="section-title">Conheça os Procedimentos</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">
            Técnica, precisão e cuidado em cada procedimento para revelar a melhor versão de você.
          </p>
        </div>

        <div class="carousel-wrapper">
          <div class="carousel-slide">
            <div class="procedure-name">
              {{ currentProcedure.name }}
              @if (currentProcedure.comingSoon) {
                <span class="badge-em-breve">Em Breve</span>
              }
            </div>
            <div class="image-wrapper">
              <img [src]="currentProcedure.image" [alt]="currentProcedure.name" class="procedure-img" />
              @if (currentProcedure.comingSoon) {
                <div class="overlay-em-breve">
                  <span aria-hidden="true">⏱</span>
                  <span>Em Breve</span>
                </div>
              }
            </div>
          </div>

          <div class="carousel-controls">
            <button class="carousel-btn" (click)="prev()" aria-label="Anterior">
              <span aria-hidden="true">‹</span>
            </button>
            <div class="carousel-dots">
              @for (procedure of procedures(); track procedure.name; let i = $index) {
                <button
                  class="dot"
                  [class.active]="i === currentIndex"
                  (click)="goTo(i)"
                  [attr.aria-label]="'Ver procedimento ' + (i + 1)"
                ></button>
              }
            </div>
            <button class="carousel-btn" (click)="next()" aria-label="Próximo">
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <p class="carousel-counter">{{ currentIndex + 1 }} / {{ procedures().length }}</p>
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
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .badge-em-breve {
      font-family: 'Lato', sans-serif;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--dark);
      background: linear-gradient(135deg, var(--gold), var(--gold-light));
      padding: 0.25rem 0.8rem;
      border-radius: 20px;
      vertical-align: middle;
    }
    .image-wrapper {
      position: relative;
      max-width: 560px;
      margin: 0 auto 2rem;
    }
    .procedure-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      border-radius: 14px;
      border: 2px solid rgba(201,168,76,0.3);
      box-shadow: 0 6px 30px rgba(0,0,0,0.5);
      display: block;
    }
    .overlay-em-breve {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.6);
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      color: var(--gold);
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      letter-spacing: 2px;
      backdrop-filter: blur(2px);
    }
    .overlay-em-breve i { font-size: 2rem; }

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
      .procedure-img { height: 280px; }
    }
  `],
})
export class ProceduresComponent {
  config = SITE_CONFIG;
  readonly area = input<AppArea>('harmonizacao');
  readonly sectionId = input('procedures-harmonizacao');
  currentIndex = 0;

  readonly procedures = computed(() =>
    this.area() === 'odontologia' ? this.config.proceduresOdontologia : this.config.proceduresHarmonizacao,
  );

  get currentProcedure(): { name: string; image: string; comingSoon?: boolean } {
    return this.procedures()[this.currentIndex] as { name: string; image: string; comingSoon?: boolean };
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.procedures().length) % this.procedures().length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.procedures().length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}
