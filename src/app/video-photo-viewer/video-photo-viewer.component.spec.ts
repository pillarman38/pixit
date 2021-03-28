import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPhotoViewerComponent } from './video-photo-viewer.component';

describe('VideoPhotoViewerComponent', () => {
  let component: VideoPhotoViewerComponent;
  let fixture: ComponentFixture<VideoPhotoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPhotoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPhotoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
