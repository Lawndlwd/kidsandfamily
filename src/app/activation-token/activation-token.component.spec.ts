import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationTokenComponent } from './activation-token.component';

describe('ActivationTokenComponent', () => {
  let component: ActivationTokenComponent;
  let fixture: ComponentFixture<ActivationTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
