import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
// import { IniciarSesionView } from './view/iniciar-sesion/iniciar-sesion.view';
import { SignInView } from './view/sign-in/sign-in.view';
import { SignUpView } from './view/sign-up/sign-up.view';
// import { SignUpComponent } from './commons/components/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInService } from './commons/services/sign-in.service';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
// import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RouterModule } from '@angular/router';
import { SignUpService } from './commons/services/sign-up.service';
// import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { RecuperarPasswordView } from './view/recuperar-password/recuperar-password.view';
import { mensageservice } from '../../shared/services/mensage.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DividerModule } from 'primeng/divider';

// import {CaptchaModule} from 'primeng/captcha';
// import { RECAPTCHA_V3_SITE_KEY, RecaptchaLoaderService, RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaService } from '../../shared/services/recaptcha.service';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    AuthComponent,
    // IniciarSesionView,
    SignUpView,
    RecuperarPasswordView,
    SignInView,
    // SignUpComponent
    // SignUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,DividerModule,
    ReactiveFormsModule
    
    ,PasswordModule,InputMaskModule,InputTextModule,
    // BrowserAnimationsModule, // Asegúrate de incluir esto
    HttpClientModule ,
    ToastrModule.forRoot(),  // Importa ToastrModule aquí
    // NgxUiLoaderModule.forRoot({}),
  ],
  providers: [
    // { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LdBsWMqAAAAAAkHOGSNK6S81AGtqac1Y_w8Pnm1' },
    SignInService,
    mensageservice,
    UsuarioService,
    ToastrService,
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AuthModule {}
