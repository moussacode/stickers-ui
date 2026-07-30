import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordList } from './keyword-list';

describe('KeywordList', () => {
  let component: KeywordList;
  let fixture: ComponentFixture<KeywordList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordList],
    }).compileComponents();

    fixture = TestBed.createComponent(KeywordList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
