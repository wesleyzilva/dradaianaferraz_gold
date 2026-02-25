import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import type { AppArea } from '../../app';

type BottomMenuLink = {
  label: string;
  anchor?: string;
  href?: string;
  external?: boolean;
};

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <span class="nav-logo">{{ config.professional.name }}</span>
        <div class="view-switch" role="group" aria-label="Selecionar área de atendimento">
          <button
            type="button"
            class="switch-btn"
            [class.switch-btn-active]="selectedArea() === 'odontologia'"
            [attr.aria-pressed]="selectedArea() === 'odontologia'"
            (click)="setArea('odontologia')"
          >
            Odontologia
          </button>
          <button
            type="button"
            class="switch-btn"
            [class.switch-btn-active]="selectedArea() === 'harmonizacao'"
            [attr.aria-pressed]="selectedArea() === 'harmonizacao'"
            (click)="setArea('harmonizacao')"
          >
            Harmonização
          </button>
        </div>
        <ul class="nav-links">
          @for (item of visibleNavigation(); track item.anchor) {
            <li><a [href]="'#' + item.anchor">{{ item.label }}</a></li>
          }
        </ul>
        @if (selectedArea() !== 'odontologia') {
          <a [href]="config.professional.whatsapp" target="_blank" class="btn-nav">
            Agendar Consulta
          </a>
        }
      </div>
    </nav>

    @if (showBottomMenu()) {
      <div class="bottom-nav">
        <button
          type="button"
          class="bottom-nav-btn"
          [attr.aria-expanded]="isBottomMenuOpen()"
          aria-haspopup="menu"
          (click)="toggleBottomMenu()"
        >
          Mais opções
          <i class="fas" [class.fa-chevron-up]="isBottomMenuOpen()" [class.fa-chevron-down]="!isBottomMenuOpen()"></i>
        </button>

        @if (isBottomMenuOpen()) {
          <div class="bottom-dropdown" role="menu" [attr.aria-label]="bottomMenuAriaLabel()">
            @for (item of bottomMenuLinks(); track item.label) {
              @if (item.anchor) {
                <a [href]="'#' + item.anchor" role="menuitem" (click)="closeBottomMenu()">{{ item.label }}</a>
              } @else {
                <a [href]="item.href" [attr.target]="item.external ? '_blank' : null" role="menuitem" (click)="closeBottomMenu()">{{ item.label }}</a>
              }
            }
          </div>
        }
      </div>
    }

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
            <a [href]="primaryCtaHref()" class="btn-primary">{{ primaryCtaLabel() }}</a>
            <a [href]="secondaryCtaHref()" class="btn-secondary">{{ secondaryCtaLabel() }}</a>
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
    .view-switch {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      border: 1px solid rgba(201, 168, 76, 0.5);
      border-radius: 999px;
      padding: 0.2rem;
      background: rgba(255, 255, 255, 0.02);
    }
    .switch-btn {
      border: 0;
      background: transparent;
      color: var(--white);
      padding: 0.35rem 0.8rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .switch-btn-active {
      background: var(--gold);
      color: var(--dark);
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

    .bottom-nav {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 1rem;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    .bottom-nav-btn {
      border: 1px solid rgba(201, 168, 76, 0.4);
      background: rgba(26, 26, 26, 0.95);
      color: var(--white);
      border-radius: 999px;
      padding: 0.55rem 1rem;
      font-size: 0.85rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .bottom-dropdown {
      min-width: 180px;
      border: 1px solid rgba(201, 168, 76, 0.35);
      background: rgba(26, 26, 26, 0.98);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-direction: column;
    }
    .bottom-dropdown a {
      color: var(--white);
      text-decoration: none;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      border-bottom: 1px solid rgba(201, 168, 76, 0.15);
    }
    .bottom-dropdown a:last-child {
      border-bottom: 0;
    }
    .bottom-dropdown a:hover {
      color: var(--gold);
      background: rgba(201, 168, 76, 0.08);
    }

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
      .view-switch { margin-left: auto; }
      .hero-content { flex-direction: column; text-align: center; gap: 2rem; }
      .hero-photo { width: 220px; height: 220px; }
      .hero-bio { margin: 0 auto 2rem; }
      .hero-cta { justify-content: center; }
    }
    @media (max-width: 480px) {
      .navbar { padding: 0 1rem; }
      .nav-logo { font-size: 0.9rem; }
      .switch-btn { padding: 0.35rem 0.6rem; font-size: 0.75rem; }
      .hero-content { padding: 2rem 1rem; }
    }
  `],
})
export class HeroComponent {
  config = SITE_CONFIG;
  readonly isBottomMenuOpen = signal(false);

  readonly selectedArea = input<AppArea>('harmonizacao');
  readonly selectedAreaChange = output<AppArea>();

  readonly visibleNavigation = computed(() => {
    if (this.selectedArea() === 'odontologia') {
      const navByAnchor = new Map(this.config.navigation.map((item) => [item.anchor, item]));
      return [
        navByAnchor.get('services'),
        navByAnchor.get('reviews'),
        navByAnchor.get('fidelity-card'),
        navByAnchor.get('location'),
      ].filter((item) => item !== undefined);
    }

    return this.config.navigation.filter((item) =>
      ['services', 'products', 'gold-card'].includes(item.anchor),
    );
  });

  readonly showBottomMenu = computed(() =>
    this.selectedArea() === 'harmonizacao' || this.selectedArea() === 'odontologia',
  );

  readonly bottomMenuAriaLabel = computed(() =>
    this.selectedArea() === 'odontologia'
      ? 'Menu inferior de odontologia'
      : 'Menu inferior da harmonização',
  );

  readonly bottomMenuLinks = computed<BottomMenuLink[]>(() => {
    if (this.selectedArea() === 'odontologia') {
      return [
        {
          label: 'Agendar Consulta',
          href: this.config.professional.whatsapp,
          external: true,
        },
      ];
    }

    return this.config.navigation
      .filter((item) => ['reviews', 'location'].includes(item.anchor))
      .map((item) => ({ label: item.label, anchor: item.anchor }));
  });

  readonly primaryCtaHref = computed(() =>
    this.selectedArea() === 'odontologia' ? '#fidelity-card' : '#gold-card',
  );

  readonly secondaryCtaHref = computed(() =>
    this.selectedArea() === 'odontologia' ? '#services' : '#procedures',
  );

  readonly primaryCtaLabel = computed(() =>
    this.selectedArea() === 'odontologia' ? 'Conheça o Cartão Fidelidade' : 'Conheça o Cartão Ouro',
  );

  readonly secondaryCtaLabel = computed(() =>
    this.selectedArea() === 'odontologia' ? 'Conheça a Odontologia' : 'Ver Procedimentos',
  );

  setArea(area: AppArea): void {
    this.isBottomMenuOpen.set(false);
    this.selectedAreaChange.emit(area);
  }

  toggleBottomMenu(): void {
    this.isBottomMenuOpen.update((open) => !open);
  }

  closeBottomMenu(): void {
    this.isBottomMenuOpen.set(false);
  }
}
