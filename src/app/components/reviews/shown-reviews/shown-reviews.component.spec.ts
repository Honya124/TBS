import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownReviewsComponent } from './shown-reviews.component';

describe('ShownReviewsComponent', () => {
  let component: ShownReviewsComponent;
  let fixture: ComponentFixture<ShownReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShownReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShownReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
