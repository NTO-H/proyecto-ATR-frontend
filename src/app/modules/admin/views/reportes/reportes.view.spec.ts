import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesView } from './reportes.view';

describe('ReportesView', () => {
  let component: ReportesView;
  let fixture: ComponentFixture<ReportesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
