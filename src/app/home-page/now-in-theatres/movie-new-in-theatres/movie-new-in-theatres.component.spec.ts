import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNewInTheatresComponent } from './movie-new-in-theatres.component';

describe('MovieNewInTheatresComponent', () => {
  let component: MovieNewInTheatresComponent;
  let fixture: ComponentFixture<MovieNewInTheatresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieNewInTheatresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieNewInTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
