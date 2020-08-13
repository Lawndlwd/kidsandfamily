import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmailComponent } from './get-email.component';

describe('GetEmailComponent', () => {
  let component: GetEmailComponent;
  let fixture: ComponentFixture<GetEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
