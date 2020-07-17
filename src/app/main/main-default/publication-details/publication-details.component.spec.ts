import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationDetailsComponent } from './publication-details.component';

describe('PublicationDetailsComponent', () => {
  let component: PublicationDetailsComponent;
  let fixture: ComponentFixture<PublicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
