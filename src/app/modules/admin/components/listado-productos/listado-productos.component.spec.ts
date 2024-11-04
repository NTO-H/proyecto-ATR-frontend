import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProductosComponent } from './listado-productos.component';

describe('ListadoProductosComponent', () => {
  let component: ListadoProductosComponent;
  let fixture: ComponentFixture<ListadoProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
