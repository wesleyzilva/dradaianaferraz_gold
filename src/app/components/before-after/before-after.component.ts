import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import type { AppArea } from '../../app';

type BAItem = { label: string; before: string | null; after: string | null; description?: string; };

@Component({
  selector: 'app-before-after',
  standalone: true,
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

          <div class="ba-carousel-wrap">
            <button type="button" class="ba-nav" (click)="prev()" aria-label="Anterior">‹</button>
            <div class="ba-frame">
              <div class="ba-track" [style.transform]="trackTransform()">
                @for (item of activeItems(); track item.label) {
                  <div class="ba-slide">
                    <div class="ba-comparison">
                      <div class="ba-side">
                        @if (item.before) {
                          <img [src]="item.before" [alt]="'Antes: ' + item.label" class="ba-img" loading="lazy" />
                        } @else {
                            <div class="ba-ph"><span>Em breve</span></div>
                        }
                        <span class="ba-tag">Antes</span>
                      </div>
                      <div class="ba-divider" aria-hidden="true"><div class="ba-divider-line"></div></div>
                      <div class="ba-side">
                        @if (item.after) {
                          <img [src]="item.after" [alt]="'Depois: ' + item.label" class="ba-img" loading="lazy" />
                        } @else {
                            <div class="ba-ph"><span>Em breve</span></div>
                        }
                        <span class="ba-tag ba-tag-depois">Depois</span>
                      </div>
                    </div>
                    <div class="ba-info">
                      <p class="ba-label">{{ item.label }}</p>
                      @if (item.description) {
                        <p class="ba-description">{{ item.description }}</p>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
            <button type="button" class="ba-nav" (click)="next()" aria-label="Próximo">›</button>
          </div>

          <div class="ba-dots" role="group" aria-label="Navegação por procedimento">
            @for (item of activeItems(); track item.label; let i = $index) {
              <button type="button" class="ba-dot" [class.ba-dot-active]="currentIndex() === i" (click)="goTo(i)" [attr.aria-label]="item.label"></button>
            }
          </div>
          <p class="ba-counter">{{ currentIndex() + 1 }} / {{ activeItems().length }}</p>

          <p class="ba-disclaimer">
            Resultados podem variar conforme as características individuais de cada paciente. Todos os procedimentos são realizados por profissional habilitada.
          </p>
        }
      </div>
    </section>
  `,
  styles: [`
    .ba-section {
      background: #18132a;
      padding: 6rem 2rem;
    }
    :host-context(#before-after-harmonizacao) .ba-section {
      background: radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.12) 0%, transparent 70%), linear-gradient(135deg, #18132a 0%, #2a1f0a 50%, #18132a 100%);
    }
    :host-context(#before-after-odontologia) .ba-section {
      background: linear-gradient(135deg, #18132a 0%, #1a2a2a 50%, #18132a 100%);
    }
    :host-context(#before-after-harmonizacao) .ba-section {
      background: radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.12) 0%, transparent 70%), linear-gradient(135deg, var(--dark) 0%, #2a1f0a 50%, var(--dark) 100%);
    }
    :host-context(#before-after-odontologia) .ba-section {
      background: linear-gradient(135deg, var(--dark) 0%, #1a2a2a 50%, var(--dark) 100%);
    }
    .section-container { max-width: 900px; margin: 0 auto; }
    .section-header { text-align: center; margin-bottom: 3rem; }
    .section-eyebrow { color: var(--gold); font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 0.5rem; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); color: var(--white); margin-bottom: 0.75rem; }
    .gold-line { width: 60px; height: 3px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); margin: 0 auto 1.5rem; border-radius: 2px; }
    .section-subtitle { color: rgba(255,255,255,0.62); max-width: 600px; margin: 0 auto; line-height: 1.8; font-size: 0.93rem; }

    /* ── EM BREVE ── */
    .ba-coming-soon { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 3.5rem 2rem; background: rgba(201,168,76,0.04); border: 1px dashed rgba(201,168,76,0.3); border-radius: 20px; text-align: center; max-width: 520px; margin: 0 auto 2rem; }
    .ba-cs-icon { font-size: 2.8rem; color: rgba(201,168,76,0.35); }
    .ba-cs-title { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1.3rem; margin: 0; }
    .ba-cs-text { color: rgba(255,255,255,0.45); font-size: 0.88rem; line-height: 1.7; margin: 0; }

    /* ── TABS ── */
    .ba-tabs { display: flex; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; }
    .ba-tab { border: 1px solid rgba(201,168,76,0.4); background: transparent; color: rgba(255,255,255,0.75); border-radius: 999px; padding: 0.4rem 1.1rem; font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: background 0.2s, color 0.2s; }
    .ba-tab-active { background: var(--gold); color: var(--dark); border-color: var(--gold); }

    /* ── CAROUSEL ── */
    .ba-carousel-wrap { position: relative; display: flex; align-items: center; gap: 0.75rem; max-width: 760px; margin: 0 auto; }
    .ba-frame { flex: 1; overflow: hidden; border-radius: 18px; }
    .ba-track { display: flex; transition: transform 0.42s cubic-bezier(0.4,0,0.2,1); }
    .ba-slide { flex: 0 0 100%; min-width: 0; }

    /* ── COMPARISON ── */
    .ba-comparison { display: flex; align-items: stretch; height: 320px; }
    .ba-side { flex: 1; position: relative; overflow: hidden; background: var(--dark-light); }
    .ba-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ba-ph { width: 100%; height: 100%; background: linear-gradient(135deg, #181818, #222); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; }
    .ba-ph i { color: rgba(201,168,76,0.2); font-size: 1.4rem; }
    .ba-ph span { color: rgba(255,255,255,0.2); font-size: 0.68rem; letter-spacing: 1.2px; text-transform: uppercase; }
    .ba-tag { position: absolute; top: 0.5rem; left: 0.5rem; background: rgba(0,0,0,0.65); color: rgba(255,255,255,0.75); font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
    .ba-tag-depois { left: auto; right: 0.5rem; color: var(--gold); border-color: rgba(201,168,76,0.35); }
    .ba-divider { width: 2px; flex-shrink: 0; position: relative; z-index: 2; }
    .ba-divider-line { position: absolute; inset: 0; background: linear-gradient(180deg, transparent, var(--gold) 35%, var(--gold) 65%, transparent); opacity: 0.5; }
    .ba-info { background: var(--dark-light); border-top: 1px solid rgba(201,168,76,0.12); padding: 0.75rem 1rem; }
    .ba-label { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 0.92rem; text-align: center; margin: 0 0 0.3rem; }
    .ba-description { color: rgba(255,255,255,0.6); font-size: 0.82rem; line-height: 1.6; text-align: center; margin: 0; }

    /* ── NAV ── */
    .ba-nav { width: 2.8rem; height: 2.8rem; border-radius: 50%; border: 1px solid rgba(201,168,76,0.4); background: rgba(201,168,76,0.08); color: var(--gold); font-size: 1.6rem; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s; }
    .ba-nav:hover { background: rgba(201,168,76,0.22); }

    /* ── DOTS ── */
    .ba-dots { display: flex; justify-content: center; gap: 0.45rem; margin: 1rem 0 0.4rem; }
    .ba-dot { width: 7px; height: 7px; border-radius: 50%; border: none; background: rgba(201,168,76,0.25); cursor: pointer; transition: background 0.2s, transform 0.2s; padding: 0; }
    .ba-dot-active { background: var(--gold); transform: scale(1.35); }
    .ba-counter { text-align: center; color: rgba(255,255,255,0.55); font-size: 0.82rem; margin: 0 0 1rem; }
    .ba-disclaimer { text-align: center; color: rgba(255,255,255,0.5); font-size: 0.82rem; max-width: 640px; margin: 0.5rem auto 0; line-height: 1.6; }

    @media (max-width: 600px) {
      .ba-section { padding: 4rem 1rem; }
      .ba-comparison { height: 200px; }
      .ba-nav { width: 2.2rem; height: 2.2rem; font-size: 1.2rem; }
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
  readonly currentIndex = signal(0);

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

  readonly trackTransform = computed(() => `translateX(-${this.currentIndex() * 100}%)`);

  setGroup(group: 'invasivo' | 'nao'): void {
    this.activeGroup.set(group);
    this.currentIndex.set(0);
  }

  prev(): void {
    const total = this.activeItems().length;
    this.currentIndex.update((i) => (i - 1 + total) % total);
  }

  next(): void {
    const total = this.activeItems().length;
    this.currentIndex.update((i) => (i + 1) % total);
  }

  goTo(i: number): void {
    this.currentIndex.set(i);
  }
}
