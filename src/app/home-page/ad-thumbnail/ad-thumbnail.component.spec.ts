import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdThumbnailComponent } from './ad-thumbnail.component';

describe('AdThumbnailComponent', () => {
  let component: AdThumbnailComponent;
  let fixture: ComponentFixture<AdThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
