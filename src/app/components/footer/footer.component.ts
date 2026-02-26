import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-container">
          <div class="footer-main-row">
            <div class="social-links">
              <a [href]="config.social.instagram" target="_blank" rel="noopener" aria-label="Instagram" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a [href]="config.social.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-link">
                <i class="fab fa-linkedin"></i>
              </a>
              <a [href]="config.social.googleBusiness" target="_blank" rel="noopener" aria-label="Google Business" class="social-link">
                <i class="fab fa-google"></i>
              </a>
            </div>
            <p class="copyright">{{ config.footer.copyright }}</p>
            <span class="footer-tag">Última atualização: {{ config.footer.lastUpdated }}</span>
            <span class="footer-tag">{{ config.footer.technicalResponsible }}</span>
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
      padding: 0 2rem;
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 86px;
      gap: 1rem;
    }
    .footer-main-row {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .social-links {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
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
    .social-link[aria-label='LinkedIn'] { color: #0A66C2; }
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
      white-space: nowrap;
    }
    .disclaimer {
      color: rgba(255,255,255,0.3);
      font-size: 0.75rem;
    }

    @media (max-width: 900px) {
      .footer-container { min-height: 90px; }
    }
    @media (max-width: 500px) {
      .footer-top { padding: 0 1rem; }
      .footer-container { min-height: 96px; }
      .footer-main-row { gap: 0.55rem; }
      .footer-tag { font-size: 0.72rem; }
      .copyright { font-size: 0.78rem; }
    }
  `],
})
export class FooterComponent {
  config = SITE_CONFIG;
}
