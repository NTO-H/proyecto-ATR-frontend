import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeslindeLegalComponent } from './deslinde-legal.component';

describe('DeslindeLegalComponent', () => {
  let component: DeslindeLegalComponent;
  let fixture: ComponentFixture<DeslindeLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeslindeLegalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeslindeLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
