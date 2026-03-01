// Aplicação desenvolvida por Wesley Silva.
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { OdontologyComponent } from './components/odontology/odontology.component';
import { ProductsComponent } from './components/products/products.component';
import { LocationComponent } from './components/location/location.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { GoldCardComponent } from './components/gold-card/gold-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { MiniAnalyticsComponent } from './components/mini-analytics/mini-analytics.component';
import { SITE_CONFIG } from './config/site-config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export type AppArea = 'odontologia' | 'harmonizacao';

@Component({
  selector: 'app-root',
  imports: [
    HeroComponent,
    ServicesComponent,
    OdontologyComponent,
    ProductsComponent,
    LocationComponent,
    ProceduresComponent,
    ReviewsComponent,
    GoldCardComponent,
    FooterComponent,
    MiniAnalyticsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly document = inject(DOCUMENT);
  readonly selectedArea = signal<AppArea>('harmonizacao');

  ngOnInit(): void {
    this.initializeGoogleTag();
  }

  onAreaChange(area: AppArea): void {
    this.selectedArea.set(area);
  }

  private initializeGoogleTag(): void {
    const tagId = SITE_CONFIG.analytics.googleTagId?.trim();
    if (!tagId || tagId === 'G-XXXXXXXXXX') {
      return;
    }

    if (this.document.getElementById('google-gtag-script')) {
      return;
    }

    const externalScript = this.document.createElement('script');
    externalScript.id = 'google-gtag-script';
    externalScript.async = true;
    externalScript.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    this.document.head.appendChild(externalScript);

    const inlineScript = this.document.createElement('script');
    inlineScript.text = [
      'window.dataLayer = window.dataLayer || [];',
      'function gtag(){dataLayer.push(arguments);}',
      'window.gtag = gtag;',
      "gtag('js', new Date());",
      `gtag('config', '${tagId}');`,
    ].join('\n');
    this.document.head.appendChild(inlineScript);
  }
}
