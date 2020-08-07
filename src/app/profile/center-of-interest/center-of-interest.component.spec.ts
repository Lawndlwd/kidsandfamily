import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterOfInterestComponent } from './center-of-interest.component';

describe('CenterOfInterestComponent', () => {
  let component: CenterOfInterestComponent;
  let fixture: ComponentFixture<CenterOfInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterOfInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
