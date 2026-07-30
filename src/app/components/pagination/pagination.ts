// src/app/homes/pagination/pagination.ts
import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

type PageEntry = number | 'ellipsis';

@Component({
  selector: 'app-pagination',
  imports: [LucideAngularModule],
  template: `
    <nav class="flex w-full items-center justify-between sm:justify-end" aria-label="Pagination">
      <button
        type="button"
        class="flex items-center rounded-full px-2 py-2 text-sm text-ink-faint transition hover:text-ink disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:mr-2 sm:px-0"
        [disabled]="currentPage() === 1"
        (click)="goTo(currentPage() - 1)"
        aria-label="Page précédente"
      >
        <lucide-icon [img]="ChevronLeft" class="size-4 sm:mr-1"></lucide-icon>
        <span class="hidden sm:inline">Previous</span>
      </button>

      <!-- Mobile : indicateur texte compact -->
      <span class="text-sm text-ink-soft sm:hidden">
        Page {{ currentPage() }} sur {{ totalPages() }}
      </span>

      <!-- Desktop : boutons numérotés avec ellipsis -->
      <div class="hidden items-center sm:flex">
        @for (entry of pageEntries(); track $index) {
          @if (entry === 'ellipsis') {
            <span class="flex size-9 items-center justify-center text-sm text-ink-faint">…</span>
          } @else {
            <button
              type="button"
              class="flex size-9 items-center justify-center border text-sm transition focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
              [class.bg-surface-navy]="entry === currentPage()"
              [class.border-surface-navy]="entry === currentPage()"
              [class.text-white]="entry === currentPage()"
              [class.border-border-muted]="entry !== currentPage()"
              [class.bg-white]="entry !== currentPage()"
              [class.text-ink]="entry !== currentPage()"
              [class.hover:border-brand]="entry !== currentPage()"
              [attr.aria-current]="entry === currentPage() ? 'page' : null"
              [attr.aria-label]="'Page ' + entry"
              (click)="goTo(entry)"
            >
              {{ entry }}
            </button>
          }
        }
      </div>

      <button
        type="button"
        class="flex items-center rounded-full px-2 py-2 text-sm text-ink transition hover:opacity-70 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:ml-2 sm:px-0"
        [disabled]="currentPage() === totalPages()"
        (click)="goTo(currentPage() + 1)"
        aria-label="Page suivante"
      >
        <span class="hidden sm:inline">Next</span>
        <lucide-icon [img]="ChevronRight" class="size-4 sm:ml-1"></lucide-icon>
      </button>
    </nav>
  `,
})
export class Pagination {
  protected readonly ChevronLeft = ChevronLeft;
  protected readonly ChevronRight = ChevronRight;
  totalPages = input.required<number>();
  currentPage = input.required<number>();
  pageChange = output<number>();

  /** Construit 1 … n-2 n-1 n n+1 n+2 … total, avec ellipsis quand nécessaire. */
  pageEntries = computed<PageEntry[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const entries: PageEntry[] = [1];

    if (current > 3) entries.push('ellipsis');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let page = start; page <= end; page++) entries.push(page);

    if (current < total - 2) entries.push('ellipsis');

    entries.push(total);
    return entries;
  });

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.pageChange.emit(page);
  }
}