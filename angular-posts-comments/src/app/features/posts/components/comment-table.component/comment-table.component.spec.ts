import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentTableComponent } from './comment-table.component';

describe('CommentTableComponent', () => {
  let component: CommentTableComponent;
  let fixture: ComponentFixture<CommentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
