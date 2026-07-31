import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSticker } from './custom-sticker';

describe('CustomSticker', () => {
  let component: CustomSticker;
  let fixture: ComponentFixture<CustomSticker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSticker],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomSticker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
