// Aplicação desenvolvida por Wesley Silva.
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, afterNextRender, signal } from '@angular/core';
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
  @ViewChild('locationPopup') private readonly locationPopup?: ElementRef<HTMLElement>;

  readonly config = SITE_CONFIG;
  readonly selectedArea = signal<AppArea>('harmonizacao');
  readonly showLocationPopup = signal(true);
  readonly patoBrancoWhatsappUrl = this.buildWhatsappUrl('Oi, Dra. Daiana! Sou de Pato Branco/PR e quero agendar uma avaliação.');
  readonly saoCarlosWhatsappUrl = this.buildWhatsappUrl('Oi, Dra. Daiana! Sou de São Carlos/SP e quero agendar uma avaliação.');

  constructor() {
    afterNextRender(() => {
      this.focusLocationPopup();
    });
  }

  onAreaChange(area: AppArea): void {
    this.selectedArea.set(area);
  }

  closeLocationPopup(): void {
    this.showLocationPopup.set(false);
  }

  handleLocationPopupKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeLocationPopup();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const popupElement = this.locationPopup?.nativeElement;
    if (!popupElement) {
      return;
    }

    const focusableElements = Array.from(
      popupElement.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('hidden') && element.tabIndex >= 0);

    if (focusableElements.length === 0) {
      event.preventDefault();
      popupElement.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement | null;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  private buildWhatsappUrl(message: string): string {
    try {
      const url = new URL(this.config.professional.whatsapp);
      url.searchParams.set('text', message);
      return url.toString();
    } catch {
      console.warn('Invalid WhatsApp URL in site configuration.');
      return this.config.professional.whatsapp;
    }
  }

  private focusLocationPopup(): void {
    if (!this.showLocationPopup()) {
      return;
    }

    this.locationPopup?.nativeElement.focus();
  }
}
