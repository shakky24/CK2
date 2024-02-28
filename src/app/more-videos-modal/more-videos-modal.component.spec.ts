import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreVideosModalComponent } from './more-videos-modal.component';

describe('MoreVideosModalComponent', () => {
  let component: MoreVideosModalComponent;
  let fixture: ComponentFixture<MoreVideosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreVideosModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreVideosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
