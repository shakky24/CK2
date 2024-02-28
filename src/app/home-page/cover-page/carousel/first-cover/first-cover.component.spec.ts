import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstCoverComponent } from './first-cover.component';

describe('FirstCoverComponent', () => {
  let component: FirstCoverComponent;
  let fixture: ComponentFixture<FirstCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstCoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
