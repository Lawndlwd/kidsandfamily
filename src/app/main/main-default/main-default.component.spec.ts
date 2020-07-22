import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDefaultComponent } from './main-default.component';

describe('MainDefaultComponent', () => {
  let component: MainDefaultComponent;
  let fixture: ComponentFixture<MainDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
