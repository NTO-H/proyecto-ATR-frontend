import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasView } from './politicas.view';

describe('PoliticasView', () => {
  let component: PoliticasView;
  let fixture: ComponentFixture<PoliticasView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliticasView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticasView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
