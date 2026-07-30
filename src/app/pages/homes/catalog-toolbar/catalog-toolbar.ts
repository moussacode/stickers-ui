// src/app/homes/catalog-toolbar/catalog-toolbar.ts  (ou src/app/interfaces/... selon ton arbo)
// Dépendance : src/app/interfaces/sticker-filters.interface.ts (voir plus bas si absent)

import { Component, ElementRef, HostListener, computed, inject, input, output, signal } from '@angular/core';
import { LucideAngularModule, ChevronDown, Filter, Check } from 'lucide-angular';
import { SortValue, StickerFilters} from '../../../interfaces/sticker-filters.interface';

interface SortOption {
  value: SortValue;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'relevant', label: 'Most Relevant' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Plus récents' },
];

const MAX_PRICE_OPTIONS = [
  { value: null, label: 'Tous les prix' },
  { value: 1000, label: 'Moins de 1000 FCFA' },
  { value: 2000, label: 'Moins de 2000 FCFA' },
  { value: 3000, label: 'Moins de 3000 FCFA' },
];

@Component({
  selector: 'app-catalog-toolbar',
  imports: [LucideAngularModule],
  template: `
    <div class="relative flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative">
          <button
            type="button"
            class="flex h-10 items-center rounded-full bg-surface-muted px-4 text-base font-semibold text-ink hover:bg-ink/10"
            (click)="toggle('category')"
          >
            {{ selectedCategory() }}
            <lucide-icon [img]="ChevronDown" class="ml-2 size-4"></lucide-icon>
          </button>

          @if (openPanel() === 'category') {
            <div class="absolute left-0 top-12 z-20 w-56 rounded-lg border border-border-hairline bg-white py-2 shadow-lg">
              @for (category of categories(); track category) {
                <button
                  type="button"
                  class="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-ink hover:bg-surface-lilac"
                  (click)="selectCategory(category)"
                >
                  {{ category }}
                  @if (category === selectedCategory()) {
                    <lucide-icon [img]="Check" class="size-4 text-brand"></lucide-icon>
                  }
                </button>
              }
            </div>
          }
        </div>

        <span class="text-base text-ink-soft">{{ itemCount() }} items</span>

        <div class="relative">
          <button
            type="button"
            class="flex h-10 items-center rounded-full bg-surface-muted px-4 text-base font-semibold text-ink hover:bg-ink/10"
            (click)="toggle('filters')"
          >
            <lucide-icon [img]="Filter" class="mr-2 size-4"></lucide-icon>
            Filters ({{ activeFilterCount() }})
          </button>

          @if (openPanel() === 'filters') {
            <div class="absolute left-0 top-12 z-20 w-72 rounded-lg border border-border-hairline bg-white p-4 shadow-lg">
              <label class="mb-4 flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  class="size-4 accent-brand"
                  [checked]="onSaleOnly()"
                  (change)="setOnSaleOnly($any($event.target).checked)"
                />
                En promo uniquement
              </label>

              <p class="mb-2 text-sm font-semibold text-ink">Prix maximum</p>
              <div class="flex flex-col gap-1">
                @for (option of maxPriceOptions; track option.label) {
                  <button
                    type="button"
                    class="flex items-center justify-between rounded px-2 py-1.5 text-left text-sm text-ink hover:bg-surface-lilac"
                    (click)="setMaxPrice(option.value)"
                  >
                    {{ option.label }}
                    @if (option.value === maxPrice()) {
                      <lucide-icon [img]="Check" class="size-4 text-brand"></lucide-icon>
                    }
                  </button>
                }
              </div>

              <button
                type="button"
                class="mt-3 w-full rounded-full bg-surface-navy py-2 text-sm font-semibold text-white hover:opacity-90"
                (click)="resetFilters()"
              >
                Réinitialiser
              </button>
            </div>
          }
        </div>
      </div>

      <div class="relative">
        <button
          type="button"
          class="flex h-10 items-center rounded-full bg-surface-muted px-4 text-base font-semibold text-ink hover:bg-ink/10"
          (click)="toggle('sort')"
        >
          {{ selectedSortLabel() }}
          <lucide-icon [img]="ChevronDown" class="ml-2 size-4"></lucide-icon>
        </button>

        @if (openPanel() === 'sort') {
          <div class="absolute right-0 top-12 z-20 w-56 rounded-lg border border-border-hairline bg-white py-2 shadow-lg">
            @for (option of sortOptions; track option.value) {
              <button
                type="button"
                class="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-ink hover:bg-surface-lilac"
                (click)="selectSort(option.value)"
              >
                {{ option.label }}
                @if (option.value === sortValue()) {
                  <lucide-icon [img]="Check" class="size-4 text-brand"></lucide-icon>
                }
              </button>
            }
          </div>
        }
      </div>
    </div>
  `,
})
export class CatalogToolbar {
  protected readonly ChevronDown = ChevronDown;
  protected readonly Filter = Filter;
  protected readonly Check = Check;
  protected readonly sortOptions = SORT_OPTIONS;
  protected readonly maxPriceOptions = MAX_PRICE_OPTIONS;

  categories = input<string[]>(['All Stickers']);
  itemCount = input(0);

  categoryChange = output<string>();
  sortChange = output<SortValue>();
  filtersChange = output<StickerFilters>();

  protected readonly openPanel = signal<'category' | 'filters' | 'sort' | null>(null);
  protected readonly selectedCategory = signal('All Stickers');
  protected readonly sortValue = signal<SortValue>('relevant');
  protected readonly onSaleOnly = signal(false);
  protected readonly maxPrice = signal<number | null>(null);

  protected readonly selectedSortLabel = computed(
    () => this.sortOptions.find((o) => o.value === this.sortValue())?.label ?? 'Sort',
  );

  protected readonly activeFilterCount = computed(() => {
    let count = 0;
    if (this.onSaleOnly()) count++;
    if (this.maxPrice() !== null) count++;
    return count;
  });

  private readonly elementRef = inject(ElementRef);

  toggle(panel: 'category' | 'filters' | 'sort'): void {
    this.openPanel.update((current) => (current === panel ? null : panel));
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
    this.openPanel.set(null);
    this.categoryChange.emit(category);
  }

  selectSort(value: SortValue): void {
    this.sortValue.set(value);
    this.openPanel.set(null);
    this.sortChange.emit(value);
  }

  setOnSaleOnly(checked: boolean): void {
    this.onSaleOnly.set(checked);
    this.emitFilters();
  }

  setMaxPrice(value: number | null): void {
    this.maxPrice.set(value);
    this.emitFilters();
  }

  resetFilters(): void {
    this.onSaleOnly.set(false);
    this.maxPrice.set(null);
    this.emitFilters();
    this.openPanel.set(null);
  }

  private emitFilters(): void {
    this.filtersChange.emit({ onSaleOnly: this.onSaleOnly(), maxPrice: this.maxPrice() });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.openPanel.set(null);
    }
  }
}