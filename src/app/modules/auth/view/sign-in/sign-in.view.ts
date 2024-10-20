import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignInService } from '../../commons/services/sign-in.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { SessionService } from '../../../../shared/services/session.service';
import { MessageService } from 'primeng/api';
import { Subscription, interval } from 'rxjs';
import { ERol } from '../../../../shared/constants/rol.enum';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInView implements OnInit {
  loginForm: FormGroup;
  userROL!: string;
  loading: boolean = false;
  errorMessage: string | null = null;
  remainingTime: number | null = null; // Para almacenar el tiempo restante
  countdownInterval: any;
  isTimerVisible: boolean = false; 

  //
  public robot!: boolean;
  public presionado!: boolean;

  constructor(
    private signInService: SignInService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Recuperar el tiempo restante del localStorage
    if (isPlatformBrowser(this.platformId)) {
      const savedTime = localStorage.getItem('remainingTime');
      if (savedTime) {
        this.remainingTime = Number(savedTime);
        this.isTimerVisible = true;
        this.startCountdown();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    // Guardar el tiempo restante en el localStorage solo si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      if (this.remainingTime !== null) {
        localStorage.setItem('remainingTime', this.remainingTime.toString());
      } else {
        localStorage.removeItem('remainingTime'); // Eliminar si es null
      }
    }
  }

  redirectTo(route: string): void {
    if (route === 'login') {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/auth', route]);
    }
  }

  login(): void {
    this.errorMessage = null;

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
          this.errorMessage = null;

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
        console.log(err.error);

        if (
          err.error.minutos !== undefined &&
          err.error.segundos !== undefined
        ) {
          this.remainingTime = err.error.minutos * 60 + err.error.segundos; // Convertir a segundos
          this.isTimerVisible = true;
          this.startCountdown();
          this.errorMessage = `Tiempo restante: ${err.error.minutos} minutos y ${err.error.segundos} segundos.`;
        } else {
          this.errorMessage = null; // Resetea el mensaje si no hay tiempo restante
        }

        Swal.fire({
          title: `${err.error.title}`,
          text: `${err.error.message}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }
  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.remainingTime !== null && this.remainingTime > 0) {
        this.remainingTime--;

        // Mostrar el tiempo restante en un formato legible
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.errorMessage = `Tiempo restante: ${minutes} minutos y ${seconds} segundos.`;

        // Guardar el tiempo restante en el localStorage solo si estamos en el navegador
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('remainingTime', this.remainingTime.toString());
        }

        if (this.remainingTime === 0) {
          clearInterval(this.countdownInterval);
          this.isTimerVisible = false;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('remainingTime'); // Limpiar el localStorage si se acaba el tiempo
          }
          // Aquí puedes manejar lo que sucede cuando el tiempo se acaba
        }
      }
    }, 1000); // Actualiza cada segundo
  }
}
