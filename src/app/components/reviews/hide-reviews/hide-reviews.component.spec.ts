import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideReviewsComponent } from './hide-reviews.component';

describe('HideReviewsComponent', () => {
  let component: HideReviewsComponent;
  let fixture: ComponentFixture<HideReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HideReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HideReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
