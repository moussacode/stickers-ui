// src/app/interfaces/sticker.interface.ts
export interface Sticker {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  currency: string;
  category: string; // ← ajouté
}