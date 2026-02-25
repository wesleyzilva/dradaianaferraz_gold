import { Component } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <span class="nav-logo">{{ config.professional.name }}</span>
        <ul class="nav-links">
          @for (item of config.navigation; track item.anchor) {
            <li><a [href]="'#' + item.anchor">{{ item.label }}</a></li>
          }
        </ul>
        <a [href]="config.professional.whatsapp" target="_blank" class="btn-nav">
          Agendar Consulta
        </a>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero" id="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-photo-wrapper">
          <img [src]="config.professional.photo" [alt]="config.professional.name" class="hero-photo" />
        </div>
        <div class="hero-text">
          <p class="hero-eyebrow">Bem-vinda à</p>
          <h1 class="hero-name">{{ config.professional.name }}</h1>
          <p class="hero-title">{{ config.professional.title }}</p>
          <p class="hero-crm">{{ config.professional.crm }}</p>
          <p class="hero-bio">{{ config.professional.bio }}</p>
          <div class="hero-cta">
            <a href="#gold-card" class="btn-primary">Agende sua Consulta</a>
            <a href="#services" class="btn-secondary">Conheça os Serviços</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Navbar */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(26, 26, 26, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(201, 168, 76, 0.3);
      padding: 0 2rem;
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      gap: 1rem;
    }
    .nav-logo {
      font-family: 'Playfair Display', serif;
      color: var(--gold);
      font-size: 1.1rem;
      font-weight: 700;
      white-space: nowrap;
    }
    .nav-links {
      display: flex;
      list-style: none;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      color: var(--white);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s;
    }
    .nav-links a:hover { color: var(--gold); }
    .btn-nav {
      background: var(--gold);
      color: var(--dark);
      padding: 0.5rem 1.2rem;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      white-space: nowrap;
      transition: background 0.3s, transform 0.2s;
    }
    .btn-nav:hover { background: var(--gold-light); transform: translateY(-1px); }

    /* Hero */
    .hero {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--dark) 0%, #2a1f0a 50%, var(--dark) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding-top: 70px;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 4rem 2rem;
      display: flex;
      align-items: center;
      gap: 4rem;
      position: relative;
      z-index: 1;
    }
    .hero-photo-wrapper {
      flex-shrink: 0;
    }
    .hero-photo {
      width: 320px;
      height: 320px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid var(--gold);
      box-shadow: 0 0 40px rgba(201,168,76,0.4), 0 0 80px rgba(201,168,76,0.15);
    }
    .hero-text { flex: 1; }
    .hero-eyebrow {
      color: var(--gold);
      font-size: 0.95rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    .hero-name {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      color: var(--white);
      margin-bottom: 0.5rem;
      line-height: 1.15;
    }
    .hero-title {
      color: var(--gold);
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }
    .hero-crm {
      color: var(--gray);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    .hero-bio {
      color: rgba(255,255,255,0.8);
      font-size: 1rem;
      line-height: 1.8;
      max-width: 520px;
      margin-bottom: 2rem;
    }
    .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn-primary {
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: var(--dark);
      padding: 0.85rem 2rem;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 700;
      font-size: 1rem;
      transition: transform 0.3s, box-shadow 0.3s;
      box-shadow: 0 4px 20px rgba(201,168,76,0.4);
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201,168,76,0.5); }
    .btn-secondary {
      border: 2px solid var(--gold);
      color: var(--gold);
      padding: 0.85rem 2rem;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: background 0.3s, color 0.3s;
    }
    .btn-secondary:hover { background: var(--gold); color: var(--dark); }

    /* Responsive */
    @media (max-width: 900px) {
      .nav-links { display: none; }
      .hero-content { flex-direction: column; text-align: center; gap: 2rem; }
      .hero-photo { width: 220px; height: 220px; }
      .hero-bio { margin: 0 auto 2rem; }
      .hero-cta { justify-content: center; }
    }
    @media (max-width: 480px) {
      .navbar { padding: 0 1rem; }
      .nav-logo { font-size: 0.9rem; }
      .hero-content { padding: 2rem 1rem; }
    }
  `],
})
export class HeroComponent {
  config = SITE_CONFIG;
}
