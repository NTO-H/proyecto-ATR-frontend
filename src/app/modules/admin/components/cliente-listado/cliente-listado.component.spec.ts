import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteListadoComponent } from './cliente-listado.component';

describe('ClienteListadoComponent', () => {
  let component: ClienteListadoComponent;
  let fixture: ComponentFixture<ClienteListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClienteListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
