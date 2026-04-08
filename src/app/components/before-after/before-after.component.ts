import { Component, computed, input } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import type { AppArea } from '../../app';

type BAItem = { label: string; before: string | null; after: string | null };

@Component({
  selector: 'app-before-after',
  standalone: true,
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
            <div class="ba-cs-icon"><i class="fas fa-images" aria-hidden="true"></i></div>
            <h3 class="ba-cs-title">Registros fotográficos em breve</h3>
            <p class="ba-cs-text">Estamos preparando os registros de antes e depois dos procedimentos.<br>Em breve você poderá acompanhar as transformações reais dos nossos pacientes.</p>
          </div>
        } @else if (area() === 'odontologia') {
          <div class="ba-grid">
            @for (item of odontologiaItems; track item.label) {
              <div class="ba-card">
                <div class="ba-comparison">
                  <div class="ba-side">
                    @if (item.before) {
                      <img [src]="item.before" [alt]="'Antes: ' + item.label" class="ba-img" loading="lazy" />
                    } @else {
                      <div class="ba-ph"><i class="fas fa-camera" aria-hidden="true"></i><span>Foto em breve</span></div>
                    }
                    <span class="ba-tag">Antes</span>
                  </div>
                  <div class="ba-divider" aria-hidden="true"><div class="ba-divider-line"></div></div>
                  <div class="ba-side">
                    @if (item.after) {
                      <img [src]="item.after" [alt]="'Depois: ' + item.label" class="ba-img" loading="lazy" />
                    } @else {
                      <div class="ba-ph"><i class="fas fa-camera" aria-hidden="true"></i><span>Foto em breve</span></div>
                    }
                    <span class="ba-tag ba-tag-depois">Depois</span>
                  </div>
                </div>
                <p class="ba-label">{{ item.label }}</p>
              </div>
            }
          </div>
        } @else {
          @if (hasInvasivoImages()) {
            <div class="ba-group">
              <h3 class="ba-group-title"><span class="ba-group-dot ba-dot-invasivo" aria-hidden="true"></span>Invasivo</h3>
              <div class="ba-grid">
                @for (item of invasivoItems; track item.label) {
                  <div class="ba-card">
                    <div class="ba-comparison">
                      <div class="ba-side">
                        @if (item.before) {
                          <img [src]="item.before" [alt]="'Antes: ' + item.label" class="ba-img" loading="lazy" />
                        } @else {
                          <div class="ba-ph"><i class="fas fa-camera" aria-hidden="true"></i><span>Foto em breve</span></div>
                        }
                        <span class="ba-tag">Antes</span>
                      </div>
                      <div class="ba-divider" aria-hidden="true"><div class="ba-divider-line"></div></div>
                      <div class="ba-side">
                        @if (item.after) {
                          <img [src]="item.after" [alt]="'Depois: ' + item.label" class="ba-img" loading="lazy" />
                        } @else {
                          <div class="ba-ph"><i class="fas fa-camera" aria-hidden="true"></i><span>Foto em breve</span></div>
                        }
                        <span class="ba-tag ba-tag-depois">Depois</span>
                      </div>
                    </div>
                    <p class="ba-label">{{ item.label }}</p>
                  </div>
                }
              </div>
            </div>
          }
          @if (hasNaoInvasivoImages()) {
            <div class="ba-group">
              <h3 class="ba-group-title"><span class="ba-group-dot ba-dot-nao" aria-hidden="true"></span>Não Invasivo</h3>
              <div class="ba-grid">
                @for (item of naoInvasivoItems; track item.label) {
                  <div class="ba-card">
                    <div class="ba-comparison">
                      <div class="ba-side">
                        @if (item.before) {
                          <img [src]="item.before" [alt]="'Antes: ' + item.label" class="ba-img" loading="lazy" />
                        } @else {
                          <div class="ba-ph"><i class="fas fa-camera" aria-hidden="true"></i><span>Foto em breve</span></div>
                        }
                        <span class="ba-tag">Antes</span>
                      </div>
                      <div class="ba-divider" aria-hidden="true"><div class="ba-divider-line"></div></div>
                      <div class="ba-side">
                        @if (item.after) {
                          <img [src]="item.after" [alt]="'Depois: ' + item.label" class="ba-img" loading="lazy" />
                        } @else {
                          <div class="ba-ph"><i class="fas fa-camera" aria-hidden="true"></i><span>Foto em breve</span></div>
                        }
                        <span class="ba-tag ba-tag-depois">Depois</span>
                      </div>
                    </div>
                    <p class="ba-label">{{ item.label }}</p>
                  </div>
                }
              </div>
            </div>
          }
        }

        @if (hasImages()) {
          <p class="ba-disclaimer">
            Resultados podem variar conforme as características individuais de cada paciente. Todos os procedimentos são realizados por profissional habilitada.
          </p>
        }
      </div>
    </section>
  `,
  styles: [`
    .ba-section { background: var(--dark); padding: 6rem 2rem; }
    .section-container { max-width: 1200px; margin: 0 auto; }
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

    /* ── GROUP ── */
    .ba-group { margin-bottom: 2.5rem; }
    .ba-group-title { font-family: 'Playfair Display', serif; color: var(--white); font-size: 1.05rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.55rem; }
    .ba-group-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; display: inline-block; }
    .ba-dot-invasivo { background: var(--gold); }
    .ba-dot-nao { background: #7ec8e3; }

    /* ── GRID ── */
    .ba-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }

    /* ── CARD ── */
    .ba-card { background: var(--dark-light); border: 1px solid rgba(201,168,76,0.18); border-radius: 16px; overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s; }
    .ba-card:hover { border-color: rgba(201,168,76,0.45); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
    .ba-comparison { display: flex; align-items: stretch; height: 220px; }
    .ba-side { flex: 1; position: relative; overflow: hidden; }
    .ba-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .ba-ph { width: 100%; height: 100%; background: linear-gradient(135deg, #181818, #222); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; }
    .ba-ph i { color: rgba(201,168,76,0.2); font-size: 1.4rem; }
    .ba-ph span { color: rgba(255,255,255,0.2); font-size: 0.68rem; letter-spacing: 1.2px; text-transform: uppercase; }
    .ba-tag { position: absolute; top: 0.5rem; left: 0.5rem; background: rgba(0,0,0,0.65); color: rgba(255,255,255,0.55); font-size: 0.62rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 0.15rem 0.5rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
    .ba-tag-depois { left: auto; right: 0.5rem; color: var(--gold); border-color: rgba(201,168,76,0.35); }
    .ba-divider { width: 2px; flex-shrink: 0; position: relative; z-index: 2; }
    .ba-divider-line { position: absolute; inset: 0; background: linear-gradient(180deg, transparent, var(--gold) 35%, var(--gold) 65%, transparent); opacity: 0.5; }
    .ba-label { font-family: 'Playfair Display', serif; color: var(--gold); font-size: 0.92rem; text-align: center; padding: 0.75rem; margin: 0; border-top: 1px solid rgba(201,168,76,0.12); }
    .ba-disclaimer { text-align: center; color: rgba(255,255,255,0.28); font-size: 0.75rem; max-width: 640px; margin: 1.5rem auto 0; line-height: 1.6; }

    @media (max-width: 600px) {
      .ba-section { padding: 4rem 1rem; }
      .ba-comparison { height: 170px; }
      .ba-grid { grid-template-columns: 1fr; }
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

  private anyImage(items: BAItem[]): boolean {
    return items.some((i) => i.before !== null || i.after !== null);
  }

  hasInvasivoImages(): boolean { return this.anyImage(this.invasivoItems); }
  hasNaoInvasivoImages(): boolean { return this.anyImage(this.naoInvasivoItems); }

  readonly hasImages = computed(() => {
    if (this.area() === 'odontologia') return this.anyImage(this.odontologiaItems);
    return this.anyImage(this.invasivoItems) || this.anyImage(this.naoInvasivoItems);
  });
}
