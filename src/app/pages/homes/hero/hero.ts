// hero.ts
import { Component } from '@angular/core';
import { LucideAngularModule, ShoppingBag, MessageCircle, Truck } from 'lucide-angular';
import { WhatsAppService } from '../../../services/whatsapp.service';
import { inject } from '@angular/core';
import { RouterLink } from "@angular/router";

interface FloatingSticker {
  imageUrl: string;
  alt: string;
  size: string;
  topPct: number;
  leftPct: number;
  rotate: string;
  z: number;
  hideOnMobile?: boolean;
}

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './hero.html',
})
export class Hero {
  protected readonly ShoppingBag = ShoppingBag;
  protected readonly MessageCircle = MessageCircle;
  protected readonly Truck = Truck;


  protected readonly stickers: FloatingSticker[] = [
    { imageUrl: 'images/products/python(7).png', alt: 'Bash Terminal sticker', size: 'size-28 sm:size-40 lg:size-48', topPct: 2, leftPct: 4, rotate: '-rotate-6', z: 2 },
    { imageUrl: 'images/products/Java.png', alt: 'React Logo sticker', size: 'size-24 sm:size-32 lg:size-40', topPct: 30, leftPct: 45, rotate: 'rotate-12', z: 3 },
    { imageUrl: 'images/products/Java.png', alt: '404 Not Found sticker', size: 'size-20 sm:size-28 lg:size-36', topPct: 62, leftPct: 2, rotate: 'rotate-3', z: 1, hideOnMobile: true },
    { imageUrl: 'images/products/Java.png', alt: 'Coffee and Code sticker', size: 'size-16 sm:size-24 lg:size-32', topPct: 4, leftPct: 68, rotate: '-rotate-12', z: 1, hideOnMobile: true },
  ];
}