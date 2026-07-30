import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerDetail } from './sticker-detail';

describe('StickerDetail', () => {
  let component: StickerDetail;
  let fixture: ComponentFixture<StickerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickerDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(StickerDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
