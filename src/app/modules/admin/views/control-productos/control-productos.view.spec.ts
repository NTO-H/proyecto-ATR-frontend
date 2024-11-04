import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlProductosView } from './control-productos.view';

describe('ControlProductosView', () => {
  let component: ControlProductosView;
  let fixture: ComponentFixture<ControlProductosView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlProductosView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlProductosView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
