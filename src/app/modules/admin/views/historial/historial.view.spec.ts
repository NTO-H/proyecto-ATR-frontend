import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialView } from './historial.view';

describe('HistorialView', () => {
  let component: HistorialView;
  let fixture: ComponentFixture<HistorialView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
