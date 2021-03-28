import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamerarollComponent } from './cameraroll.component';

describe('CamerarollComponent', () => {
  let component: CamerarollComponent;
  let fixture: ComponentFixture<CamerarollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamerarollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamerarollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
