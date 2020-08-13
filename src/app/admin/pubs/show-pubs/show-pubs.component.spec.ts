import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPubsComponent } from './show-pubs.component';

describe('ShowPubsComponent', () => {
  let component: ShowPubsComponent;
  let fixture: ComponentFixture<ShowPubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
