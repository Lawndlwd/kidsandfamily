import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubsComponent } from './pubs.component';

describe('PubsComponent', () => {
  let component: PubsComponent;
  let fixture: ComponentFixture<PubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
