import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpView } from './sign-up.view';

describe('SignUpView', () => {
  let component: SignUpView;
  let fixture: ComponentFixture<SignUpView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
