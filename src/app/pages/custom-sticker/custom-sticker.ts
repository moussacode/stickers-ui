import { Component, inject } from '@angular/core';
import { WhatsAppService } from '../../services/whatsapp.service';

import { LucideAngularModule, Sparkles, Clock, Tag, Package, MessageCircle } from 'lucide-angular';

@Component({
  selector: 'app-custom-sticker',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './custom-sticker.html',
})
export class CustomSticker {
   private readonly whatsapp = inject(WhatsAppService);

  protected readonly customStickerWhatsAppUrl =
    this.whatsapp.createCustomStickerLink();
  protected readonly Sparkles = Sparkles;
  protected readonly Clock = Clock;
  protected readonly Tag = Tag;
  protected readonly Package = Package;
  protected readonly MessageCircle = MessageCircle;

  protected readonly examples = [
    { imageUrl: 'https://picsum.photos/seed/custom-1/200/200', alt: 'Exemple de sticker personnalisé 1' },
    { imageUrl: 'https://picsum.photos/seed/custom-2/200/200', alt: 'Exemple de sticker personnalisé 2' },
    { imageUrl: 'https://picsum.photos/seed/custom-3/200/200', alt: 'Exemple de sticker personnalisé 3' },
  ];

  protected readonly steps = [
    { title: 'Envoie ton idée', description: "Logo, photo, dessin ou simple description — envoie-nous ce que tu as en tête." },
    { title: 'On te propose un rendu', description: 'On adapte le format, le style et la découpe à ton support (laptop, gourde, carnet...).' },
    { title: 'Tu valides le devis', description: 'Prix basé sur le modèle et la quantité — aucune surprise, tu valides avant impression.' },
    { title: 'Échange et livraison', description: 'Tout se passe directement sur WhatsApp, du brief à la remise du sticker.' },
  ];

}