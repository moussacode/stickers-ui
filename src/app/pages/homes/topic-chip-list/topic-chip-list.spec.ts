import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicChipList } from './topic-chip-list';

describe('TopicChipList', () => {
  let component: TopicChipList;
  let fixture: ComponentFixture<TopicChipList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicChipList],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicChipList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
