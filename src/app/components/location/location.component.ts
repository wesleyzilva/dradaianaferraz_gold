import { Component, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-location',
  standalone: true,
  template: `
    <section class="location-section" id="location">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Onde Estamos</p>
          <h2 class="section-title">Nossa Localização</h2>
          <div class="gold-line"></div>
        </div>
        <div class="location-content">
          <div class="location-info">
            <h3 class="info-title">{{ config.professional.name }}</h3>
            <ul class="info-list">
              <li>
                <span class="info-icon">📍</span>
                <div>
                  <strong>Rota da sua localização até nosso endereço</strong>
                  <a
                    [href]="directionsUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="address-link"
                    aria-label="Abrir rota no Google Maps"
                    data-track="conversion_route_maps"
                  >
                    <p>{{ config.location.address }}</p>
                    <p>{{ config.location.neighborhood }}</p>
                    <p>{{ config.location.city }}</p>
                    <p>{{ config.location.cep }}</p>
                  </a>
                </div>
              </li>
              <li>
                <span class="info-icon">📞</span>
                <div>
                  <strong>Telefone / WhatsApp</strong>
                  <p>{{ config.location.phone }}</p>
                </div>
              </li>
              <li>
                <span class="info-icon">✉️</span>
                <div>
                  <strong>E-mail</strong>
                  <a [href]="locationEmailMailto" class="email-link">{{ config.location.email }}</a>
                </div>
              </li>
              <li>
                <span class="info-icon">🕐</span>
                <div>
                  <strong>Horário de Atendimento</strong>
                  <p>{{ config.location.hours }}</p>
                </div>
              </li>
            </ul>
            <div class="location-actions">
              <a [href]="config.professional.whatsapp" target="_blank" class="btn-whatsapp" data-track="conversion_whatsapp_location">
                <i class="fab fa-whatsapp"></i> Fale no WhatsApp
              </a>
              <a
                [href]="uberUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-uber"
                [class.btn-uber-discount]="uberDiscountGlow()"
                (click)="highlightUberDiscount()"
                data-track="conversion_uber"
              >
                <i class="fab fa-uber"></i> Chamar Uber
              </a>
            </div>
            <p class="uber-limit-note">Cobertura de deslocamento Uber limitada a até 10 km.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .location-section {
      background: var(--dark);
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
      margin: 0 auto;
      border-radius: 2px;
    }
    .location-content {
      display: flex;
      justify-content: center;
      align-items: start;
    }
    .location-info {
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      padding: 2rem;
      width: min(760px, 100%);
    }
    .info-title {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(201,168,76,0.2);
    }
    .info-list {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .info-list li {
      display: flex;
      gap: 0.75rem;
      align-items: flex-start;
    }
    .info-icon { font-size: 1.25rem; flex-shrink: 0; margin-top: 2px; }
    .info-list strong {
      color: var(--gold);
      display: block;
      font-size: 0.85rem;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }
    .info-list p {
      color: rgba(255,255,255,0.75);
      font-size: 0.92rem;
      margin: 0;
      line-height: 1.5;
    }
    .email-link {
      color: rgba(255,255,255,0.82);
      font-size: 0.92rem;
      line-height: 1.5;
      text-decoration: none;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .email-link:hover {
      color: var(--gold-light);
      text-decoration: underline;
    }
    .address-link {
      text-decoration: none;
      display: inline-block;
    }
    .address-link p {
      transition: color 0.2s;
    }
    .address-link:hover p {
      color: var(--gold-light);
    }
    .btn-whatsapp {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #25D366;
      color: white;
      padding: 0.85rem 1.75rem;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.95rem;
      transition: background 0.3s, transform 0.2s;
    }
    .btn-whatsapp:hover { background: #1fbc59; transform: translateY(-2px); }
    .location-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .uber-limit-note {
      margin: 0.85rem 0 0;
      color: rgba(255,255,255,0.62);
      font-size: 0.8rem;
    }
    .btn-uber {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #000;
      color: #fff;
      padding: 0.85rem 1.75rem;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.95rem;
      border: 1px solid rgba(255,255,255,0.2);
      transition: background 0.3s, transform 0.2s;
    }
    .btn-uber:hover {
      background: #111;
      transform: translateY(-2px);
    }
    .btn-uber-discount {
      border-color: rgba(201,168,76,0.95);
      box-shadow:
        0 0 0 2px rgba(201,168,76,0.35),
        0 0 22px rgba(201,168,76,0.85),
        0 0 38px rgba(201,168,76,0.55);
      animation: uber-discount-glow 1.1s ease-out;
    }
    @keyframes uber-discount-glow {
      0% {
        transform: translateY(0) scale(1);
        box-shadow: 0 0 0 0 rgba(201,168,76,0);
      }
      45% {
        transform: translateY(-2px) scale(1.03);
        box-shadow:
          0 0 0 3px rgba(201,168,76,0.4),
          0 0 30px rgba(201,168,76,0.95),
          0 0 44px rgba(201,168,76,0.65);
      }
      100% {
        transform: translateY(-2px) scale(1);
        box-shadow:
          0 0 0 2px rgba(201,168,76,0.35),
          0 0 22px rgba(201,168,76,0.85),
          0 0 38px rgba(201,168,76,0.55);
      }
    }
    @media (max-width: 900px) {
      .location-content { display: block; }
    }
    @media (max-width: 600px) {
      .location-section { padding: 4rem 1rem; }
    }
  `],
})
export class LocationComponent {
  config = SITE_CONFIG;
  directionsUrl: string;
  uberUrl: string;
  locationEmailMailto: string;
  readonly uberDiscountGlow = signal(false);
  private uberGlowTimeoutId: number | undefined;

  constructor() {
    const destination = encodeURIComponent(
      `${this.config.location.address}, ${this.config.location.neighborhood}, ${this.config.location.city}, ${this.config.location.cep}`,
    );
    this.directionsUrl = 'https://www.google.com/maps/dir/-22.0193407,-47.8610045/Dra.+Daiana+Ferraz+-+Dentista+-+Odontologia+e+est%C3%A9tica+facial,+Bal%C3%A3o+do+Bonde+-+Av.+Cap.+Lu%C3%ADz+Brand%C3%A3o,+26+-+Vila+Nery,+S%C3%A3o+Carlos+-+SP,+13568-450/@-22.0111719,-47.8752257,15z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x94b87a644aeab935:0xa1a9250e71d0aad2!2m2!1d-47.8728271!2d-22.0126285!3e0?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D';
    this.uberUrl = `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${destination}`;
    this.locationEmailMailto = `mailto:${this.config.location.email}?subject=${encodeURIComponent('Contato pela landing page [viaLandPage]')}&body=${encodeURIComponent('Olá, entrei em contato pela landing page.\n\nTag: viaLandPage\n')}`;
  }

  highlightUberDiscount(): void {
    if (this.uberGlowTimeoutId) {
      window.clearTimeout(this.uberGlowTimeoutId);
    }

    this.uberDiscountGlow.set(true);
    this.uberGlowTimeoutId = window.setTimeout(() => {
      this.uberDiscountGlow.set(false);
    }, 1200);
  }
}
