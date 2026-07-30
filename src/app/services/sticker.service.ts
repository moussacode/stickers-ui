import { Injectable, signal } from '@angular/core';
import { Sticker } from '../interfaces/sticker.interface';

/**
 * Provides the sticker catalog. Backed by static mock data for now — swap the
 * body of `getStickers()` for an HttpClient call to a real API later without
 * touching any component.
 */
@Injectable({ providedIn: 'root' })
export class StickerService {
  private readonly stickers = signal<Sticker[]>(this.buildMockCatalog());

  getStickers() {
    return this.stickers.asReadonly();
  }

  getById(id: string): Sticker | undefined {
    return this.stickers().find((s) => s.id === id);
  }

  private buildMockCatalog(): Sticker[] {
  const names = [
    'Bash - Terminal',
    'React Logo Glitch',
    'Node.js Hexagon',
    'Angular Shield',
    'Vue Wave',
    '404 Not Found',
    'console.log("hi")',
    'Git Branch',
    'Docker Whale',
    'TypeScript Type',
    'Ctrl + Alt + Del',
    'Dark Mode Forever',
    'Semicolon Wars',
    'Rubber Duck Debug',
    'Merge Conflict',
    'Stack Overflow Copy',
    'Infinite Loop',
    'Coffee && Code',
    'Regex Headache',
    'Clean Code Heart',
    'Vim Escape',
    'API Key Leaked',
    'Ship It',
    'Works On My Machine',
  ];

  const artists = [
    'NabilsDesign',
    'PixelPunk',
    'DevDoodles',
    'StickyBits',
    'CodeCrumbs',
  ];

  const categories = [
    'Terminal',
    'Frontend',
    'Backend',
    'DevOps',
    'Debug',
    'Humour',
  ];

  return names.map((name, i) => {
    const price = 500 + (i % 6) * 150;
    const hasDiscount = i % 3 === 0;
    const original = hasDiscount ? Math.round(price * 1.15) : undefined;

    return {
      id: `sticker-${i + 1}`,
      name: `${name} Sticker`,
      artist: artists[i % artists.length],
      imageUrl: `https://picsum.photos/seed/sticker-${i + 1}/400/400`,
      price,
      originalPrice: original,
      discountPercent: hasDiscount ? 10 : undefined,
      currency: 'FCFA',
      category: categories[i % categories.length], // ajouté
    } satisfies Sticker;
  });
}
}
