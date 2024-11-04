import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlRentasView } from './control-rentas.view';

describe('ControlRentasView', () => {
  let component: ControlRentasView;
  let fixture: ComponentFixture<ControlRentasView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlRentasView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlRentasView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
