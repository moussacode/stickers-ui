import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogToolbar } from './catalog-toolbar';

describe('CatalogToolbar', () => {
  let component: CatalogToolbar;
  let fixture: ComponentFixture<CatalogToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
