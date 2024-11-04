import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRentaComponent } from './listado-renta.component';

describe('ListadoRentaComponent', () => {
  let component: ListadoRentaComponent;
  let fixture: ComponentFixture<ListadoRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoRentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
