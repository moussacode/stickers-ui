import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustSignalList } from './trust-signal-list';

describe('TrustSignalList', () => {
  let component: TrustSignalList;
  let fixture: ComponentFixture<TrustSignalList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustSignalList],
    }).compileComponents();

    fixture = TestBed.createComponent(TrustSignalList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
