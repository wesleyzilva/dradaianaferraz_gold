import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
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
      </div>
    </nav>

    @if (showBottomMenu() && (!isFooterVisible() || isMobileViewport())) {
      <div class="bottom-nav">
        <button
          type="button"
          class="bottom-menu-toggle"
          [attr.aria-expanded]="!isBottomMenuMinimized()"
          (click)="toggleBottomMenu()"
        >
          {{ isBottomMenuMinimized() ? 'Expandir menu' : 'Minimizar menu' }}
        </button>

        @if (!isBottomMenuMinimized()) {
          <div class="bottom-dropdown" role="menu" [attr.aria-label]="bottomMenuAriaLabel()">
            @for (item of bottomMenuLinks(); track item.label) {
              <div class="bottom-menu-item" [class.services-item]="item.anchor === 'services'">
                @if (item.anchor) {
                  <a [href]="'#' + item.anchor" role="menuitem" class="bottom-menu-link">{{ item.label }}</a>
                } @else {
                  <a
                    [href]="item.href"
                    [attr.target]="item.external ? '_blank' : null"
                    role="menuitem"
                    class="bottom-menu-link"
                  >
                    {{ item.label }}
                  </a>
                }

                @if (item.anchor === 'services') {
                  <div class="services-tooltip" role="note" aria-live="polite">
                    <p class="services-tooltip-title">Serviços elegíveis do Voucher Ouro</p>
                    <ul class="services-tooltip-list">
                      @for (service of discountEligibleServices(); track service) {
                        <li>{{ service }}</li>
                      }
                    </ul>
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    }

    <!-- Hero Section -->
    <section class="hero" id="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content" id="hero-content">
        <div class="hero-photo-wrapper">
          <img [src]="heroPhoto()" [alt]="config.professional.name" class="hero-photo" />
        </div>
        <div class="hero-text">
          <h1 class="hero-name">Dra. Daiana Ferraz</h1>
          <p class="hero-bio">
            Com 18 anos de experiência dedicados a saúde e  autoestima de meus pacientes. Trajetória pautada na precisão técnica e olhar humanizado.<br>
            Especialista em Reabilitação Oral e Harmonização Orofacial. Meu trabalho é fundamentado em um planejamento personalizado para as necessidades do cliente.<br>
            <span class="cro">CRO/SP 93910</span>
          </p>
          <p class="hero-instagram">
            <a [href]="config.social.instagram" target="_blank" rel="noopener noreferrer" data-track="social_instagram_hero">@dradaianaferrazsc</a> no Instagram
          </p>
          <!-- hero-cta removido -->
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
      justify-content: center;
      height: 70px;
      gap: 1rem;
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

    .bottom-nav {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 1rem;
      z-index: 999;
      display: block;
      width: calc(100vw - 1rem);
      max-width: 980px;
    }
    .bottom-menu-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 0.55rem;
      border: 1px solid var(--gold-light);
      background: linear-gradient(135deg, var(--gold), var(--gold-dark));
      color: var(--dark);
      border-radius: 999px;
      padding: 0.45rem 0.85rem;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(201, 168, 76, 0.35);
    }
    .bottom-menu-toggle:hover {
      background: linear-gradient(135deg, var(--gold-light), var(--gold));
      color: var(--dark);
    }
    .bottom-dropdown {
      width: max-content;
      max-width: 100%;
      margin: 0 auto;
      border: 1px solid rgba(201, 168, 76, 0.35);
      background: rgba(26, 26, 26, 0.98);
      border-radius: 999px;
      overflow-x: auto;
      overflow-y: visible;
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      scrollbar-width: none;
    }
    .bottom-dropdown::-webkit-scrollbar { display: none; }
    .bottom-menu-item {
      position: relative;
      display: flex;
      align-items: center;
    }
    .bottom-menu-link {
      color: var(--white);
      text-decoration: none;
      padding: 0.65rem 1rem;
      font-size: 0.9rem;
      border-right: 1px solid rgba(201, 168, 76, 0.15);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .bottom-dropdown .bottom-menu-item:last-child .bottom-menu-link {
      border-right: 0;
    }
    .bottom-menu-link:hover {
      color: var(--gold);
      background: rgba(201, 168, 76, 0.08);
    }
    .services-tooltip {
      position: absolute;
      left: 50%;
      bottom: calc(100% + 0.5rem);
      transform: translateX(-50%);
      min-width: 280px;
      max-width: min(92vw, 360px);
      padding: 0.8rem 0.95rem;
      border-radius: 12px;
      border: 1px solid rgba(201, 168, 76, 0.4);
      background: rgba(20, 20, 20, 0.98);
      box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.2s ease, visibility 0.2s ease;
      z-index: 1002;
    }
    .services-item:hover .services-tooltip,
    .services-item:focus-within .services-tooltip {
      opacity: 1;
      visibility: visible;
    }
    .services-tooltip-title {
      margin: 0 0 0.45rem;
      color: var(--gold);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .services-tooltip-list {
      margin: 0;
      padding-left: 1rem;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.82rem;
      line-height: 1.5;
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
      margin-bottom: 0.45rem;
    }
    .hero-bio {
      color: rgba(255,255,255,0.8);
      font-size: 1rem;
      line-height: 1.8;
      max-width: 520px;
      margin-bottom: 0.8rem;
    }
    .hero-instagram {
      color: rgba(255,255,255,0.85);
      font-size: 0.95rem;
      margin-bottom: 1.4rem;
    }
    .hero-instagram a {
      color: var(--gold-light);
      text-decoration: none;
      font-weight: 700;
    }
    .hero-instagram a:hover {
      text-decoration: underline;
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
      .bottom-nav {
        bottom: 6.5rem;
      }
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
      }
      .nav-container {
        display: flex;
        min-height: 64px;
        height: auto;
        gap: 0.75rem;
      }
      .view-switch {
        display: inline-flex;
        flex-shrink: 0;
      }
      .bottom-nav {
        width: calc(100vw - 1.25rem);
        max-width: 360px;
      }
      .bottom-menu-toggle {
        padding: 0.35rem 0.75rem;
        font-size: 0.74rem;
        margin-bottom: 0.45rem;
      }
      .bottom-dropdown {
        width: 100%;
        max-width: 100%;
        flex-direction: column;
        align-items: stretch;
        border-radius: 14px;
        overflow: hidden;
      }
      .bottom-menu-item {
        width: 100%;
      }
      .bottom-menu-link {
        display: block;
        width: 100%;
        text-align: center;
        padding: 0.48rem 0.7rem;
        font-size: 0.8rem;
        border-right: 0;
        border-bottom: 1px solid rgba(201, 168, 76, 0.15);
      }
      .bottom-dropdown .bottom-menu-item:last-child .bottom-menu-link {
        border-bottom: 0;
      }
      .hero-content { flex-direction: column; text-align: center; gap: 2rem; }
      .hero-photo { width: 320px; height: 320px; }
      .hero-bio { margin: 0 auto 2rem; }
      .hero-cta { justify-content: center; }
    }
    @media (max-width: 480px) {
      .navbar { padding: 0 1rem; }
      .nav-container { min-height: 60px; }
      .switch-btn { padding: 0.35rem 0.6rem; font-size: 0.75rem; }
      .bottom-nav {
        width: calc(100vw - 1rem);
        max-width: 320px;
      }
      .bottom-menu-toggle {
        padding: 0.3rem 0.65rem;
        font-size: 0.7rem;
      }
      .bottom-menu-link {
        padding: 0.42rem 0.6rem;
        font-size: 0.76rem;
      }
      .hero-content { padding: 2rem 1rem; }

    }
  `],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  config = SITE_CONFIG;
  readonly heroPhoto = signal(
    (() => {
      const photos = this.config.professional.photos;
      return photos[Math.floor(Math.random() * photos.length)];
    })(),
  );
  readonly isBottomMenuMinimized = signal(true);
  readonly isFooterVisible = signal(false);
  readonly isMobileViewport = signal(false);
  private footerObserver?: IntersectionObserver;

  readonly selectedArea = input<AppArea>('harmonizacao');
  readonly selectedAreaChange = output<AppArea>();

  readonly heroEyebrow = computed(() =>
    this.selectedArea() === 'odontologia' ? 'Odontologia' : 'Harmonização Orofacial',
  );

  readonly heroTitle = computed(() =>
    this.selectedArea() === 'odontologia'
      ? 'Odontologia Estética em São Carlos: Facetas, Clareamento e Prevenção'
      : 'Harmonização Orofacial em São Carlos: Toxina Botulínica, Preenchimento e Peeling',
  );

  readonly heroBio = computed(() =>
    this.selectedArea() === 'odontologia'
      ? 'Da consulta preventiva com câmera intraoral ao tratamento estético, cada atendimento começa com diagnóstico detalhado e plano de cuidado claro. Sem pressão — você entende cada etapa e decide o ritmo junto com a Dra. Daiana.'
      : 'Antes de qualquer procedimento, fazemos juntos um planejamento completo: análise facial, apresentação das opções e escuta das suas expectativas. Durante e depois, acompanhamento dedicado para resultados seguros e naturais.',
  );

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
        { label: 'Odontologia', anchor: 'services-odontologia', description: 'Odontologia Estética em São Carlos: Facetas, Clareamento e Prevenção apenas Odontologia para saúde bucal e estética.' },
        { label: 'Avaliações', anchor: 'reviews' },
        { label: 'Localização', anchor: 'location' },
      ];
    }

    return [
      { label: 'Serviços', anchor: 'services-harmonizacao', description: 'Harmonização Orofacial em São Carlos: Toxina Botulínica, Preenchimento e Peeling conheça nossos serviços.' },
      { label: 'Avaliações', anchor: 'reviews' },
      { label: 'Linha Anna Pegova', anchor: 'products' },
      { label: 'Localização', anchor: 'location' },
    ];
  });

  readonly discountEligibleServices = computed<string[]>(() =>
    this.selectedArea() === 'odontologia'
      ? [
          'Prevenção Bucal com Câmera Intraoral',
          'Clareamento Dental',
          'Facetas de Resina',
          'Implantes Dentários',
          'Prótese Dentária',
        ]
      : [
          'Ultrassom Microfocado',
          'Toxina Botulínica',
          'Preenchimento Labial',
          'Skinbooster',
          'Bioestimuladores de Colágeno',
        ],
  );

  readonly primaryCtaHref = computed(() =>
    this.selectedArea() === 'odontologia' ? '#fidelity-card' : '#gold-card',
  );

  readonly secondaryCtaHref = computed(() =>
    this.selectedArea() === 'odontologia' ? '#services-odontologia' : '#services-harmonizacao',
  );

  readonly primaryCtaLabel = computed(() =>
    this.selectedArea() === 'odontologia' ? 'Conheça o Voucher Ouro' : 'Conheça o Voucher Ouro',
  );

  readonly secondaryCtaLabel = computed(() =>
    '',
  );

  setArea(area: AppArea): void {

    this.selectedAreaChange.emit(area);
    this.isBottomMenuMinimized.set(true);

    // Troca para uma foto aleatória diferente da atual
    const photos = this.config.professional.photos;
    const current = this.heroPhoto();
    const others = photos.filter((p) => p !== current);
    const pool = others.length > 0 ? others : photos;
    this.heroPhoto.set(pool[Math.floor(Math.random() * pool.length)]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleBottomMenu(): void {
    this.isBottomMenuMinimized.update((value) => !value);
  }

  ngAfterViewInit(): void {
    this.isMobileViewport.set(window.matchMedia('(max-width: 900px)').matches);

    const footerElement = document.querySelector('app-footer .footer');
    if (!footerElement) {
      return;
    }

    const rootMarginBottom = this.isMobileViewport() ? '0px' : '180px';

    this.footerObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        this.isFooterVisible.set(visible);
      },
      {
        threshold: 0,
        rootMargin: `0px 0px ${rootMarginBottom} 0px`,
      },
    );

    this.footerObserver.observe(footerElement);
  }

  ngOnDestroy(): void {
    this.footerObserver?.disconnect();
  }
}
