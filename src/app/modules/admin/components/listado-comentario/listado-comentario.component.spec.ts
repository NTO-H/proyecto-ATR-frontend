import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoComentarioComponent } from './listado-comentario.component';

describe('ListadoComentarioComponent', () => {
  let component: ListadoComentarioComponent;
  let fixture: ComponentFixture<ListadoComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoComentarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
