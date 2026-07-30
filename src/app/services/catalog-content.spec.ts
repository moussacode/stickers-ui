import { TestBed } from '@angular/core/testing';

import { CatalogContent } from './catalog-content';

describe('CatalogContent', () => {
  let service: CatalogContent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogContent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
