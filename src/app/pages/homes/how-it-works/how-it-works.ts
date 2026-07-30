import { Component } from '@angular/core';
import {
  LucideAngularModule,
  LucideIconData,
  MousePointerClick,
  ShoppingBag,
  MessageCircle,
} from 'lucide-angular';

interface Step {
  icon: LucideIconData;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  imports: [LucideAngularModule],
  template: `
    <section id="how-it-works" class="mx-auto max-w-[1360px] px-6 py-14 sm:px-10">
      <h2 class="mb-10 text-center text-2xl font-semibold text-ink sm:text-3xl">Comment ça marche</h2>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        @for (step of steps; track step.title; let i = $index) {
          <div class="flex flex-col items-center gap-3 text-center">
            <div class="flex size-16 items-center justify-center rounded-full bg-surface-lilac text-surface-lilac-text">
              <lucide-icon [img]="step.icon" class="size-7"></lucide-icon>
            </div>
            <p class="text-sm font-semibold text-ink-faint">Étape {{ i + 1 }}</p>
            <p class="text-lg font-semibold text-ink">{{ step.title }}</p>
            <p class="max-w-xs text-sm text-ink-soft">{{ step.description }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class HowItWorks {
  protected readonly steps: Step[] = [
    { icon: MousePointerClick, title: 'Choisis tes stickers', description: 'Parcours le catalogue et clique sur "+" pour ajouter chaque sticker à ton sac.' },
    { icon: ShoppingBag, title: 'Vérifie ton sac', description: 'Ajuste les quantités, retire un article si besoin, et consulte le total estimé.' },
    { icon: MessageCircle, title: 'Commande sur WhatsApp', description: 'Un message pré-rempli s\'ouvre sur WhatsApp avec ta commande — finalise directement avec nous.' },
  ];
}