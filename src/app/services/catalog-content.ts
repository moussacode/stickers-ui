import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatalogContent {
  
  getCategoryHighlights() {
  return [
    { label: 'Dev & Code', imageUrl: 'https://picsum.photos/seed/cat-dev/200/200' },
    { label: 'Gaming', imageUrl: 'https://picsum.photos/seed/cat-gaming/200/200' },
    { label: 'Anime', imageUrl: 'https://picsum.photos/seed/cat-anime/200/200' },
    { label: 'Motivation', imageUrl: 'https://picsum.photos/seed/cat-motiv/200/200' },
    { label: 'Animaux mignons', imageUrl: 'https://picsum.photos/seed/cat-cute/200/200' },
    { label: 'Humour', imageUrl: 'https://picsum.photos/seed/cat-funny/200/200' },
  ];
}
}
