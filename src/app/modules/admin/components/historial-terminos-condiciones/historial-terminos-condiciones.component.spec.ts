import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTerminosCondicionesComponent } from './historial-terminos-condiciones.component';

describe('HistorialTerminosCondicionesComponent', () => {
  let component: HistorialTerminosCondicionesComponent;
  let fixture: ComponentFixture<HistorialTerminosCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialTerminosCondicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialTerminosCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
