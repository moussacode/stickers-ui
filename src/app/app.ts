// src/app/app.ts — devient un simple shell
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';

import { CatalogContentService } from './services/catalog-content.service';
import { inject } from '@angular/core';
import { SiteFooter } from "./components/site-footer/site-footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SiteFooter],
  templateUrl: './app.html',
})
export class App {
  protected readonly content = inject(CatalogContentService);
  protected readonly cartOpen = signal(false);
}