import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionView } from './configuracion.view';

describe('ConfiguracionView', () => {
  let component: ConfiguracionView;
  let fixture: ComponentFixture<ConfiguracionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
