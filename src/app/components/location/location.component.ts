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
                  <br />
                  <span class="address-hint">(clique no endereço abaixo)</span>
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
                  <a [href]="'tel:+5516991400423'" class="phone-link" data-track="conversion_phone_location" style="color:#f3f3f3; text-decoration:none;">+55 16 99140-0423</a>
                </div>
              </li>
              <li>
                <span class="info-icon">✉️</span>
                <div>
                  <strong>E-mail</strong>
                  <a [href]="locationEmailMailto" class="email-link" data-track="conversion_email_location">{{ config.location.email }}</a>
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
              <a [href]="locationWhatsappUrl" target="_blank" class="btn-whatsapp" data-track="conversion_whatsapp_location">
                WhatsApp · Ainda com dúvidas?
              </a>
              <a [href]="uberUrl" target="_blank" rel="noopener noreferrer" class="btn-uber" data-track="conversion_uber">
                Uber · Solicitar corrida
              </a>
            </div>
          </div>
          <div class="location-photo-card" role="region" aria-roledescription="carousel" aria-label="Fotos internas do consultório">
            <img [src]="currentClinicPhoto()" alt="Foto interna do consultório" class="location-photo" loading="lazy" />
            <button
              type="button"
              class="photo-nav photo-nav-prev"
              aria-label="Foto anterior"
              [attr.aria-controls]="'clinic-photos-dots'"
              (click)="previousPhoto()"
            >‹</button>
            <button
              type="button"
              class="photo-nav photo-nav-next"
              aria-label="Próxima foto"
              [attr.aria-controls]="'clinic-photos-dots'"
              (click)="nextPhoto()"
            >›</button>
            <div class="photo-dots" role="tablist" aria-label="Fotos do consultório">
              @for (photo of clinicPhotos; track photo; let i = $index) {
                <button
                  type="button"
                  class="photo-dot"
                  [class.photo-dot-active]="currentPhotoIndex() === i"
                  [attr.aria-label]="'Ver foto ' + (i + 1)"
                  [attr.aria-selected]="currentPhotoIndex() === i"
                  [attr.aria-current]="currentPhotoIndex() === i ? 'true' : null"
                  (click)="goToPhoto(i)"
                ></button>
              }
            </div>
            <p id="clinic-photos-dots" class="sr-only" aria-live="polite">
              Foto {{ currentPhotoIndex() + 1 }} de {{ clinicPhotos.length }} do consultório.
            </p>
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
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      align-items: stretch;
    }
    .location-info {
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      padding: 2rem;
      width: 100%;
    }
    .location-photo-card {
      position: relative;
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      overflow: hidden;
      background: var(--dark-light);
      min-height: 320px;
    }
    .location-photo {
      width: 100%;
      height: 100%;
      min-height: 320px;
      object-fit: cover;
      display: block;
    }
    .photo-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.6);
      background: rgba(13,13,13,0.7);
      color: var(--gold);
      font-size: 1.4rem;
      line-height: 1;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .photo-nav-prev { left: 10px; }
    .photo-nav-next { right: 10px; }
    .photo-dots {
      position: absolute;
      left: 50%;
      bottom: 12px;
      transform: translateX(-50%);
      display: flex;
      gap: 0.45rem;
      background: rgba(13,13,13,0.4);
      border: 1px solid rgba(201,168,76,0.25);
      border-radius: 999px;
      padding: 0.28rem 0.45rem;
    }
    .photo-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,0.7);
      background: transparent;
      cursor: pointer;
      padding: 0;
    }
    .photo-dot-active {
      background: var(--gold);
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
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
    @media (max-width: 900px) {
      .location-content {
        grid-template-columns: 1fr;
      }
      .location-photo {
        min-height: 260px;
      }
    }
    @media (max-width: 600px) {
      .location-section { padding: 4rem 1rem; }
    }
    @media (max-width: 500px) {
      .location-section {
        padding-bottom: 8rem;
      }
    }
  `],
})
export class LocationComponent {
  config = SITE_CONFIG;
  readonly clinicPhotos = this.config.location.clinicPhotos;
  readonly currentPhotoIndex = signal(0);
  directionsUrl: string;
  uberUrl: string;
  locationEmailMailto: string;
  locationWhatsappUrl: string;

  constructor() {
    const destination = encodeURIComponent(
      `${this.config.location.address}, ${this.config.location.neighborhood}, ${this.config.location.city}, ${this.config.location.cep}`,
    );
    // Google Maps Directions API: origem dinâmica (usuário), destino fixo
    this.directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    this.uberUrl = `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${destination}`;
    this.locationWhatsappUrl = `${this.config.professional.whatsapp}?text=${encodeURIComponent('Vim da página e meu nome é ')}`;
    this.locationEmailMailto = `mailto:${this.config.location.email}?subject=${encodeURIComponent('Contato pela landing page [viaLandPage]')}&body=${encodeURIComponent('Olá, entrei em contato pela landing page.\n\nTag: viaLandPage\n')}`;
  }

  currentClinicPhoto(): string {
    if (!this.clinicPhotos?.length) {
      return '/images/clinica/interior-clinica-1.jpg';
    }

    return this.clinicPhotos[this.currentPhotoIndex()];
  }

  previousPhoto(): void {
    const total = this.clinicPhotos?.length ?? 0;
    if (total <= 1) {
      return;
    }

    this.currentPhotoIndex.update((index) => (index - 1 + total) % total);
  }

  nextPhoto(): void {
    const total = this.clinicPhotos?.length ?? 0;
    if (total <= 1) {
      return;
    }

    this.currentPhotoIndex.update((index) => (index + 1) % total);
  }

  goToPhoto(index: number): void {
    this.currentPhotoIndex.set(index);
  }
}
