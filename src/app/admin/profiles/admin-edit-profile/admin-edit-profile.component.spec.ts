import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditProfileComponent } from './admin-edit-profile.component';

describe('AdminEditProfileComponent', () => {
  let component: AdminEditProfileComponent;
  let fixture: ComponentFixture<AdminEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
