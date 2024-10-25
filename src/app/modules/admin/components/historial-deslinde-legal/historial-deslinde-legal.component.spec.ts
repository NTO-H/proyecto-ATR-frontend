import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDeslindeLegalComponent } from './historial-deslinde-legal.component';

describe('HistorialDeslindeLegalComponent', () => {
  let component: HistorialDeslindeLegalComponent;
  let fixture: ComponentFixture<HistorialDeslindeLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialDeslindeLegalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialDeslindeLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
