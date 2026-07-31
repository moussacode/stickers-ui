import { Injectable } from '@angular/core';
import { WHATSAPP_NUMBER } from '../config/site-config';


@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {

  private readonly phone = WHATSAPP_NUMBER;

  createCustomStickerLink(): string {

    const message = `
Bonjour,

Je souhaite créer un sticker personnalisé.

Je voudrais avoir des informations sur :
- la création du design
- le prix
- les délais

Merci.
`;

    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  }

}