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
              <a [href]="config.social.instagram" target="_blank" rel="noopener" aria-label="Instagram" class="social-link" data-track="social_instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#E1306C"/><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8A4.8 4.8 0 1 0 12 7.2Z" stroke="#fff" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="#fff"/></svg>
              </a>
              <a [href]="config.social.doctoralia" target="_blank" rel="noopener" aria-label="Doctoralia" class="social-link" data-track="social_doctoralia">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#00C6AE"/><path d="M12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.933 13.933 13.5 12 13.5C10.067 13.5 8.5 11.933 8.5 10C8.5 8.067 10.067 6.5 12 6.5ZM12 15C14.4853 15 17 16.1193 17 17.5V18.5H7V17.5C7 16.1193 9.51472 15 12 15Z" fill="#fff"/></svg>
              </a>
              <a [href]="config.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-link" data-track="social_linkedin">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#0A66C2"/><path d="M7.5 8.5V16H10V8.5H7.5ZM8.75 7.25C9.44036 7.25 10 6.69036 10 6C10 5.30964 9.44036 4.75 8.75 4.75C8.05964 4.75 7.5 5.30964 7.5 6C7.5 6.69036 8.05964 7.25 8.75 7.25ZM12 10.5V16H14.5V13.25C14.5 12.2835 15.2835 11.5 16.25 11.5C17.2165 11.5 18 12.2835 18 13.25V16H20.5V13.25C20.5 11.1789 18.8211 9.5 16.75 9.5C15.6789 9.5 14.75 10.1789 14.5 11.125V10.5H12Z" fill="#fff"/></svg>
              </a>
              <a [href]="config.social.lattes" target="_blank" rel="noopener" aria-label="Lattes" class="social-link" data-track="social_lattes">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12" fill="#F5C518"/><path d="M12 7C13.6569 7 15 8.34315 15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7ZM12 14C14.4853 14 17 15.1193 17 16.5V17.5H7V16.5C7 15.1193 9.51472 14 12 14Z" fill="#fff"/></svg>
              </a>
              <a [href]="config.social.googleBusiness" target="_blank" rel="noopener" aria-label="Google Business" class="social-link" data-track="social_google_business">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#4285F4"/><path d="M12 7.5C13.933 7.5 15.5 9.067 15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5ZM12 16C14.4853 16 17 17.1193 17 18.5V19.5H7V18.5C7 17.1193 9.51472 16 12 16Z" fill="#fff"/></svg>
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
