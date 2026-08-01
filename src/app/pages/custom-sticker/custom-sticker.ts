import { Component, inject } from '@angular/core';
import { WhatsAppService } from '../../services/whatsapp.service';

import {
  LucideAngularModule,
  Link,
  Palette,
  MessageCircle,
  Package,
  Clock,
  Tag
} from 'lucide-angular';

interface Step {
  icon: any;
  title: string;
  description: string;
}

@Component({
  selector: 'app-custom-sticker',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './custom-sticker.html',
})
export class CustomSticker {

  private readonly whatsapp = inject(WhatsAppService);

  protected readonly customStickerWhatsAppUrl =
    this.whatsapp.createCustomStickerLink();

  protected readonly Clock = Clock;
  protected readonly Tag = Tag;
  protected readonly Package = Package;
  protected readonly Link = Link;
  protected readonly Palette = Palette;
  protected readonly MessageCircle = MessageCircle;

  protected readonly examples = [
    {
      imageUrl: 'images/products/Java.png',
      alt: 'Sticker React personnalisé',
    },
    {
      imageUrl: 'images/products/python(7).png',
      alt: 'Sticker Python personnalisé',
    },
    {
      imageUrl: 'images/products/nodejs.png',
      alt: 'Sticker Node.js personnalisé',
    },
  ];

  protected readonly steps: Step[] = [
    {
      icon: Link,
      title: 'Partage ton idée',
      description:
        'Envoie un logo, une image ou un lien qui servira de base à ton sticker personnalisé.',
    },
    {
      icon: Palette,
      title: 'Nous créons le design',
      description:
        'Nous adaptons le style, les couleurs et le format selon ton besoin.',
    },
    {
      icon: MessageCircle,
      title: 'Validation sur WhatsApp',
      description:
        'Tu échanges directement avec notre équipe, reçois un devis et valides le visuel.',
    },
    {
      icon: Package,
      title: 'Impression et livraison',
      description:
        'Une fois validé, nous imprimons tes stickers et organisons la livraison.',
    },
  ];
}