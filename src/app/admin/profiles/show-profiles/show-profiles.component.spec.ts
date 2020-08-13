import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfilesComponent } from './show-profiles.component';

describe('ShowProfilesComponent', () => {
  let component: ShowProfilesComponent;
  let fixture: ComponentFixture<ShowProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
