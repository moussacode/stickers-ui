import { Component, computed, inject, signal, OnDestroy } from '@angular/core';

import { StickerService } from '../../services/sticker.service';
import { ProductGrid } from '../../components/product-grid/product-grid';
import { Pagination } from '../../components/pagination/pagination';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { SortValue, StickerFilters } from '../../interfaces/sticker-filters.interface';

const PAGE_SIZE = 12;

@Component({
  selector: 'app-sticker-list',
  imports: [
    ProductGrid,
    Pagination,
    LucideAngularModule,
  ],
  templateUrl: './sticker-list.html',
})
export class StickerList implements OnDestroy {

  private readonly stickerService = inject(StickerService);
protected readonly ChevronDown = ChevronDown;

  protected readonly category = signal('All Stickers');

protected readonly filters = signal<StickerFilters>({
  onSaleOnly:false,
  maxPrice:null
});

protected readonly search = signal('');

  protected readonly currentPage = signal(1);
protected readonly sort = signal<SortValue>('newest');

  protected readonly categoriesWithCount = computed(() => {

    const stickers = this.stickerService.getStickers()();

    const categories = Array.from(
      new Set(stickers.map(s => s.category))
    );


    return [
      {
        label:'All Stickers',
        count: stickers.length
      },

      ...categories.map(category => ({
        label:category,
        count: stickers.filter(
          s => s.category === category
        ).length
      }))
    ];
  });



  protected readonly filteredStickers = computed(()=>{


    let result = this.stickerService
      .getStickers()();


    const search = this.search()
      .trim()
      .toLowerCase();


    // Recherche
    if(search){

      result = result.filter(sticker=>{

        const content = [
          sticker.name,
          sticker.artist,
          sticker.category,
          sticker.description

        ]
        .join(' ')
        .toLowerCase();


        return content.includes(search);

      });

    }



    // catégorie

    if(this.category() !== 'All Stickers'){

      result = result.filter(
        sticker =>
        sticker.category === this.category()
      );

    }



    // promo

    // if(this.filters().onSaleOnly){

    //   result = result.filter(
    //     sticker =>
    //     !!sticker.discountPercent
    //   );

    // }



    // prix

    if(this.filters().maxPrice !== null){

      result = result.filter(
        sticker =>
        sticker.price <= this.filters().maxPrice!
      );

    }



    // tri

    switch(this.sort()){


      case 'price-asc':

        result = [
          ...result
        ].sort(
          (a,b)=>a.price-b.price
        );

        break;


      case 'price-desc':

        result=[
          ...result
        ].sort(
          (a,b)=>b.price-a.price
        );

        break;



      case 'newest':

        result=[
          ...result
        ].reverse();

        break;

    }


    return result;

  });



  protected readonly totalPages = computed(()=>{

    return Math.max(
      1,
      Math.ceil(
        this.filteredStickers().length / PAGE_SIZE
      )
    );

  });



  protected readonly pageStickers = computed(()=>{

    const start =
    (this.currentPage()-1)*PAGE_SIZE;


    return this.filteredStickers()
      .slice(start,start+PAGE_SIZE);

  });



  protected readonly resultCount = computed(()=>
    this.filteredStickers().length
  );



  private searchTimeout?: ReturnType<typeof setTimeout>;



  protected onSearchChange(value:string){

    clearTimeout(this.searchTimeout);


    this.searchTimeout=setTimeout(()=>{

      this.search.set(value);

      this.currentPage.set(1);

    },300);

  }




  protected onCategoryChange(category:string){

    this.category.set(category);
    this.currentPage.set(1);

  }



  protected onSortChange(sort:SortValue){

    this.sort.set(sort);
    this.currentPage.set(1);

  }



  protected onFiltersChange(filters:StickerFilters){

    this.filters.set(filters);
    this.currentPage.set(1);

  }



  protected resetFilters(){

    this.search.set('');

    this.category.set(
      'All Stickers'
    );

    this.sort.set(
      'newest'
    );

    this.filters.set({
      onSaleOnly:false,
      maxPrice:null
    });


    this.currentPage.set(1);

  }




  protected setPage(page:number){

    this.currentPage.set(page);

    window.scrollTo({
      top:0,
      behavior:'smooth'
    });

  }



  ngOnDestroy(){

    clearTimeout(this.searchTimeout);

  }

}