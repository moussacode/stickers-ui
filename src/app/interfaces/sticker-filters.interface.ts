// src/app/interfaces/sticker-filters.interface.ts
export type SortValue = 'relevant' | 'price-asc' | 'price-desc' | 'newest';

export interface StickerFilters {
  onSaleOnly: boolean;
  maxPrice: number | null;
}