import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotAllowedComponent } from './page-not-allowed.component';

describe('PageNotAllowedComponent', () => {
  let component: PageNotAllowedComponent;
  let fixture: ComponentFixture<PageNotAllowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotAllowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
