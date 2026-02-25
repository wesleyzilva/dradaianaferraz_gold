import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ProductsComponent } from './components/products/products.component';
import { LocationComponent } from './components/location/location.component';
import { ProceduresComponent } from './components/procedures/procedures.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { GoldCardComponent } from './components/gold-card/gold-card.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    HeroComponent,
    ServicesComponent,
    ProductsComponent,
    LocationComponent,
    ProceduresComponent,
    ReviewsComponent,
    GoldCardComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
