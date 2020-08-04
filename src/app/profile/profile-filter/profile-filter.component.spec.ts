import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFilterComponent } from './profile-filter.component';

describe('ProfileFilterComponent', () => {
  let component: ProfileFilterComponent;
  let fixture: ComponentFixture<ProfileFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
