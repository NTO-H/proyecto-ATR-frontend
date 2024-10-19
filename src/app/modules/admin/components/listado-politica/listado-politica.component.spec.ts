import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPoliticaComponent } from './listado-politica.component';

describe('ListadoPoliticaComponent', () => {
  let component: ListadoPoliticaComponent;
  let fixture: ComponentFixture<ListadoPoliticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoPoliticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPoliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
