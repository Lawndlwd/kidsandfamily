import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDefultComponent } from './main-defult.component';

describe('MainDefultComponent', () => {
  let component: MainDefultComponent;
  let fixture: ComponentFixture<MainDefultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDefultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDefultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
