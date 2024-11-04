import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTerminosCondicionesComponent } from './registro-terminos-condiciones.component';

describe('RegistroTerminosCondicionesComponent', () => {
  let component: RegistroTerminosCondicionesComponent;
  let fixture: ComponentFixture<RegistroTerminosCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroTerminosCondicionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroTerminosCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
