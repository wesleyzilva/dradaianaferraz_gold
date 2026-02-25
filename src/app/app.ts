import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { OdontologyComponent } from './components/odontology/odontology.component';
import { ProductsComponent } from './components/products/products.component';
import { LocationComponent } from './components/location/location.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { GoldCardComponent } from './components/gold-card/gold-card.component';
import { FooterComponent } from './components/footer/footer.component';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly selectedArea = signal<AppArea>('harmonizacao');

  onAreaChange(area: AppArea): void {
    this.selectedArea.set(area);
  }
}
