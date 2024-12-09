import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInView } from './sign-in.view';

describe('SignInView', () => {
  let component: SignInView;
  let fixture: ComponentFixture<SignInView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
