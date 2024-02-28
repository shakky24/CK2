import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NowInOttComponent } from './now-in-ott.component';

describe('NowInOttComponent', () => {
  let component: NowInOttComponent;
  let fixture: ComponentFixture<NowInOttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NowInOttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NowInOttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
