import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRegionalShowsComponent } from './top-regional-shows.component';

describe('TopRegionalShowsComponent', () => {
  let component: TopRegionalShowsComponent;
  let fixture: ComponentFixture<TopRegionalShowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopRegionalShowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRegionalShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
