// src/app/pages/sticker-list/sticker-list.ts
import { Component, computed, inject, signal } from '@angular/core';

import { StickerService } from '../../services/sticker.service';
import { CatalogContentService } from '../../services/catalog-content.service';
import { CatalogToolbar } from "../homes/catalog-toolbar/catalog-toolbar";
import { PromoBanner } from '../homes/promo-banner/promo-banner';
import { KeywordList } from "../homes/keyword-list/keyword-list";
import { TrustSignalList } from "../homes/trust-signal-list/trust-signal-list";
import { ProductGrid } from '../../components/product-grid/product-grid';
import { Pagination } from '../../components/pagination/pagination';
import { SortValue,StickerFilters } from '../../interfaces/sticker-filters.interface';
const PAGE_SIZE = 12;

@Component({
  selector: 'app-sticker-list',
  imports: [CatalogToolbar, PromoBanner, KeywordList, TrustSignalList, ProductGrid, Pagination],
  templateUrl: './sticker-list.html',
})
export class StickerList {
  private readonly stickerService = inject(StickerService);
  protected readonly content = inject(CatalogContentService);

  private readonly category = signal('All Stickers');
  private readonly sort = signal<SortValue>('relevant');
  private readonly filters = signal<StickerFilters>({ onSaleOnly: false, maxPrice: null });
  protected readonly currentPage = signal(1);

  protected readonly categories = ['All Stickers', ...new Set(this.content.getCategoryHighlights().map((c) => c.label))];

  /** Filtre + trie le catalogue complet — recalculé automatiquement à chaque changement. */
  private readonly filteredStickers = computed(() => {
    const filters = this.filters();
    let result = this.stickerService.getStickers()();

    if (filters.onSaleOnly) {
      result = result.filter((s) => !!s.discountPercent);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((s) => s.price <= filters.maxPrice!);
    }

    const sort = this.sort();
    if (sort === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === 'newest') {
      result = [...result].reverse();
    }

    return result;
  });

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredStickers().length / PAGE_SIZE)),
  );

  protected readonly pageStickers = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filteredStickers().slice(start, start + PAGE_SIZE);
  });

  protected onCategoryChange(category: string): void {
    this.category.set(category);
    this.currentPage.set(1);
    // Le filtrage par catégorie nécessite un champ `category` sur Sticker —
    // voir la note sous le code pour le brancher si ton modèle ne l'a pas encore.
  }

  protected onSortChange(sort: any): void {
    this.sort.set(sort);
    this.currentPage.set(1);
  }

  protected onFiltersChange(filters: StickerFilters): void {
    this.filters.set(filters);
    this.currentPage.set(1);
  }

  protected setPage(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}