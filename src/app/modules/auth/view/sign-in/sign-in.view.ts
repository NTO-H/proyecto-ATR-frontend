import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignInService } from '../../commons/services/sign-in.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { SessionService } from '../../../../shared/services/session.service';
// import { ReCaptchaV2Service } from 'ng-recaptcha';
import { ERol } from '../../../../shared/constants/rol.enum';
// import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaService } from '../../../../shared/services/recaptcha.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInView implements OnInit {
  loginForm: FormGroup;
  errorMessage!: string;
  userROL!: string;
  loading: boolean = false;

  //
  public robot!: boolean;
  public presionado!: boolean;

  //

  ngOnInit(): void {
    this.robot = true;
    this.presionado = false;
  }

  // private recaptchaV2Service: ReCaptchaV2Service,

  constructor(
    private signInService: SignInService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
private messageService: MessageService,
    private httpService: RecaptchaService,
    // private recaptchaV3Service: ReCaptchaV3Service
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // constructor() {}

  showResponse(event:any) {
      this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
  }
  // Inject the service in the constructor
  // getInfoRecaptcha() {
  //   this.robot = true;
  //   this.presionado = true;
  //   this.recaptchaV3Service.execute('').subscribe((token) => {
  //     const auxiliar = this.httpService.getTokenClientModule(token);
  //     auxiliar.subscribe({
  //       complete: () => {
  //         this.presionado = false;
  //       },
  //       error: () => {
  //         this.presionado = false;
  //         this.robot = true;
  //         alert(
  //           'Tenemos un problema, recarga la página página para solucionarlo o contacta con 1938web@gmail.com'
  //         );
  //       },
  //       next: (resultado: Boolean) => {
  //         if (resultado === true) {
  //           this.presionado = false;
  //           this.robot = false;
  //         } else {
  //           alert('Error en el captcha. Eres un robot');
  //           this.presionado = false;
  //           this.robot = true;
  //         }
  //       },
  //     });
  //   });
  // }
  // Implement a callback for reCAPTCHA v2 resolution
  // onCaptchaResolved(response: string): void {
  //   // Use the response token as needed
  //   console.log('reCAPTCHA v2 Response:', response);
  // }

  redirectTo(route: string): void {
    if (route === 'login') {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/auth', route]);
    }
  }

  login(): void {
    this.loading = true;
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      this.loading = true;

      return;
    }

    if (!navigator.onLine) {
      Swal.fire({
        title: 'Sin conexión a Internet',
        text: 'Por favor, verifica tu conexión y vuelve a intentarlo.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      this.loading = false;

      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.loading = true;

    this.signInService.signIn({ email, password }).subscribe(
      (response) => {
        console.log('aqui');
        if (response) {
          this.storageService.setToken(response.token);
          const userData = this.sessionService.getUserData();
          if (userData) {
            this.userROL = userData.rol;
            let navigateTo = '';

            if (this.userROL === ERol.ADMIN) {
              navigateTo = 'admin/inicio';
            } else if (this.userROL === ERol.CLIENTE) {
              navigateTo = 'repartidor/Home';
            }

            this.router.navigate([navigateTo]).then(() => {
              if (navigateTo === 'repartidor/Home') {
                window.location.reload();
              } else {
                Swal.fire({
                  title: 'Acceso exitoso',
                  text: 'Has iniciado sesión correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Continuar',
                });
              }
            });
          }
        }
      },
      (err) => {
        Swal.fire({
          title: 'Error!',
          text: 'Ocurrió un error al iniciar sesión.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }
}
