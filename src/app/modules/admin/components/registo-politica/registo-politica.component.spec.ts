import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoPoliticaComponent } from './registo-politica.component';

describe('RegistoPoliticaComponent', () => {
  let component: RegistoPoliticaComponent;
  let fixture: ComponentFixture<RegistoPoliticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistoPoliticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistoPoliticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
