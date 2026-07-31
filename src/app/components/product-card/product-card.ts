// src/app/homes/product-card/product-card.ts
import { Component, inject, input, signal } from '@angular/core';
import { LucideAngularModule, Heart, Plus, Check } from 'lucide-angular';
import { Sticker } from '../../interfaces/sticker.interface';
import { CartService } from '../../services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [LucideAngularModule, RouterLink],
  template: `
    <div class="group flex w-full flex-col overflow-hidden rounded-lg bg-white transition-shadow ">
      <div 
       [routerLink]="['/stickers', sticker().id]"
       class="group relative aspect-square overflow-hidden rounded-lg bg-border-hairline cursor-pointer  lg:p-6">
        <img
          [src]="sticker().images[0]"
          [alt]="sticker().name"
          loading="lazy"
          class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

        @if (sticker().discountPercent) {
          <span class="absolute left-2 top-2 rounded-full bg-brand-accent px-2 py-1 text-xs font-semibold text-white">
            -{{ sticker().discountPercent }}%
          </span>
        }

        <!-- <button
          type="button"
          class="absolute cursor-pointer right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/90 text-ink-faint transition hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          [class.text-brand-accent]="isWished()"
          (click)="isWished.set(!isWished())"
          [attr.aria-label]="isWished() ? 'Retirer des favoris' : 'Ajouter aux favoris'"
          [attr.aria-pressed]="isWished()"
        >
          <lucide-icon [img]="Heart" class="size-4 " [class.fill-current]="isWished()"></lucide-icon>
        </button> -->
      </div>

      <div class="flex flex-1 flex-col gap-2 p-3">
        <div class="min-h-[40px]">
          <p class="line-clamp-2 text-sm leading-5 text-ink">{{ sticker().name }}</p>
          <p class="truncate text-xs text-ink-soft">{{ sticker().artist }}</p>
        </div>

        <div class="mt-auto flex items-end justify-between gap-2">
          <div class="flex items-baseline gap-1.5">
            <p class="text-base font-semibold text-brand-price">{{ sticker().price }} {{ sticker().currency }}</p>
            @if (sticker().originalPrice) {
              <p class="text-xs text-ink-faint line-through">{{ sticker().originalPrice }} {{ sticker().currency }}</p>
            }
          </div>

          <button
  type="button"
  class="flex size-9 cursor-pointer shrink-0 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
  [disabled]="justAdded()"
  [class.border-ink-faint]="!justAdded()"
  [class.text-ink]="!justAdded()"
  [class.bg-white]="!justAdded()"
  [class.hover:border-brand]="!justAdded()"
  [class.hover:text-brand]="!justAdded()"
  [class.border-brand]="justAdded()"
  [class.bg-brand]="justAdded()"
  [class.text-white]="justAdded()"
  (click)="addToBag()"
  [attr.aria-label]="'Ajouter ' + sticker().name + ' au sac'"
>
  <lucide-icon [img]="justAdded() ? Check : Plus" class="size-4"></lucide-icon>
</button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCard {
  protected readonly cart = inject(CartService);
  protected readonly Heart = Heart;
  protected readonly Plus = Plus;
  protected readonly Check = Check;

  sticker = input.required<Sticker>();
  protected readonly isWished = signal(false);
  protected readonly justAdded = signal(false);

protected addToBag(): void {
  if (this.justAdded()) return;

  this.justAdded.set(true);
  this.cart.addToBag(this.sticker());

  setTimeout(() => this.justAdded.set(false), 900);
}
}