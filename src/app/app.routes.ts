import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { StickerList } from './pages/sticker-list/sticker-list';
import { StickerDetail } from './pages/sticker-detail/sticker-detail';

export const routes: Routes = [

    {
    path: '',
    component: Home,
    
  },
  { path: 'stickers', component: StickerList },
   {
    path: 'stickers/:id',
    component: StickerDetail,
  },

];
