import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaDeView } from './acerca-de.view';

describe('AcercaDeView', () => {
  let component: AcercaDeView;
  let fixture: ComponentFixture<AcercaDeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcercaDeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcercaDeView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
