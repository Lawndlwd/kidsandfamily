import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFiltreSelectionComponent } from './main-filtre-selection.component';

describe('MainFiltreSelectionComponent', () => {
  let component: MainFiltreSelectionComponent;
  let fixture: ComponentFixture<MainFiltreSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFiltreSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFiltreSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
