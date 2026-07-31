// src/app/interfaces/sticker.interface.ts
export interface Sticker {
  id: string;
  name: string;
  artist: string;
  images: string[]; // au moins 1 image ; la 1ère sert de vignette dans les grilles
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  currency: string;
  category: string;
  description?: string;
  rating?: number; // 0-5, optionnel — pas de faux avis si absent
  reviewCount?: number;
}