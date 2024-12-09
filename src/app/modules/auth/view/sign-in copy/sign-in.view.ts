import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
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
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import { Subscription } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';

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
  captchagenerado: boolean = false;
  //datos de la empresa
  logo: string =
    'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730395938/images-AR/wyicw2mh3xxocscx0diz.png';

  nombreEmpresa: string = 'Atelier';

  notifications: any; // Para mostrar notificaciones en la vista
  isPasswordCompromised: boolean = false;
  passwordStrengthClass: string = ''; // Clase CSS que se aplica dinámicamente

  public robot!: boolean;
  public presionado!: boolean;

  constructor(
    private msgs: mensageservice,
    private signInService: SignInService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private datosEmpresaService: DatosEmpresaService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, this.emailValidator()]],
      password: ['', Validators.required],
    });
    console.log('Formulario:', this.loginForm);
    console.log('Valores:', this.loginForm.value);
    console.log('Errores:', this.loginForm.errors);
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.reset(); // Resetea el CAPTCHA al destruir el componente
    }
  }

  ngOnInit(): void {
    this.robot = true;
    this.presionado = false;
    this.checkLockState();
    this.traerDatos();
    this.loginForm.get('password')?.valueChanges.subscribe((password) => {
      if (password?.length > 0) {
        this.checkIfPasswordIsPwned(password);
      }
    });
  }

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz|mx|us|uk|es|fr|de|ca|au|jp|xyz|me|tech|co|tv|cloud|ai)$/;

      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }
  async getPasswordHash(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    return hashHex.toUpperCase();
  }

  async checkIfPasswordIsPwned(password: string) {
    const hash = await this.getPasswordHash(password);
    const prefix = hash.slice(0, 5); // Primeros 5 caracteres
    const suffix = hash.slice(5); // El resto del hash

    try {
      const response = await axios.get(
        `https://api.pwnedpasswords.com/range/${prefix}`
      );
      const matches = response.data.split('\n');

      this.isPasswordCompromised = false; // Resetear estado
      let notified = false;

      for (let match of matches) {
        const [matchHash, count] = match.split(':');
        if (matchHash === suffix) {
          this.isPasswordCompromised = true; // Contraseña comprometida
          if (!notified) {
            this.toastr.error(
              `¡Esta contraseña ha sido comprometida! Se ha encontrado ${count} veces.`,
              'Advertencia',
              {
                toastClass: 'toast error', // Aplica tus estilos personalizados
                disableTimeOut: false,
                closeButton: true,
                timeOut: 1200,
                progressBar: true,
                progressAnimation: 'decreasing',
              }
            );
            notified = true; // Marca como notificado
          }
          break;
        }
      }

      if (!this.isPasswordCompromised) {
        this.passwordStrengthClass = 'text-success'; // Si no está comprometida, mantener mensaje positivo
      } else {
        this.passwordStrengthClass = 'text-danger'; // Si la contraseña está comprometida, marcar como insegura
      }
    } catch (error) {
      console.error('Error al verificar la contraseña', error);
    }
  }
  ngAfterViewInit() {
    this.cargarWidgetRecaptcha();
  }

  cargarWidgetRecaptcha() {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.render('captcha-container', {
        sitekey: '6Ld8joAqAAAAABuc_VUhgDt7bzSOYAr7whD6WeNI',
      });
    } else {
      console.error('El cliente de reCAPTCHA no está disponible.');
    }
  }

  traerDatos() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const empresaData = data[0];
          this.logo = empresaData.logo;
          this.nombreEmpresa = empresaData.tituloPagina;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontraron datos de la empresa.',
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los datos de la empresa.',
        });
        console.error('Error al cargar datos de la empresa', error);
      }
    );
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

  generaToken() {
    const token = grecaptcha.getResponse();
    console.log('Token generado: ' + token);
    return token ? token : null;
  }
  login(): void {
    const captchaToken = this.generaToken();

    if (!captchaToken) {
      Swal.fire({
        title: 'Complete el capchat primero',
        text: `Resuelva el captcha para continuar con el proceso de inicio de sesión`,
        icon: 'info',
        confirmButtonText: 'Entendido',
      });
      return;
    }
    if (this.isLocked) {
      Swal.fire({
        title: 'Cuenta bloqueada',
        text: `Has alcanzado el límite de intentos. Intenta de nuevo en ${this.remainingTime} segundos.`,
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return;
    }
    if (this.isPasswordCompromised) {
      Swal.fire({
        title: 'Contraseña comprometida',
        text: 'Por favor, cambia tu contraseña antes de iniciar sesión.',
        icon: 'error',
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
    // this.inicia();
    this.signInService.signIn({ email, password, captchaToken }).subscribe(
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
              }
            });
          }
        }
      },
      (err) => {
        console.error('Error en el inicio de sesión:', err);
        if (err) {
          if (err.error.message === 'Captcha inválido') {
            Swal.fire({
              title: 'Captcha Inválido',
              text: 'El CAPTCHA ingresado es incorrecto. Por favor,recargue la pagina e inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
            return;
          }
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
