// src/app/homes/topic-chip-list/topic-chip-list.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-chip-list',
  template: `
    <div class="flex items-center gap-3 overflow-x-auto pb-1">
      @if (label()) {
        <span class="shrink-0 text-base font-semibold text-ink-soft">{{ label() }}</span>
      }
      @for (chip of chips(); track chip) {
        <a href="#" class="shrink-0 rounded-lg bg-brand px-4 py-2 text-base font-semibold text-white hover:opacity-90">
          {{ chip }}
        </a>
      }
    </div>
  `,
})
export class TopicChipList {
  chips = input.required<string[]>();
  label = input<string>('');
}