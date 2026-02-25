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
            <p class="footer-logo">{{ config.professional.name }}</p>
            <p class="footer-tagline">{{ config.professional.title }}</p>
            <p class="footer-crm">{{ config.professional.crm }}</p>
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

          <div class="footer-links">
            <h4 class="footer-heading">Navegação</h4>
            <ul>
              @for (item of config.navigation; track item.anchor) {
                <li><a [href]="'#' + item.anchor">{{ item.label }}</a></li>
              }
            </ul>
          </div>

          <div class="footer-contact">
            <h4 class="footer-heading">Contato</h4>
            <ul class="contact-list">
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ config.location.address }}, {{ config.location.city }}</span>
              </li>
              <li>
                <i class="fas fa-phone"></i>
                <span>{{ config.location.phone }}</span>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <span>{{ config.location.email }}</span>
              </li>
              <li>
                <i class="fas fa-clock"></i>
                <span>{{ config.location.hours }}</span>
              </li>
            </ul>
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
      padding: 4rem 2rem;
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr;
      gap: 3rem;
    }
    .footer-logo {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
    }
    .footer-tagline {
      color: rgba(255,255,255,0.6);
      font-size: 0.88rem;
      margin-bottom: 0.25rem;
    }
    .footer-crm {
      color: var(--gray);
      font-size: 0.82rem;
      margin-bottom: 1.25rem;
    }
    .social-links {
      display: flex;
      gap: 0.75rem;
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

    .footer-heading {
      color: var(--gold);
      font-size: 0.8rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 1.25rem;
      font-weight: 600;
    }
    .footer-links ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .footer-links a {
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s;
    }
    .footer-links a:hover { color: var(--gold); }

    .contact-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .contact-list li {
      display: flex;
      gap: 0.65rem;
      align-items: flex-start;
      color: rgba(255,255,255,0.6);
      font-size: 0.88rem;
      line-height: 1.5;
    }
    .contact-list i {
      color: var(--gold);
      font-size: 0.85rem;
      margin-top: 3px;
      flex-shrink: 0;
      width: 14px;
      text-align: center;
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
      .footer-container { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / -1; }
    }
    @media (max-width: 500px) {
      .footer-top { padding: 3rem 1rem; }
      .footer-bottom { padding: 1.25rem 1rem; }
      .footer-container { grid-template-columns: 1fr; gap: 2rem; }
      .footer-brand { grid-column: auto; }
    }
  `],
})
export class FooterComponent {
  config = SITE_CONFIG;
}
