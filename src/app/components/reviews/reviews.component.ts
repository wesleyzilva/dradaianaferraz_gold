import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

type ReputationData = {
  google: {
    rating: string;
    totalReviews: number;
  };
  doctoralia: {
    rating: string;
    totalReviews: number;
  };
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
          <div class="reputation-badges">
            <a [href]="config.social.googleBusiness" target="_blank" rel="noopener noreferrer" class="google-badge" data-track="social_google_reviews">
              <i class="fab fa-google"></i>
              <span>Google {{ reputation().google.rating }} · {{ reputation().google.totalReviews }} avaliações</span>
            </a>
            <a [href]="config.social.doctoralia" target="_blank" rel="noopener noreferrer" class="doctoralia-badge" data-track="social_doctoralia_reviews">
              <i class="fas fa-user-doctor"></i>
              <span>Doctoralia {{ reputation().doctoralia.rating }} · {{ reputation().doctoralia.totalReviews }} avaliações</span>
            </a>
          </div>
        </div>

        <div class="reviews-grid">
          @for (review of config.reviews; track review.author) {
            <div class="review-card">
              <div class="review-header">
                <div class="avatar">{{ review.avatar }}</div>
                <div class="review-meta">
                  <span class="reviewer-name">{{ review.author }}</span>
                  <span class="review-date">{{ review.date }}</span>
                </div>
                <div class="google-icon">
                  <i class="fab fa-google"></i>
                </div>
              </div>
              <div class="stars">
                @for (star of getStars(review.rating); track star) {
                  <i class="fas fa-star"></i>
                }
              </div>
              <p class="review-text">{{ review.text }}</p>
            </div>
          }
        </div>

        <div class="reviews-cta">
          <a [href]="config.social.googleBusiness" target="_blank" rel="noopener noreferrer" class="btn-google" data-track="social_google_reviews_cta">
            <i class="fab fa-google"></i> Ver todas as avaliações no Google
          </a>
          <a [href]="config.social.doctoralia" target="_blank" rel="noopener noreferrer" class="btn-doctoralia" data-track="social_doctoralia_reviews_cta">
            <i class="fas fa-user-doctor"></i> Ver perfil e avaliações no Doctoralia
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .reviews-section {
      background: var(--dark-light);
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
      margin: 0 auto 1.25rem;
      border-radius: 2px;
    }
    .reputation-badges {
      display: flex;
      gap: 0.6rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .google-badge,
    .doctoralia-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 20px;
      padding: 0.4rem 1.2rem;
      color: rgba(255,255,255,0.75);
      font-size: 0.9rem;
      text-decoration: none;
    }
    .google-badge i { color: #EA4335; }
    .doctoralia-badge i { color: #00AEEF; }

    .reviews-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .review-card {
      background: var(--dark);
      border: 1px solid rgba(201,168,76,0.15);
      border-radius: 16px;
      padding: 1.75rem;
      transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    .review-card:hover {
      transform: translateY(-4px);
      border-color: rgba(201,168,76,0.4);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }
    .review-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--dark);
      font-weight: 700;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    .review-meta {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .reviewer-name {
      color: var(--white);
      font-weight: 600;
      font-size: 0.95rem;
    }
    .review-date {
      color: var(--gray);
      font-size: 0.8rem;
    }
    .google-icon { color: #EA4335; font-size: 1.1rem; }
    .stars {
      color: #FBBC04;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
      display: flex;
      gap: 2px;
    }
    .review-text {
      color: rgba(255,255,255,0.72);
      font-size: 0.92rem;
      line-height: 1.7;
    }

    .reviews-cta {
      text-align: center;
      display: flex;
      gap: 0.7rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-google {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      border: 2px solid rgba(234,67,53,0.6);
      color: rgba(255,255,255,0.85);
      padding: 0.75rem 1.75rem;
      border-radius: 30px;
      text-decoration: none;
      font-size: 0.95rem;
      transition: background 0.3s, border-color 0.3s;
    }
    .btn-google i { color: #EA4335; }
    .btn-google:hover {
      background: rgba(234,67,53,0.1);
      border-color: #EA4335;
    }
    .btn-doctoralia {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      border: 2px solid rgba(0,174,239,0.65);
      color: rgba(255,255,255,0.85);
      padding: 0.75rem 1.75rem;
      border-radius: 30px;
      text-decoration: none;
      font-size: 0.95rem;
      transition: background 0.3s, border-color 0.3s;
    }
    .btn-doctoralia i { color: #00AEEF; }
    .btn-doctoralia:hover {
      background: rgba(0,174,239,0.1);
      border-color: #00AEEF;
    }

    @media (max-width: 600px) {
      .reviews-section { padding: 4rem 1rem; }
      .reviews-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class ReviewsComponent implements OnInit {
  config = SITE_CONFIG;
  readonly reputation = signal<ReputationData>({
    google: this.config.reputation.google,
    doctoralia: this.config.reputation.doctoralia,
  });

  ngOnInit(): void {
    this.loadDynamicReputation();
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  private async loadDynamicReputation(): Promise<void> {
    try {
      const response = await fetch(this.config.reputation.sourceUrl, { cache: 'no-store' });
      if (!response.ok) {
        return;
      }

      const dynamicData = (await response.json()) as Partial<ReputationData>;
      this.reputation.set({
        google: {
          rating: dynamicData.google?.rating ?? this.config.reputation.google.rating,
          totalReviews: dynamicData.google?.totalReviews ?? this.config.reputation.google.totalReviews,
        },
        doctoralia: {
          rating: dynamicData.doctoralia?.rating ?? this.config.reputation.doctoralia.rating,
          totalReviews: dynamicData.doctoralia?.totalReviews ?? this.config.reputation.doctoralia.totalReviews,
        },
      });
    } catch {
      return;
    }
  }
}
