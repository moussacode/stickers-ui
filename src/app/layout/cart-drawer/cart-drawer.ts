import { Component, inject, input, output } from '@angular/core';
import { LucideAngularModule, X, Plus, Minus, Trash2, MessageCircle } from 'lucide-angular';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cart-drawer.html',
})
export class CartDrawer {
  protected readonly cart = inject(CartService);

  open = input.required<boolean>();
  close = output<void>();

  protected readonly X = X;
  protected readonly Plus = Plus;
  protected readonly Minus = Minus;
  protected readonly Trash2 = Trash2;
  protected readonly MessageCircle = MessageCircle;
}