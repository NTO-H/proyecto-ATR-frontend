import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarCodigoView } from './verificar-codigo.view';

describe('VerificarCodigoView', () => {
  let component: VerificarCodigoView;
  let fixture: ComponentFixture<VerificarCodigoView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificarCodigoView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarCodigoView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
