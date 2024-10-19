import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesGeneralesComponent } from './ajustes-generales.component';

describe('AjustesGeneralesComponent', () => {
  let component: AjustesGeneralesComponent;
  let fixture: ComponentFixture<AjustesGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjustesGeneralesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustesGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
