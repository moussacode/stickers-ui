import { Injectable, signal } from '@angular/core';
import { Sticker } from '../interfaces/sticker.interface';
import { STICKERS_MOCK } from '../mocks/stickers.mock';

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

  return STICKERS_MOCK;
}
}
