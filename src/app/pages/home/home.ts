import { Component, computed, inject, signal } from '@angular/core';
import { Hero } from '../homes/hero/hero';
import { HowItWorks } from '../homes/how-it-works/how-it-works';

import { TopicChipList } from '../homes/topic-chip-list/topic-chip-list';
import { CatalogToolbar } from '../homes/catalog-toolbar/catalog-toolbar';
import { PromoBanner } from '../homes/promo-banner/promo-banner';
import { KeywordList } from '../homes/keyword-list/keyword-list';
import { TrustSignalList } from '../homes/trust-signal-list/trust-signal-list';

import { ProductGrid } from '../../components/product-grid/product-grid';
import { Pagination } from '../../components/pagination/pagination';

import { StickerService } from '../../services/sticker.service';
import { CatalogContentService } from '../../services/catalog-content.service';
import { RouterLink } from "@angular/router";

const PREVIEW_COUNT = 12;

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    HowItWorks,
    KeywordList,
    Pagination,
    ProductGrid,
    RouterLink
],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   private readonly stickerService = inject(StickerService);
  protected readonly content = inject(CatalogContentService);

  protected readonly previewStickers = computed(() =>
    this.stickerService.getStickers()().slice(0, PREVIEW_COUNT),
  );
}