// Aplicação desenvolvida por Wesley Silva.
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SITE_CONFIG } from './config/site-config';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { OdontologyComponent } from './components/odontology/odontology.component';
import { ProductsComponent } from './components/products/products.component';
import { LocationComponent } from './components/location/location.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { GoldCardComponent } from './components/gold-card/gold-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { BeforeAfterComponent } from './components/before-after/before-after.component';

export type AppArea = 'odontologia' | 'harmonizacao';

@Component({
  selector: 'app-root',
  imports: [
    HeroComponent,
    ServicesComponent,
    OdontologyComponent,
    ProductsComponent,
    LocationComponent,
    ReviewsComponent,
    GoldCardComponent,
    FooterComponent,
    BeforeAfterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly config = SITE_CONFIG;
  readonly selectedArea = signal<AppArea>('harmonizacao');
  readonly showLocationPopup = signal(true);
  readonly patoBrancoWhatsappUrl = this.buildWhatsappUrl('Oi, Dra. Daiana! Sou de Pato Branco/PR e quero agendar uma avaliação.');
  readonly saoCarlosWhatsappUrl = this.buildWhatsappUrl('Oi, Dra. Daiana! Sou de São Carlos/SP e quero agendar uma avaliação.');

  onAreaChange(area: AppArea): void {
    this.selectedArea.set(area);
  }

  closeLocationPopup(): void {
    this.showLocationPopup.set(false);
  }

  private buildWhatsappUrl(message: string): string {
    return `${this.config.professional.whatsapp}?text=${encodeURIComponent(message)}`;
  }
}
