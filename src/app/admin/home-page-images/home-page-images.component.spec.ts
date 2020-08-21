import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageImagesComponent } from './home-page-images.component';

describe('HomePageImagesComponent', () => {
  let component: HomePageImagesComponent;
  let fixture: ComponentFixture<HomePageImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
