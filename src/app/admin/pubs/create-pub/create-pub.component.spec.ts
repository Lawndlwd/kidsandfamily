import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePubComponent } from './create-pub.component';

describe('CreatePubComponent', () => {
  let component: CreatePubComponent;
  let fixture: ComponentFixture<CreatePubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
