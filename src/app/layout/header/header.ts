// src/app/layout/header/header.ts
import { Component, inject } from '@angular/core';
import { LucideAngularModule, Search, Heart, ShoppingBag } from 'lucide-angular';
import { CartService } from '../../services/cart.service';
import { SITE_NAME } from '../../config/site-config';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
})
export class Header {
  protected readonly cart = inject(CartService);
  protected readonly siteName = SITE_NAME;
  protected readonly Search = Search;
  protected readonly Heart = Heart;
  protected readonly ShoppingBag = ShoppingBag;
  protected cartOpen = false;
}