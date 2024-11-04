import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProductView } from './details-product.view';

describe('DetailsProductView', () => {
  let component: DetailsProductView;
  let fixture: ComponentFixture<DetailsProductView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsProductView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsProductView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
