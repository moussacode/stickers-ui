import { Routes } from '@angular/router';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home),
  },
  {
  path: 'checkout',
  component: Checkout
},

  {
    path: 'stickers',
    loadComponent: () =>
      import('./pages/sticker-list/sticker-list')
        .then(m => m.StickerList),
  },

  {
    path: 'stickers/:id',
    loadComponent: () =>
      import('./pages/sticker-detail/sticker-detail')
        .then(m => m.StickerDetail),
  },

  {
    path: 'custom-sticker',
    loadComponent: () =>
      import('./pages/custom-sticker/custom-sticker')
        .then(m => m.CustomSticker),
  },

];