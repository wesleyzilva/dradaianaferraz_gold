import { Component } from '@angular/core';
import { MiniAnalyticsComponent } from '../mini-analytics/mini-analytics.component';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MiniAnalyticsComponent],
  template: `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-container">
          <div class="footer-main-row">
            <div class="social-links">
              <a [href]="config.social.instagram" target="_blank" rel="noopener" aria-label="Instagram" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a [href]="config.social.doctoralia" target="_blank" rel="noopener" aria-label="Doctoralia" class="social-link">
                <i class="fas fa-user-doctor"></i>
              </a>
              <a [href]="config.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-link">
                <i class="fab fa-linkedin"></i>
              </a>
              <a [href]="config.social.lattes" target="_blank" rel="noopener" aria-label="Lattes" class="social-link">
                <i class="fas fa-graduation-cap"></i>
              </a>
              <a [href]="config.social.googleBusiness" target="_blank" rel="noopener" aria-label="Google Business" class="social-link">
                <i class="fab fa-google"></i>
              </a>
            </div>
            <app-mini-analytics></app-mini-analytics>
            <a [href]="config.footer.privacyUrl" class="footer-tag legal-link" data-track="legal_privacy_view">
              Política de Privacidade
            </a>
            <a [href]="config.footer.termsUrl" class="footer-tag legal-link" data-track="legal_terms_view">
              Termos de Uso
            </a>
            <p class="copyright">{{ config.footer.copyright }}</p>
            <span class="footer-tag">Última atualização: {{ config.footer.lastUpdated }}</span>
            <a [href]="technicalResponsibleMailto" class="footer-tag footer-email" aria-label="Enviar e-mail para responsável técnico">
              {{ config.footer.technicalResponsibleEmail }}
            </a>
            <span class="disclaimer">{{ config.footer.disclaimer }}</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0d0d0d;
      border-top: 1px solid rgba(201,168,76,0.2);
    }
    .footer-top {
      padding: 0.8rem 2rem;
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 86px;
      gap: 1rem;
      overflow: hidden;
    }
    .footer-main-row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      overflow: hidden;
    }
    .social-links {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 100%;
    }
    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 1rem;
      transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s;
    }
    .social-link[aria-label='Instagram'] { color: #E1306C; }
    .social-link[aria-label='Doctoralia'] { color: #00AEEF; }
    .social-link[aria-label='LinkedIn'] { color: #0A66C2; }
    .social-link[aria-label='Lattes'] { color: #5A6ACF; }
    .social-link[aria-label='Google Business'] { color: #EA4335; }
    .social-link:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.35);
      transform: translateY(-2px);
    }
    .copyright {
      color: rgba(255,255,255,0.62);
      font-size: 0.82rem;
      margin: 0;
      white-space: nowrap;
    }
    .footer-tag {
      color: rgba(255,255,255,0.78);
      border: 1px solid rgba(201,168,76,0.28);
      background: rgba(201,168,76,0.08);
      border-radius: 999px;
      padding: 0.34rem 0.7rem;
      font-size: 0.75rem;
      line-height: 1;
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: break-word;
      text-align: center;
      max-width: 100%;
    }
    .footer-email {
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .footer-email:hover {
      background: rgba(201,168,76,0.14);
      border-color: rgba(201,168,76,0.45);
    }
    .legal-link {
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .legal-link:hover {
      background: rgba(201,168,76,0.14);
      border-color: rgba(201,168,76,0.45);
    }
    .disclaimer {
      color: rgba(255,255,255,0.3);
      font-size: 0.75rem;
      text-align: center;
    }

    @media (max-width: 900px) {
      .footer-container { min-height: 90px; }
      .footer-main-row { gap: 0.65rem; }
    }
    @media (max-width: 500px) {
      .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1001;
      }
      .footer-top { padding: 0.45rem 1rem; }
      .footer-container { min-height: 72px; }
      .footer-main-row {
        gap: 0.55rem;
        flex-direction: column;
      }
      .social-links {
        position: static;
        width: 100%;
        max-width: 100%;
        padding: 0;
        border: 1px solid rgba(201,168,76,0.35);
        border-radius: 999px;
        background: rgba(13,13,13,0.92);
        backdrop-filter: blur(6px);
        box-shadow: 0 10px 24px rgba(0,0,0,0.3);
      }
      .footer-tag { font-size: 0.72rem; }
      .copyright { font-size: 0.78rem; }

      .footer-main-row > :not(.social-links) {
        display: none;
      }

      .social-links {
        justify-content: center;
      }
    }
  `],
})
export class FooterComponent {
  config = SITE_CONFIG;

  readonly technicalResponsibleMailto = `mailto:${this.config.footer.technicalResponsibleEmail}?subject=${encodeURIComponent('Contato pelo site [viaLandPage]')}&body=${encodeURIComponent('Olá, entrei em contato pelo site.\n\nTag: viaLandPage\n')}`;
}
