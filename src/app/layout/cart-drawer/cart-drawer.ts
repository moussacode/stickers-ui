// cart-drawer.ts — ajoute juste la fermeture au clavier
import { Component, HostListener, inject, input, output } from '@angular/core';
import { LucideAngularModule, X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [LucideAngularModule],
  templateUrl: './cart-drawer.html',
})
export class CartDrawer {
  protected readonly cart = inject(CartService);
  protected readonly X = X;
  protected readonly Minus = Minus;
  protected readonly Plus = Plus;
  protected readonly Trash2 = Trash2;
  protected readonly MessageCircle = MessageCircle;
  protected readonly ShoppingBag = ShoppingBag;

  open = input.required<boolean>();
  close = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close.emit();
  }
}