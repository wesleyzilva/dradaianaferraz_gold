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
              <a [href]="config.professional.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp" class="social-link" data-track="social_whatsapp">
                <svg width="22" height="22" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="448" height="448" rx="90" fill="#25D366"/><path d="M224 96c-70.7 0-128 57.3-128 128 0 22.6 6.1 44.6 17.7 63.8L96 352l65.1-17.1C180.6 338.1 202.1 352 224 352c70.7 0 128-57.3 128-128S294.7 96 224 96zm0 224c-19.2 0-38.1-5.6-54.1-16.2l-3.9-2.6-38.7 10.2 10.3-37.7-2.5-3.9C124.6 246.1 120 235.2 120 224c0-57.3 46.7-104 104-104s104 46.7 104 104-46.7 104-104 104zm58.7-77.5c-3.2-1.6-18.9-9.3-21.8-10.4-2.9-1.1-5-1.6-7.1 1.6-2.1 3.2-8.1 10.4-9.9 12.5-1.8 2.1-3.6 2.4-6.8 0.8-18.6-9.3-30.8-16.6-43.1-37.2-3.3-5.7 3.3-5.3 9.3-17.7 1-2.1 0.5-3.9-0.3-5.5-0.8-1.6-7.1-17.1-9.7-23.4-2.6-6.3-5.2-5.4-7.1-5.5-1.8-0.1-3.9-0.1-6-0.1-2.1 0-5.5 0.8-8.3 3.7-2.8 2.9-10.9 10.7-10.9 25.9 0 15.2 11.2 30 12.6 32.1 1.4 2.1 22.1 33.7 53.5 47.3 7.5 3.2 13.3 5.1 17.8 6.5 7.5 2.4 14.3 2.1 19.7 1.3 6-0.8 18.6-7.2 21.2-14.1 2.6-6.9 2.6-12.7 1.8-13.9-0.7-1.2-3-1.9-6.3-3.4z" fill="#fff"/></svg>
              </a>
              <a [href]="config.social.instagram" target="_blank" rel="noopener" aria-label="Instagram" class="social-link" data-track="social_instagram">
                <svg width="22" height="22" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="ig-gradient" cx="0.5" cy="0.5" r="0.8">
                      <stop offset="0%" stop-color="#fdf497"/>
                      <stop offset="45%" stop-color="#fdf497"/>
                      <stop offset="60%" stop-color="#fd5949"/>
                      <stop offset="90%" stop-color="#d6249f"/>
                      <stop offset="100%" stop-color="#285AEB"/>
                    </radialGradient>
                  </defs>
                  <rect width="448" height="448" rx="90" fill="url(#ig-gradient)"/>
                  <rect x="120" y="120" width="208" height="208" rx="62" fill="none" stroke="#fff" stroke-width="32"/>
                  <circle cx="224" cy="224" r="62" fill="none" stroke="#fff" stroke-width="32"/>
                  <circle cx="304" cy="144" r="20" fill="#fff"/>
                </svg>
              </a>
              <a [href]="config.social.doctoralia" target="_blank" rel="noopener" aria-label="Doctoralia" class="social-link" data-track="social_doctoralia">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#00C6AE"/><path d="M24 13c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm0 20c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9-4.029 9-9 9z" fill="#fff"/><circle cx="24" cy="24" r="5" fill="#00C6AE"/></svg>
              </a>
              <a [href]="config.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-link" data-track="social_linkedin">
                <svg width="22" height="22" viewBox="0 0 448 448" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="448" height="448" rx="90" fill="#0A66C2"/><path d="M100.3 448H7.4V148.9h92.9V448zm-46.4-340.7C24.2 107.3 0 83.1 0 53.6 0 24.2 24.2 0 53.6 0c29.5 0 53.6 24.2 53.6 53.6 0 29.5-24.1 53.7-53.6 53.7zm394.2 340.7h-92.9V302.4c0-34.7-12.4-58.4-43.3-58.4-23.6 0-37.6 15.9-43.8 31.3-2.3 5.6-2.9 13.4-2.9 21.2V448h-92.9s1.2-242.2 0-267.1h92.9v37.9c12.3-19 34.3-46.1 83.5-46.1 60.9 0 106.6 39.8 106.6 125.4V448z" fill="#fff"/></svg>
              </a>
              <a [href]="config.social.lattes" target="_blank" rel="noopener" aria-label="Lattes" class="social-link" data-track="social_lattes">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#F5C518"/><path d="M24 13c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm0 20c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9-4.029 9-9 9z" fill="#fff"/><circle cx="24" cy="24" r="5" fill="#F5C518"/></svg>
              </a>
              <a [href]="config.social.googleBusiness" target="_blank" rel="noopener" aria-label="Google Business" class="social-link" data-track="social_google_business">
                <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#4285F4"/><path d="M34.6 24.2c0-.7-.1-1.4-.2-2.1H24v4.1h6c-.3 1.7-1.7 3.1-3.6 3.1-2.2 0-4-1.8-4-4s1.8-4 4-4c1 0 1.9.3 2.6.9l2.8-2.8C29.9 17.7 27.1 16.5 24 16.5c-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5c4.1 0 7.5-3.4 7.5-7.5z" fill="#fff"/></svg>
              </a>
            </div>
            <app-mini-analytics></app-mini-analytics>
            <a [href]="config.footer.privacyUrl" class="footer-tag legal-link" data-track="legal_privacy_view">
              Política de Privacidade
            </a>
            <a [href]="config.footer.termsUrl" class="footer-tag legal-link" data-track="legal_terms_view">
              Termos de Uso
            </a>
            <a [href]="config.professional.whatsapp" class="footer-tag" target="_blank" rel="noopener" data-track="footer_whatsapp">
              WhatsApp para contato
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
