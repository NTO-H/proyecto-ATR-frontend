import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignInService } from '../../commons/services/sign-in.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { SessionService } from '../../../../shared/services/session.service';
import { MessageService } from 'primeng/api';
import { interval } from 'rxjs';
import { ERol } from '../../../../shared/constants/rol.enum';
import { mensageservice } from '../../../../shared/services/mensage.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

//lo del capchat
import { OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { NgxEasyCaptchaService } from '../../../../../../projects/angx/ngx-easy-captcha/src/public-api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInView implements OnInit {
  maxAttempts: number = 5; // Se puede asignar un número o 0 más adelante

  attempts: number = 0; // Contador de intentos actuales
  isLocked: boolean = false; // Estado para saber si está bloqueado
  lockTime: number = 30; // Tiempo de bloqueo en segundos
  remainingTime: number = 0; // Tiempo restante para volver a intentar
  timerSubscription!: Subscription;

  loginForm: FormGroup;
  errorMessage: string = '';
  userROL!: string;
  loading: boolean = false;

  public robot!: boolean;
  public presionado!: boolean;

  //lo del capchat
  captchaSubscription!: Subscription;
  captchaToken!: string;

  constructor(
    private msgs: mensageservice,
    private signInService: SignInService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private messageService: MessageService,

    //para lo del capchat
    private router: Router,
    private route: ActivatedRoute,
    private captchaService: NgxEasyCaptchaService,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.captchaSubscription = this.captchaService.$.subscribe(
      (token: string) => {
        this.captchaToken = token;
        console.log(token);
      }
    );
  }
  onSignupSubmit() {
    if (this.captchaToken) {
      console.log(this.captchaToken);
    }
  }
  ngOnDestroy(): void {
    this.captchaSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.generateCaptcha();
    this.robot = true;
    this.presionado = false;
    this.checkLockState(); // Verificar si la cuenta está bloqueada al cargar
  }

  // Verifica el estado de bloqueo en localStorage o sessionStorage
  checkLockState() {
    if (isPlatformBrowser(this.platformId)) {
      const lockInfo = localStorage.getItem('lockInfo'); // O sessionStorage.getItem('lockInfo') si prefieres sessionStorage
      if (lockInfo) {
        const { attempts, lockTime, isLocked, remainingTime } =
          JSON.parse(lockInfo);
        this.attempts = attempts;
        this.lockTime = lockTime;
        this.isLocked = isLocked;
        this.remainingTime = remainingTime;

        if (this.isLocked) {
          this.startCountdown(); // Iniciar el temporizador si ya está bloqueado
        }
      }
    }
  }

  // Método para guardar el estado del bloqueo en localStorage o sessionStorage
  saveLockState() {
    const lockInfo = {
      attempts: this.attempts,
      lockTime: this.lockTime,
      isLocked: this.isLocked,
      remainingTime: this.remainingTime,
    };
    localStorage.setItem('lockInfo', JSON.stringify(lockInfo)); // O sessionStorage.setItem si prefieres sessionStorage
  }

  // Método para restablecer el estado del bloqueo
  clearLockState() {
    localStorage.removeItem('lockInfo'); // O sessionStorage.removeItem si prefieres sessionStorage
  }

  redirectTo(route: string): void {
    if (route === 'login') {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/auth', route]);
    }
  }

  login(): void {
    if (this.isLocked) {
      Swal.fire({
        title: 'Cuenta bloqueada',
        text: `Has alcanzado el límite de intentos. Intenta de nuevo en ${this.remainingTime} segundos.`,
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    if (!navigator.onLine) {
      Swal.fire({
        title: 'Sin conexión a Internet',
        text: 'Por favor, verifica tu conexión y vuelve a intentarlo.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    const captchaToken = this.captchaToken;

    if (!captchaToken) {
      Swal.fire({
        title: 'Captcha no verificado',
        text: 'Por favor, verifica que no eres un robot.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.signInService.signIn({ email, password,captchaToken  }).subscribe(
      (response) => {
        if (response) {
          this.storageService.setToken(response.token);
          const userData = this.sessionService.getUserData();
          if (userData) {
            this.userROL = userData.rol;
            let navigateTo = '';

            if (this.userROL === ERol.ADMIN) {
              navigateTo = '/admin/home';
            } else if (this.userROL === ERol.CLIENTE) {
              navigateTo = '/public/home';
            }

            this.router.navigate([navigateTo]).then(() => {
              if (navigateTo === '/public/home') {
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
        if (err) {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          }
          if (err.error?.tiempo) {
            const tiempoDeBloqueo = err.error.tiempo;
            const numeroDeIntentos = err.error.numeroDeIntentos;
            this.attempts = numeroDeIntentos;
            this.lockTime = tiempoDeBloqueo;
            this.isLocked = true;
            this.remainingTime = tiempoDeBloqueo;
            this.saveLockState();

            Swal.fire({
              title: 'Cuenta Bloqueada',
              text: err.error.message,
              icon: 'warning',
              confirmButtonText: 'Ok',
            });
            this.startCountdown();
          }
        } else {
          Swal.fire({
            title: 'Error ',
            text: 'Ha ocurrido un error al iniciar sesión.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    );
  }

  // Método para bloquear la cuenta y activar el temporizador
  lockAccount(): void {
    this.isLocked = true;
    this.remainingTime = this.lockTime;

    Swal.fire({
      title: 'Límite de intentos alcanzado',
      text: `Cuenta bloqueada por ${this.lockTime} segundos. Por favor, intenta nuevamente más tarde.`,
      icon: 'warning',
      confirmButtonText: 'Entendido',
    });

    this.saveLockState(); // Guardar el estado del bloqueo

    // Iniciar un temporizador que decremente cada segundo
    this.startCountdown();
  }

  // Método para iniciar el temporizador
  startCountdown() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.remainingTime--;
      this.saveLockState(); // Actualizar el tiempo restante en el almacenamiento

      if (this.remainingTime <= 0) {
        this.resetLock(); // Desbloquear al finalizar el temporizador
      }
    });
  }

  // Método para restablecer el bloqueo
  resetLock(): void {
    this.isLocked = false;
    this.attempts = 0;
    this.clearLockState(); // Eliminar el estado del bloqueo

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Detener el temporizador
    }
  }

  get hasLowercase(): boolean {
    return /[a-z]/.test(this.loginForm.get('password')?.value);
  }

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.loginForm.get('password')?.value);
  }

  get hasNumber(): boolean {
    return /[0-9]/.test(this.loginForm.get('password')?.value);
  }

  get hasSpecialChar(): boolean {
    return /[@$!%*?&]/.test(this.loginForm.get('password')?.value);
  }

  get hasMinLength(): boolean {
    return this.loginForm.get('password')?.value?.length >= 8;
  }
}
