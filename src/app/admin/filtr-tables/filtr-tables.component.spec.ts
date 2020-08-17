import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrTablesComponent } from './filtr-tables.component';

describe('FiltrTablesComponent', () => {
  let component: FiltrTablesComponent;
  let fixture: ComponentFixture<FiltrTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
