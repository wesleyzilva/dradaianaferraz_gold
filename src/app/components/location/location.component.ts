import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
          <div class="map-wrapper">
            <iframe
              [src]="safeMapUrl"
              width="100%"
              height="400"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Localização da Clínica"
            ></iframe>
          </div>
          <div class="location-info">
            <h3 class="info-title">{{ config.professional.name }}</h3>
            <ul class="info-list">
              <li>
                <span class="info-icon">📍</span>
                <div>
                  <strong>Endereço</strong>
                  <p>{{ config.location.address }}</p>
                  <p>{{ config.location.neighborhood }}</p>
                  <p>{{ config.location.city }}</p>
                  <p>{{ config.location.cep }}</p>
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
                  <p>{{ config.location.email }}</p>
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
            <a [href]="config.professional.whatsapp" target="_blank" class="btn-whatsapp">
              <i class="fab fa-whatsapp"></i> Fale no WhatsApp
            </a>
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
      gap: 3rem;
      align-items: start;
    }
    .map-wrapper {
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(201,168,76,0.3);
      box-shadow: 0 8px 30px rgba(0,0,0,0.4);
    }
    .map-wrapper iframe { display: block; }
    .location-info {
      background: var(--dark-light);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      padding: 2rem;
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
    @media (max-width: 900px) {
      .location-content { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .location-section { padding: 4rem 1rem; }
    }
  `],
})
export class LocationComponent {
  config = SITE_CONFIG;
  safeMapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.mapEmbedUrl);
  }
}
