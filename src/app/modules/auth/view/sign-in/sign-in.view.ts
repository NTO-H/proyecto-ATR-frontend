import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignInService } from '../../commons/services/sign-in.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { SessionService } from '../../../../shared/services/session.service';
import { MessageService } from 'primeng/api';
import { Subscription, interval } from 'rxjs';
import { ERol } from '../../../../shared/constants/rol.enum';
import { environment } from '../../../../../environments/environment';
import { RecaptchaService } from '../../../../shared/services/recaptcha.service';
import { mensageservice } from '../../../../shared/services/mensage.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInView implements OnInit {
  maxAttempts = 3; // Número máximo de intentos permitidos
  attempts = 0; // Contador de intentos actuales
  isLocked = false; // Estado para saber si está bloqueado
  lockTime = 30; // Tiempo de bloqueo en segundos
  remainingTime = 0; // Tiempo restante para volver a intentar
  timerSubscription!: Subscription;

  loginForm: FormGroup;
  errorMessage!: string;
  userROL!: string;
  loading: boolean = false;

  //
  public robot!: boolean;
  public presionado!: boolean;

  // Inject the service in the constructor
  // constructor() {}

  // Implement a callback for reCAPTCHA v2 resolution
  onCaptchaResolved(response: string): void {
    // Use the response token as needed
    console.log('reCAPTCHA v2 Response:', response);
  }

  executeRecaptchaVisible(token:any){
    console.log('token visible', token);
    // this.robot = false;
    // this.presionado = true;
    // this.executeVisibleCatcha(token); // Ejecutar la acción que requiera el token visible
  }
  constructor(
    private msgs: mensageservice,
    private signInService: SignInService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  captchaText: string = '';

  // constructor () { }

  // ngOnInit(): void {
  // }
  
  generateCaptcha(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZadcdefghijklmnopqrstuvwxyz0123456789';
    const captchaLength = 6;
    let captcha = '';
    for (let i = 0; i<captchaLength; i++) {
      const index = Math.floor(Math.random() * chars.length);
      captcha +=chars[index];
    }
    this.captchaText = captcha;
  }
  ngOnInit(): void {
  this.generateCaptcha();
    this.robot = true;
    this.presionado = false;
    this.checkLockState(); // Verificar si la cuenta está bloqueada al cargar
  }

  // Verifica el estado de bloqueo en localStorage o sessionStorage
  checkLockState() {
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

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.signInService.signIn({ email, password }).subscribe(
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
        this.attempts++; // Incrementar el contador de intentos fallidos

        let errorMessage = 'Credenciales incorrectas. Intento fallido.'; // Mensaje por defecto

        // Si el backend devuelve un mensaje específico, úsalo
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }

        if (this.attempts >= this.maxAttempts) {
          this.lockAccount(); // Bloquear si se superan los intentos
        } else {
          Swal.fire({
            title: 'Error!',
            text: errorMessage, // Mostrar mensaje del backend
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
}
