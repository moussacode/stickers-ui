// src/app/homes/product-grid/product-grid.ts
import { Component, input } from '@angular/core';
import { Sticker } from '../../interfaces/sticker.interface';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard],
  template: `
    <div class="grid grid-cols-2 gap-x-4 gap-y-6 auto-rows-fr sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
      @for (sticker of stickers(); track sticker.id) {
        <app-product-card [sticker]="sticker" />
      }
    </div>
  `,
})
export class ProductGrid {
  stickers = input.required<Sticker[]>();
}