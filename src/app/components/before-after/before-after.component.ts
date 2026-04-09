import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import type { AppArea } from '../../app';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';

type BAItem = { label: string; before: string | null; after: string | null; description?: string; };

@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [ImageCarouselComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="ba-section" [id]="sectionId()">
      <div class="section-container">
        <div class="section-header">
          <p class="section-eyebrow">Transformações</p>
          <h2 class="section-title">Antes &amp; Depois</h2>
          <div class="gold-line"></div>
          <p class="section-subtitle">
            Resultados reais com planejamento clínico e respeito às características individuais de cada paciente.
          </p>
        </div>

        @if (!hasImages()) {
          <div class="ba-coming-soon">
            <h3 class="ba-cs-title">Registros fotográficos em breve</h3>
            <p class="ba-cs-text">Estamos preparando os registros de antes e depois dos procedimentos.<br>Em breve você poderá acompanhar as transformações reais dos nossos pacientes.</p>
          </div>
        } @else {
          @if (area() !== 'odontologia' && hasInvasivoImages() && hasNaoInvasivoImages()) {
            <div class="ba-tabs" role="group" aria-label="Filtrar por tipo de procedimento">
              <button type="button" class="ba-tab" [class.ba-tab-active]="activeGroup() === 'invasivo'" (click)="setGroup('invasivo')">Invasivo</button>
              <button type="button" class="ba-tab" [class.ba-tab-active]="activeGroup() === 'nao'" (click)="setGroup('nao')">Não Invasivo</button>
            </div>
          }

          <div class="carousel-block">
            <app-image-carousel
              [images]="carouselImages()"
              [title]="carouselTitle()"
              ariaLabel="Carrossel de resultados reais"
              aspectRatio="portrait"
              imageFit="contain"
              variant="showcase"
              badgeText="Resultado Real"
            ></app-image-carousel>
          </div>

          <p class="ba-disclaimer">
            Resultados podem variar conforme as características individuais de cada paciente. Todos os procedimentos são realizados por profissional habilitada.
          </p>
        }
      </div>
    </section>
  `,
  styles: [`
    .ba-section {
      background: linear-gradient(135deg, var(--dark) 0%, #2a1f0a 50%, var(--dark) 100%);
      padding: 6rem 2rem;
      position: relative;
      overflow: hidden;
    }
    .ba-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .section-container { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-eyebrow { color: var(--gold); font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 0.5rem; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); color: var(--white); margin-bottom: 0.75rem; }
    .gold-line { width: 60px; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); margin: 0 auto 1.5rem; border-radius: 2px; }
    .section-subtitle { color: rgba(255,255,255,0.62); max-width: 600px; margin: 0 auto; line-height: 1.8; font-size: 0.93rem; }
    .carousel-block { max-width: 880px; margin: 0 auto; }

    .ba-coming-soon {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 3.5rem 2rem;
      background: rgba(201,168,76,0.04);
      border: 1px dashed rgba(201,168,76,0.3);
      border-radius: 20px;
      text-align: center;
      max-width: 520px;
      margin: 0 auto 2rem;
    }
    .ba-cs-title { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1.3rem; margin: 0; }
    .ba-cs-text { color: rgba(255,255,255,0.45); font-size: 0.88rem; line-height: 1.7; margin: 0; }

    .ba-tabs { display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; }
    .ba-tab {
      border: 1px solid rgba(201,168,76,0.4);
      background: transparent;
      color: rgba(255,255,255,0.75);
      border-radius: 999px;
      padding: 0.4rem 1.1rem;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .ba-tab-active { background: var(--gold); color: var(--dark); border-color: var(--gold); }

    .ba-disclaimer {
      text-align: center;
      color: rgba(255,255,255,0.5);
      font-size: 0.82rem;
      max-width: 640px;
      margin: 1rem auto 0;
      line-height: 1.6;
    }

    @media (max-width: 600px) {
      .ba-section { padding: 4rem 1rem; }
      .carousel-block { max-width: 100%; }
    }
  `],
})
export class BeforeAfterComponent {
  readonly config = SITE_CONFIG;
  readonly area = input<AppArea>('harmonizacao');
  readonly sectionId = input('before-after-harmonizacao');

  readonly invasivoItems: BAItem[] = this.config.beforeAfterHarmonizacaoInvasivo;
  readonly naoInvasivoItems: BAItem[] = this.config.beforeAfterHarmonizacaoNaoInvasivo;
  readonly odontologiaItems: BAItem[] = this.config.beforeAfterOdontologia;

  readonly activeGroup = signal<'invasivo' | 'nao'>('invasivo');

  private anyImage(items: BAItem[]): boolean {
    return items.some((i) => i.before !== null || i.after !== null);
  }

  hasInvasivoImages(): boolean { return this.anyImage(this.invasivoItems); }
  hasNaoInvasivoImages(): boolean { return this.anyImage(this.naoInvasivoItems); }

  readonly hasImages = computed(() => {
    if (this.area() === 'odontologia') return this.anyImage(this.odontologiaItems);
    return this.anyImage(this.invasivoItems) || this.anyImage(this.naoInvasivoItems);
  });

  readonly activeItems = computed((): BAItem[] => {
    if (this.area() === 'odontologia') return this.odontologiaItems;
    if (!this.hasInvasivoImages()) return this.naoInvasivoItems;
    if (!this.hasNaoInvasivoImages()) return this.invasivoItems;
    return this.activeGroup() === 'invasivo' ? this.invasivoItems : this.naoInvasivoItems;
  });

  readonly carouselImages = computed(() =>
    this.activeItems()
      .filter((item) => item.before !== null || item.after !== null)
      .map((item) => ({
        src: item.after ?? item.before ?? '',
        label: item.label,
        description: item.description,
      })),
  );

  readonly carouselTitle = computed(() => {
    if (this.area() === 'odontologia') return 'Resultados reais de odontologia';
    return this.activeGroup() === 'invasivo'
      ? 'Resultados reais · Harmonização invasiva'
      : 'Resultados reais · Harmonização não invasiva';
  });

  setGroup(group: 'invasivo' | 'nao'): void {
    this.activeGroup.set(group);
  }
}
