import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowInTheatresComponent } from './now-in-theatres.component';

describe('NowInTheatresComponent', () => {
  let component: NowInTheatresComponent;
  let fixture: ComponentFixture<NowInTheatresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowInTheatresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowInTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
