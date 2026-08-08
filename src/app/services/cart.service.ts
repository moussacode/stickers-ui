import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem } from '../interfaces/cart-item.interface';
import { Sticker } from '../interfaces/sticker.interface';
import { WHATSAPP_NUMBER } from '../config/site-config';

const STORAGE_KEY = 'stickerbag_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(this.readFromSession());

  /** Read-only list of items currently in the bag. */
  readonly items = this._items.asReadonly();

  /** Total number of stickers across all lines (sum of quantities). */
  readonly totalItems = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0),
  );

  /** Total price of the bag. */
  readonly totalPrice = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity * item.sticker.price, 0),
  );

  readonly isEmpty = computed(() => this._items().length === 0);

  constructor() {
    // Keep sessionStorage in sync with the cart signal automatically.
    // sessionStorage (not localStorage) is intentional: the bag is only
    // meant to survive the current tab/session, not persist forever.
    effect(() => {
      const snapshot = this._items();
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
        // sessionStorage can throw in private-browsing edge cases — ignore,
        // the in-memory signal still works for the rest of the session.
      }
    });
  }

  addToBag(sticker: Sticker, quantity = 1): void {
    this._items.update((items) => {
      const existing = items.find((item) => item.sticker.id === sticker.id);
      if (existing) {
        return items.map((item) =>
          item.sticker.id === sticker.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...items, { sticker, quantity }];
    });
  }

  updateQuantity(stickerId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromBag(stickerId);
      return;
    }
    this._items.update((items) =>
      items.map((item) => (item.sticker.id === stickerId ? { ...item, quantity } : item)),
    );
  }

  removeFromBag(stickerId: string): void {
    this._items.update((items) => items.filter((item) => item.sticker.id !== stickerId));
  }

  clearBag(): void {
    this._items.set([]);
  }

  /**
   * Builds the wa.me URL with a pre-filled order message: each sticker,
   * quantity, and the estimated total — ready for the seller to close the
   * sale directly on WhatsApp. No payment happens on the site itself.
   */
 buildWhatsAppCheckoutUrl(pickupLocation: string): string {
  const lines = this._items().map(
    (item) =>
      `- ${item.quantity}x ${item.sticker.name} — ${
        item.sticker.price * item.quantity
      } ${item.sticker.currency}`,
  );

  const message = [
    'Bonjour ! Je souhaite commander :',
    '',
    ...lines,
    '',
    `Total estimé : ${this.totalPrice()} ${
      this._items()[0]?.sticker.currency ?? 'FCFA'
    }`,
    `📍 Lieu de récupération : ${pickupLocation}`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
  private readFromSession(): CartItem[] {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
