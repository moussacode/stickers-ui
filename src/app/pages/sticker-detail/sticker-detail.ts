import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
} from 'lucide-angular';
import { StickerService } from '../../services/sticker.service';
import { CartService } from '../../services/cart.service';
import { WHATSAPP_NUMBER } from '../../config/site-config';
import { ProductGrid } from '../../components/product-grid/product-grid';

const RELATED_COUNT = 4;
type DetailTab = 'details' | 'packaging' | 'shipping';
type AccordionSection = 'features' | 'application' | 'quality';

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
  protected readonly ChevronRight = ChevronRight;
  protected readonly ChevronDown = ChevronDown;
  protected readonly Heart = Heart;
  protected readonly Minus = Minus;
  protected readonly Plus = Plus;
  protected readonly ShoppingBag = ShoppingBag;
  protected readonly MessageCircle = MessageCircle;
  protected readonly Star = Star;

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

  protected readonly activeImageIndex = signal(0);

  protected selectImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  protected prevImage(): void {
    const total = this.sticker()?.images.length ?? 1;
    this.activeImageIndex.update((i) => (i === 0 ? total - 1 : i - 1));
  }

  protected nextImage(): void {
    const total = this.sticker()?.images.length ?? 1;
    this.activeImageIndex.update((i) => (i === total - 1 ? 0 : i + 1));
  }

  protected readonly quantity = signal(1);

  protected increment(): void {
    this.quantity.update((q) => q + 1);
  }

  protected decrement(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  protected readonly isWished = signal(false);
  protected readonly justAdded = signal(false);

  protected addToBag(): void {
    const current = this.sticker();
    if (!current) return;
    this.cart.addToBag(current, this.quantity());
    this.justAdded.set(true);
    setTimeout(() => this.justAdded.set(false), 1200);
  }

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

  protected readonly activeTab = signal<DetailTab>('details');

  protected setTab(tab: DetailTab): void {
    this.activeTab.set(tab);
  }

  protected readonly openSection = signal<AccordionSection | null>('application');

  protected toggleSection(section: AccordionSection): void {
    this.openSection.update((current) => (current === section ? null : section));
  }
}