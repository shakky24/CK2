import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTopRegionalShowsComponent } from './movie-top-regional-shows.component';

describe('MovieTopRegionalShowsComponent', () => {
  let component: MovieTopRegionalShowsComponent;
  let fixture: ComponentFixture<MovieTopRegionalShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTopRegionalShowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTopRegionalShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
