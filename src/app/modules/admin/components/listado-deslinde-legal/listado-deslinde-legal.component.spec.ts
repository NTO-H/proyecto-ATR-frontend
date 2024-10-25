import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeslindeLegalComponent } from './listado-deslinde-legal.component';

describe('ListadoDeslindeLegalComponent', () => {
  let component: ListadoDeslindeLegalComponent;
  let fixture: ComponentFixture<ListadoDeslindeLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDeslindeLegalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeslindeLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
