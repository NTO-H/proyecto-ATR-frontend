import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPoliticasComponent } from './historial-politicas.component';

describe('HistorialPoliticasComponent', () => {
  let component: HistorialPoliticasComponent;
  let fixture: ComponentFixture<HistorialPoliticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialPoliticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
