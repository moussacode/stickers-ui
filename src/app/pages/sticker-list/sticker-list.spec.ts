import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerList } from './sticker-list';

describe('StickerList', () => {
  let component: StickerList;
  let fixture: ComponentFixture<StickerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerList],
    }).compileComponents();

    fixture = TestBed.createComponent(StickerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
