import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyProfilenComponent } from './show-my-profilen.component';

describe('ShowMyProfilenComponent', () => {
  let component: ShowMyProfilenComponent;
  let fixture: ComponentFixture<ShowMyProfilenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMyProfilenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMyProfilenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
