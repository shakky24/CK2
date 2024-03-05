import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsinglemovieComponent } from './reviewsinglemovie.component';

describe('ReviewsinglemovieComponent', () => {
  let component: ReviewsinglemovieComponent;
  let fixture: ComponentFixture<ReviewsinglemovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsinglemovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsinglemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
