import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosLegalesComponent } from './documentos-legales.component';

describe('DocumentosLegalesComponent', () => {
  let component: DocumentosLegalesComponent;
  let fixture: ComponentFixture<DocumentosLegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosLegalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
