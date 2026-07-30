// src/app/homes/promo-banner/promo-banner.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-promo-banner',
  template: `
    <div class="flex flex-wrap items-center justify-center gap-x-2 rounded bg-surface-lilac p-4">
      @for (line of lines(); track line) {
        <span class="text-base font-semibold text-surface-lilac-text">{{ line }}</span>
      }
    </div>
  `,
})
export class PromoBanner {
  lines = input.required<string[]>();
}