import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlClientesView } from './control-clientes.view';

describe('ControlClientesView', () => {
  let component: ControlClientesView;
  let fixture: ComponentFixture<ControlClientesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlClientesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlClientesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
