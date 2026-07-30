// src/app/homes/keyword-list/keyword-list.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-keyword-list',
  template: `
    <div class="flex flex-wrap gap-x-4 gap-y-2">
      @for (keyword of keywords(); track keyword) {
        <a href="#" class="text-sm font-semibold text-ink-soft hover:text-ink">{{ keyword }}</a>
      }
    </div>
  `,
})
export class KeywordList {
  keywords = input.required<string[]>();
}