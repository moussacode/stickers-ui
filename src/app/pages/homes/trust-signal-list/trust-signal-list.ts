// src/app/homes/trust-signal-list/trust-signal-list.ts
import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TrustSignal } from '../../../interfaces/trust-signal.interface';


@Component({
  selector: 'app-trust-signal-list',
  imports: [LucideAngularModule],
  template: `
    <div class="flex flex-wrap items-start justify-center gap-8 rounded p-4">
      @for (signal of signals(); track signal.id) {
        <div class="flex flex-1 min-w-[260px] items-start">
          <div class="mr-4 flex size-16 shrink-0 items-center justify-center rounded-full bg-surface-lilac p-2 text-surface-lilac-text">
            <lucide-icon [img]="signal.icon" class="size-7"></lucide-icon>
          </div>
          <div class="min-w-[232px]">
            <p class="text-sm font-semibold text-ink">{{ signal.title }}</p>
            <p class="text-sm text-ink">
              @for (line of signal.description; track line) {
                <span class="block">{{ line }}</span>
              }
            </p>
            <a href="#" class="text-sm font-semibold text-brand-accent">{{ signal.linkLabel }}</a>
          </div>
        </div>
      }
    </div>
  `,
})
export class TrustSignalList {
  signals = input.required<TrustSignal[]>();
}