import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRentaComponent } from './registro-renta.component';

describe('RegistroRentaComponent', () => {
  let component: RegistroRentaComponent;
  let fixture: ComponentFixture<RegistroRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroRentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
