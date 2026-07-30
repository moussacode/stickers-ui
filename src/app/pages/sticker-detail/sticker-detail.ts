import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule, Heart, Minus, Plus, ShoppingBag, MessageCircle, ChevronLeft } from 'lucide-angular';
import { StickerService } from '../../services/sticker.service';
import { CartService } from '../../services/cart.service';
import { WHATSAPP_NUMBER } from '../../config/site-config';
import { ProductGrid } from '../../components/product-grid/product-grid';

const RELATED_COUNT = 4;

@Component({
  selector: 'app-sticker-detail',
  imports: [RouterLink, LucideAngularModule, ProductGrid],
  templateUrl: './sticker-detail.html',
})
export class StickerDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly stickerService = inject(StickerService);
  protected readonly cart = inject(CartService);

  protected readonly ChevronLeft = ChevronLeft;
  protected readonly Heart = Heart;
  protected readonly Minus = Minus;
  protected readonly Plus = Plus;
  protected readonly ShoppingBag = ShoppingBag;
  protected readonly MessageCircle = MessageCircle;

  // Réactif au paramètre d'URL : si l'utilisateur clique sur un sticker "similaire"
  // depuis cette même page, l'id change sans recréer le composant.
  private readonly paramMap = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });

  protected readonly sticker = computed(() => {
    const id = this.paramMap().get('id');
    return id ? this.stickerService.getById(id) : undefined;
  });

  protected readonly relatedStickers = computed(() => {
    const current = this.sticker();
    if (!current) return [];
    return this.stickerService
      .getStickers()()
      .filter((s) => s.category === current.category && s.id !== current.id)
      .slice(0, RELATED_COUNT);
  });

  protected readonly quantity = signal(1);
  protected readonly isWished = signal(false);
  protected readonly justAdded = signal(false);

  protected increment(): void {
    this.quantity.update((q) => q + 1);
  }

  protected decrement(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  protected addToBag(): void {
    const current = this.sticker();
    if (!current) return;
    this.cart.addToBag(current, this.quantity());
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 1200);
  }

  /** Commande directe pour ce seul sticker, sans passer par le sac. */
  protected buyNowUrl(): string {
    const current = this.sticker();
    if (!current) return '#';
    const qty = this.quantity();
    const message = [
      'Bonjour ! Je souhaite commander :',
      '',
      `- ${qty}x ${current.name} — ${current.price * qty} ${current.currency}`,
    ].join('\n');


    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  
  }
}