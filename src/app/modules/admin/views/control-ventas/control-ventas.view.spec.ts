import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlVentasView } from './control-ventas.view';

describe('ControlVentasView', () => {
  let component: ControlVentasView;
  let fixture: ComponentFixture<ControlVentasView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlVentasView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlVentasView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
