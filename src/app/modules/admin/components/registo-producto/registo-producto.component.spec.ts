import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoProductoComponent } from './registo-producto.component';

describe('RegistoProductoComponent', () => {
  let component: RegistoProductoComponent;
  let fixture: ComponentFixture<RegistoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistoProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
