import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoView } from './carrito.view';

describe('CarritoView', () => {
  let component: CarritoView;
  let fixture: ComponentFixture<CarritoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
