import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTerminosCondicionesComponent } from './listado-terminos-condiciones.component';

describe('ListadoTerminosCondicionesComponent', () => {
  let component: ListadoTerminosCondicionesComponent;
  let fixture: ComponentFixture<ListadoTerminosCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTerminosCondicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTerminosCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
