import {
  CUSTOM_ELEMENTS_SCHEMA,
  importProvidersFrom,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInView } from './view/sign-in/sign-in.view';
import { SignUpView } from './view/sign-up/sign-up.view';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInService } from './commons/services/sign-in.service';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SignUpService } from './commons/services/sign-up.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RecuperarPasswordView } from './view/recuperar-password/recuperar-password.view';
import { mensageservice } from '../../shared/services/mensage.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
// import {
//   RECAPTCHA_V3_SITE_KEY,
//   RecaptchaLoaderService,
//   RecaptchaModule,
//   RecaptchaV3Module,
//   ReCaptchaV3Service,
// } from 'ng-recaptcha';
import { VerificarCodigoView } from './view/verificar-codigo/verificar-codigo.view';

import { InputOtpModule } from 'primeng/inputotp';
@NgModule({
  declarations: [
    AuthComponent,
    SignUpView,
    RecuperarPasswordView,
    SignInView,
    VerificarCodigoView,
  ],
  imports: [
    InputOtpModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    FormsModule,
    DividerModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StepperModule,
    PasswordModule,
    InputMaskModule,
    InputTextModule,
    // RecaptchaModule,
    // RecaptchaV3Module,

    ToastrModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // importProvidersFrom(RecaptchaV3Module),
    // {
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useValue: '6LereGcqAAAAAOYonCxeWIj-b9XAv8Y3hng--ype',
    // },
    SignInService,
    // ReCaptchaV3Service,
    // RecaptchaLoaderService,
    mensageservice,
    UsuarioService,
    ToastrService,
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AuthModule {}
