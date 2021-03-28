import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestImportsComponent } from './latest-imports.component';

describe('LatestImportsComponent', () => {
  let component: LatestImportsComponent;
  let fixture: ComponentFixture<LatestImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestImportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
