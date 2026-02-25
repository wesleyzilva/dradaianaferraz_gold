import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-container">
          <div class="footer-brand">
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
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-container footer-bottom-inner">
          <p class="copyright">{{ config.footer.copyright }}</p>
          <p class="disclaimer">{{ config.footer.disclaimer }}</p>
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
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 70px;
      gap: 1rem;
    }
    .footer-brand {
      text-align: center;
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
      color: var(--gold);
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      font-size: 1rem;
      transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s;
    }
    .social-link:hover {
      background: var(--gold);
      color: var(--dark);
      border-color: var(--gold);
      transform: translateY(-2px);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding: 1.5rem 2rem;
    }
    .footer-bottom-inner {
      grid-template-columns: 1fr;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .copyright {
      color: rgba(255,255,255,0.4);
      font-size: 0.82rem;
    }
    .disclaimer {
      color: rgba(255,255,255,0.3);
      font-size: 0.75rem;
    }

    @media (max-width: 900px) {
      .footer-container { min-height: 70px; }
    }
    @media (max-width: 500px) {
      .footer-top { padding: 0 1rem; }
      .footer-bottom { padding: 1.25rem 1rem; }
      .footer-container { min-height: 64px; }
    }
  `],
})
export class FooterComponent {
  config = SITE_CONFIG;
}
