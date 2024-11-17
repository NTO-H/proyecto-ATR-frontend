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
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { SignUpService } from './commons/services/sign-up.service';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import { RecuperarPasswordView } from './view/recuperar-password/recuperar-password.view';
import { mensageservice } from '../../shared/services/mensage.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxEasyCaptchaService,
  CAPTCHA_PROVIDER,
  CAPTCHA_SITE_KEY,
  STRING_INITIALIZER,
  CaptchaProvider,
} from '../../../../projects/angx/ngx-easy-captcha/src/public-api';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';

import { DialogModule } from 'primeng/dialog';

import { VerificarCodigoView } from './view/verificar-codigo/verificar-codigo.view';

import { InputOtpModule } from 'primeng/inputotp';
// import { RegistroComponent } from './view/registro/registro.component';
import { RegistroView } from './view/registro/registro.view';
import { SessionService } from '../../shared/services/session.service';
import { PublicModule } from '../public/public.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
    SignUpView,
    RecuperarPasswordView,
    SignInView,
    VerificarCodigoView,
    RegistroView,
  ],
  imports: [
    InputOtpModule,
    ButtonModule,
    CommonModule,
    DialogModule,
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
    InputGroupModule,
    PublicModule,
    ToastrModule.forRoot(),

    //para lo del capchat xd
    NgClass,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // importProvidersFrom(RecaptchaV3Module),
    // {
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useValue: '6LereGcqAAAAAOYonCxeWIj-b9XAv8Y3hng--ype',
    // },
    SignInService,
    SessionService,
    mensageservice,
    UsuarioService,
    ToastrService,
    MessageService,
    ConfirmationService, 
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    //lo del capchat
    NgxEasyCaptchaService,NgxUiLoaderService ,
    { provide: CAPTCHA_PROVIDER, useValue: CaptchaProvider.CloudFlare },
    { provide: CAPTCHA_SITE_KEY, useValue: '0x4AAAAAAAz_bKFwjxufmfKM' }, // Replace with your site key
    { provide: STRING_INITIALIZER, useValue: 'cloudflare-captcha' },
  ],
})
export class AuthModule {}
