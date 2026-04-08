import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

type ReviewItem = {
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
};

type SentimentGroup = {
  id: string;
  emoji: string;
  label: string;
  subtitle: string;
  reviews: ReviewItem[];
};

@Component({
  selector: 'app-reviews',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="reviews-section" id="reviews">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Avaliações</p>
          <h2 class="section-title">O que Dizem Nossos Pacientes</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">Toque em um sentimento para ler os depoimentos</p>
        </div>

        <div class="sentiment-grid">
          @for (group of sentimentGroups; track group.id) {
            <div
              class="sentiment-card"
              [class.flipped]="flippedGroups().has(group.id)"
              (click)="flipOpen(group.id)"
              role="button"
              tabindex="0"
              (keydown.enter)="flipOpen(group.id)"
              (keydown.space)="$event.preventDefault(); flipOpen(group.id)"
              [attr.aria-expanded]="flippedGroups().has(group.id)"
              [attr.aria-label]="group.label"
            >
              <div class="card-inner">
                <div class="card-front">
                  <span class="sentiment-emoji" aria-hidden="true">{{ group.emoji }}</span>
                  <h3 class="sentiment-label">{{ group.label }}</h3>
                  <p class="sentiment-sub">{{ group.subtitle }}</p>
                  <div class="front-footer">
                    <span class="review-count-badge">{{ group.reviews.length }} depoimentos</span>
                    <span class="flip-hint" aria-hidden="true">ler →</span>
                  </div>
                </div>

                <div class="card-back" (click)="$event.stopPropagation()">
                  <div class="back-topbar">
                     <span class="back-group-name" aria-hidden="true">{{ group.emoji }} {{ group.label }}</span>
                    <button
                      class="btn-voltar"
                      (click)="flipClose(group.id)"
                      aria-label="Voltar para os temas"
                    >← voltar</button>
                  </div>
                  <div class="reviews-scroll">
                    @for (review of group.reviews; track review.author) {
                      <div class="mini-review">
                        <div class="mini-header">
                          <div class="mini-avatar" aria-hidden="true">{{ review.avatar }}</div>
                          <div class="mini-meta">
                            <span class="mini-name">{{ review.author }}</span>
                            <div class="mini-stars">
                              @for (s of getStars(review.rating); track s) {
                                <span class="star-icon" aria-hidden="true">★</span>
                              }
                              @if (review.date.includes('Doctoralia')) {
                                <span class="doctoralia-badge" aria-hidden="true">🩺</span>
                              }
                            </div>
                          </div>
                          <span class="mini-date">{{ review.date.includes('Doctoralia') ? 'Doctoralia' : review.date }}</span>
                        </div>
                        <p class="mini-text">{{ review.text }}</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <div class="reviews-cta">
          <a [href]="config.social.googleBusiness" target="_blank" rel="noopener noreferrer" class="btn-google" data-track="social_google_reviews_cta">
            Google: 119 opiniões · 4.9 estrelas
          </a>
          <a [href]="config.social.doctoralia" target="_blank" rel="noopener noreferrer" class="btn-doctoralia" data-track="social_doctoralia_reviews_cta">
            Doctoralia: 21 opiniões · 5 estrelas
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .reviews-section { background: var(--dark-light); padding: 6rem 2rem; }
    .section-container { max-width: 1200px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-eyebrow { color: var(--gold); font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 0.5rem; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); color: var(--white); margin-bottom: 0.75rem; }
    .gold-line { width: 60px; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); margin: 0 auto 1rem; border-radius: 2px; }
    .section-subtitle { color: rgba(255,255,255,0.5); font-size: 0.88rem; }

    /* ── GRID ── */
    .sentiment-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; margin-bottom: 2.5rem; }

    /* ── 3D FLIP (desktop) ── */
    .sentiment-card { perspective: 1400px; height: 300px; cursor: pointer; outline: none; }
    .card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1); }
    .sentiment-card.flipped .card-inner { transform: rotateY(180deg); }
    .card-front, .card-back { position: absolute; inset: 0; border-radius: 16px; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
    .sentiment-card:not(.flipped) .card-back { pointer-events: none; }
    .sentiment-card.flipped .card-front { pointer-events: none; }

    /* ── FRONT ── */
    .card-front { background: var(--dark); border: 1px solid rgba(201,168,76,0.2); padding: 1.75rem 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center; transition: border-color 0.3s, box-shadow 0.3s; }
    .sentiment-card:not(.flipped):hover .card-front { border-color: rgba(201,168,76,0.5); box-shadow: 0 8px 30px rgba(201,168,76,0.1); }
    .sentiment-emoji { font-size: 2.5rem; line-height: 1; }
    .sentiment-label { font-family: 'Playfair Display', serif; color: var(--gold); font-size: clamp(0.95rem, 1.8vw, 1.15rem); line-height: 1.4; margin: 0; }
    .sentiment-sub { color: rgba(255,255,255,0.5); font-size: 0.8rem; line-height: 1.5; margin: 0; }
    .front-footer { display: flex; align-items: center; justify-content: space-between; width: 100%; }
    .review-count-badge { background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.3); color: var(--gold); padding: 0.18rem 0.6rem; border-radius: 20px; font-size: 0.72rem; font-weight: 600; }
    .flip-hint { color: rgba(201,168,76,0.55); font-size: 0.78rem; }

    /* ── BACK ── */
    .card-back { background: var(--dark); border: 1px solid rgba(201,168,76,0.35); transform: rotateY(180deg); display: flex; flex-direction: column; overflow: hidden; }
    .back-topbar { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 1rem; border-bottom: 1px solid rgba(201,168,76,0.12); flex-shrink: 0; gap: 0.5rem; }
    .back-group-name { font-size: 0.78rem; color: var(--gold); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
    .btn-voltar { background: transparent; border: 1px solid rgba(201,168,76,0.4); color: var(--gold); border-radius: 20px; padding: 0.2rem 0.65rem; font-size: 0.75rem; cursor: pointer; white-space: nowrap; flex-shrink: 0; transition: background 0.2s; }
    .btn-voltar:hover { background: rgba(201,168,76,0.1); }
    .reviews-scroll { overflow-y: auto; flex: 1; padding: 0.25rem 1rem 0.5rem; }
    .mini-review { padding: 0.6rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .mini-review:last-child { border-bottom: none; }
    .mini-header { display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.3rem; }
    .mini-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--gold-dark)); display: flex; align-items: center; justify-content: center; color: var(--dark); font-weight: 700; font-size: 0.68rem; flex-shrink: 0; }
    .mini-meta { flex: 1; min-width: 0; }
    .mini-name { display: block; color: var(--white); font-weight: 600; font-size: 0.8rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .mini-stars { color: #FBBC04; font-size: 0.85rem; display: flex; align-items: center; gap: 1px; }
    .star-icon { color: #FBBC04; }
    .doctoralia-badge { color: #00AEEF; margin-left: 3px; }
    .mini-date { color: rgba(255,255,255,0.55); font-size: 0.75rem; white-space: nowrap; flex-shrink: 0; }
    .mini-text { color: rgba(255,255,255,0.65); font-size: 0.8rem; line-height: 1.55; margin: 0; }

    /* ── CTA ── */
    .reviews-cta { text-align: center; display: flex; gap: 0.7rem; justify-content: center; flex-wrap: wrap; }
    .btn-google { display: inline-flex; align-items: center; gap: 0.6rem; border: 2px solid rgba(234,67,53,0.6); color: rgba(255,255,255,0.85); padding: 0.75rem 1.75rem; border-radius: 30px; text-decoration: none; font-size: 0.95rem; transition: background 0.3s, border-color 0.3s; }
    .btn-google i { color: #EA4335; }
    .btn-google:hover { background: rgba(234,67,53,0.1); border-color: #EA4335; }
    .btn-doctoralia { display: inline-flex; align-items: center; gap: 0.6rem; border: 2px solid rgba(0,174,239,0.65); color: rgba(255,255,255,0.85); padding: 0.75rem 1.75rem; border-radius: 30px; text-decoration: none; font-size: 0.95rem; transition: background 0.3s, border-color 0.3s; }
    .btn-doctoralia i { color: #00AEEF; }
    .btn-doctoralia:hover { background: rgba(0,174,239,0.1); border-color: #00AEEF; }

    /* ── MOBILE ── */
    @media (max-width: 700px) {
      .reviews-section { padding: 4rem 1rem; }
      .sentiment-grid { grid-template-columns: 1fr; }
      .sentiment-card { height: auto; perspective: none; }
      .card-inner { position: static; height: auto; transform-style: flat; transition: none; }
      .sentiment-card.flipped .card-inner { transform: none; }
      .card-front, .card-back { position: static; backface-visibility: visible; -webkit-backface-visibility: visible; transform: none !important; }
      .card-front { min-height: 200px; }
      .card-back { display: none; max-height: 520px; overflow-y: auto; }
      .sentiment-card.flipped .card-front { display: none; pointer-events: none; }
      .sentiment-card.flipped .card-back { display: flex; pointer-events: all; }
    }
  `],
})
export class ReviewsComponent {
  config = SITE_CONFIG;
  private readonly clickStorageKey = 'ddf_sentiment_clicks';
  readonly flippedGroups = signal<Set<string>>(new Set());
  private readonly allReviews = this.config.reviews;

  readonly sentimentGroups: SentimentGroup[] = [
    {
      id: 'medo',
      emoji: '😰',
      label: 'Fui com medo, saí confiante',
      subtitle: 'De insegurança a confiança plena no atendimento',
      reviews: this.allReviews.filter((r) =>
        ['Sara Carreiro', 'Graciele Silva', 'Maria Helena Ambrosio Ferraz', 'Diego Carreiro', 'Edna Oliveira'].includes(r.author),
      ),
    },
    {
      id: 'transparencia',
      emoji: '💬',
      label: 'Sem surpresas, sem letra miûda',
      subtitle: 'Honestidade e clareza antes de qualquer decisão',
      reviews: this.allReviews.filter((r) =>
        ['Debora Olegario', 'Igor (Doctoralia)', 'Helen Sagueshima'].includes(r.author),
      ),
    },
    {
      id: 'resultado',
      emoji: '✨',
      label: 'O resultado foi além',
      subtitle: 'Quem duvidava do resultado — e se surpreendeu',
      reviews: this.allReviews.filter((r) =>
        ['Karina Rosa', 'Andre Felipe Camelo'].includes(r.author),
      ),
    },
    {
      id: 'cuidado',
      emoji: '🤍',
      label: 'Fui tratado como pessoa',
      subtitle: 'O lado humano que torna o cuidado completo',
      reviews: this.allReviews.filter((r) =>
        ['Karina Machado Ramos', 'Jesgiscler M. de Oliveira'].includes(r.author),
      ),
    },
  ];

  flipOpen(groupId: string) {
    if (this.flippedGroups().has(groupId)) return;
    const next = new Set(this.flippedGroups());
    next.add(groupId);
    this.flippedGroups.set(next);
    this.trackClick(groupId);
  }

  flipClose(groupId: string) {
    const next = new Set(this.flippedGroups());
    next.delete(groupId);
    this.flippedGroups.set(next);
  }

  private trackClick(groupId: string) {
    try {
      const stored = localStorage.getItem(this.clickStorageKey);
      const counts: Record<string, number> = stored ? JSON.parse(stored) : {};
      counts[groupId] = (counts[groupId] || 0) + 1;
      localStorage.setItem(this.clickStorageKey, JSON.stringify(counts));
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: 'review_sentiment_click', sentiment: groupId });
      }
    } catch {}
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
