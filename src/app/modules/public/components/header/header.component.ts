import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MenuItemCommandEvent, MessageService } from 'primeng/api';
// import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '../../../../shared/services/session.service';
import { ERol } from '../../../../shared/constants/rol.enum';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import { ThemeServiceService } from '../../../../shared/services/theme-service.service';
declare const $: any;
import { mensageservice } from '../../../../shared/services/mensage.service';
import { SignInService } from '../../../auth/commons/services/sign-in.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.scss',
    './login.style.scss',
    // '../../../../shared/styles/dark-theme.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  sidebarVisible = false;
  isMobile = false;
  items: MenuItem[] = [];
  isLoggedIn = false;
  userROL!: string;
  isSticky = false;
  isLoading = false;
  searchQuery = ''; // Bind search input
  datosEmpresa: any = {};
  nombreDeLaPagina: string = '';

  empresaData: any;

  imageUrl!: string;
  defaultImageUrl: string =
    'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730395938/images-AR/wyicw2mh3xxocscx0diz.png';
  isDarkThemeOn = signal(false);
  passwordStrengthClass: string = ''; // Clase CSS que se aplica dinámicamente
  passwordStrengthMessage: string = ''; // Mensaje dinámico que se muestra debajo del campo
  
  darkMode = false;
  constructor(
    private msgs: mensageservice,
    private signInService: SignInService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private datosEmpresaService: DatosEmpresaService,
    private ngxService: NgxUiLoaderService,
    private renderer: Renderer2,
    // private sessionService: SessionService,
    private elementRef: ElementRef,
    public themeService: ThemeServiceService,
    private cdr: ChangeDetectorRef,
    //para lo del capchat
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required,Validators.pattern(
        // Expresión regular para formato de correo
        /^[a-zA-Z][\w.-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/
      )],
      password: ['', Validators.required],
    });
  }
  
  // Método para acceder al control del email
  get email() {
    return this.loginForm.get('email');
  }
  // constructor(
    // private router:  Router,
    // private datosEmpresaService: DatosEmpresaService,

    // @Inject(PLATFORM_ID) private platformId: Object
  // ) {}
  visible: boolean = false;

  
  openModal() {
    this.visible = true;
    this.robot = true;
    this.presionado = false;
    this.loadCaptchaScript();
    this.getCaptchaToken();
    this.checkLockState();
    this.traerDatos();
  }
  closeModal() {
    this.visible = false; // Cierra el modal
    this.loginForm.reset(); // Limpia los campos del formulario
    this.robot = false;
    this.presionado = false;
    this.captchaToken = null; // Limpia el token del captcha
  }
  // toggleDarkTheme(): void {
  //   document.body.classList.toggle('dark-theme');
  // }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
    this.isDarkThemeOn.update((isDarkThemeOn) => !isDarkThemeOn);
    this.darkMode = !this.darkMode;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute(
        'data-theme',
        this.darkMode ? 'dark' : 'light'
      );
    }
    //
    const newTheme =
      this.themeService.getTheme() === 'light' ? 'dark' : 'light';

    // Guardar el tema en localStorage
    localStorage.setItem('theme', newTheme);
    this.themeService.setTheme(newTheme);
  }

  ngOnInit(): void {
   this.closeModal();
  
    // Verificar si el entorno tiene acceso a localStorage (es decir, que no está en SSR)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Recuperar el tema guardado en localStorage (si existe)
      const savedTheme = localStorage.getItem('theme');

      // Comprobar si el valor es válido
      if (savedTheme === 'dark' || savedTheme === 'light') {
        if (typeof document !== 'undefined') {
          this.darkMode = savedTheme === 'dark';
          document.body.classList.toggle('dark-theme', this.darkMode);
          document.documentElement.setAttribute(
            'data-theme',
            this.darkMode ? 'dark' : 'light'
          );
          this.themeService.setTheme(savedTheme);
        }
      } else {
        if (typeof document !== 'undefined') {
          // Si no hay tema guardado o es inválido, usar el valor por defecto (por ejemplo, 'light')
          this.darkMode = false;
          document.body.classList.remove('dark-theme');
          document.documentElement.setAttribute('data-theme', 'light');
          this.themeService.setTheme('light');
        }
      }
    } else {
      if (typeof document !== 'undefined') {
        // En un entorno donde localStorage no está disponible, establecer un tema predeterminado
        this.darkMode = false;
        document.body.classList.remove('dark-theme');
        document.documentElement.setAttribute('data-theme', 'light');
        this.themeService.setTheme('light');
      }
    }
    this.loadCompanyData(); // Cargar los datos de la empresa al iniciar

    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      // AOS.init();
      this.renderer.listen('window', 'resize', () => this.checkScreenSize());
      this.updateMenuItems();
    }
  }

  loadCompanyData() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        this.empresaData = data[0]; // Guardar los datos en la variable
        this.nombreDeLaPagina = this.empresaData?.tituloPagina;
        this.imageUrl = this.empresaData?.logo;
      },
      (error) => {
        console.error('Error al cargar los datos de la empresa:', error);
      }
    );
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      $(this.elementRef.nativeElement)
        .find('.ui.search')
        .search({
          type: 'category',
          apiSettings: {
            url: '/search/{query}', // Asegúrate de que esta URL sea correcta
          },
          onSelect: (result: any) => {
            // Manejar la selección del resultado aquí, si es necesario
          },
        });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollTop > 20;
    this.isScrolled = scrollTop > 10;
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      const isNowMobile = window.innerWidth <= 608;
      if (isNowMobile !== this.isMobile) {
        this.isMobile = isNowMobile;
        this.cdr.detectChanges();
      }
    }
  }

  onSearch() {
    this.isLoading = true;
    // Reemplaza con la llamada real a la API de búsqueda
    setTimeout(() => {
      this.isLoading = false;
      // Implementa tu lógica de búsqueda aquí
      console.log('Buscando:', this.searchQuery);
    }, 2000);
  }

  showDialog() {
    this.sidebarVisible = true;
  }
  popupVisible: boolean = false;

  // Alterna la visibilidad del popup
  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.popupVisible = false;
    }
  }

  updateMenuItems() {
    this.isLoggedIn = this.isUserLoggedIn();

    // Asigna items de menú con el tipo correcto
    this.items = this.isLoggedIn
      ? [
          {
            label: 'Mi perfil',
            icon: 'pi pi-user',
            command: (event: MenuItemCommandEvent) =>
              this.redirectTo('Mi-perfil'),
          },
          {
            label: 'Configuración',
            icon: 'pi pi-cog',
            command: (event: MenuItemCommandEvent) => this.redirectTo('Config'),
          },
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: (event: MenuItemCommandEvent) => this.logout(),
          },
        ]
      : [
          {
            label: 'Iniciar sesión',
            icon: 'pi pi-sign-in',
            command: (event: MenuItemCommandEvent) =>
              this.redirectTo('Sign-in'),
          },
          {
            label: 'Registrarme',
            icon: 'pi pi-user-plus',
            command: (event: MenuItemCommandEvent) =>
              this.redirectTo('Sign-up'),
          },
          // {
          //   label: 'Activar cuenta',
          //   icon: 'pi pi-check-circle',
          //   command: (event: MenuItemCommandEvent) =>
          //     this.redirectTo('Activar-cuenta'),
          // },
        ];
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.updateMenuItems();
    this.router.navigate(['/auth/login']);
  }

  isUserLoggedIn(): boolean {
    const userData = this.sessionService.getUserData();
    if (userData) {
      this.userROL = userData.rol;
      return this.userROL === ERol.CLIENTE;
    }
    return false;
  }

  redirectTo(route: string): void {
    this.sidebarVisible = false;
    this.visible=false;
    this.router.navigate(
      route.includes('Sign-in') ||
        route.includes('Sign-up') ||
        route.includes('forgot-password') ||
        route.includes('Activar-cuenta')
        ? ['/auth', route]
        : ['/public', route]
    );
  }




  captchaToken: string | null = null;
  // 


  maxAttempts: number = 5; // Se puede asignar un número o 0 más adelante

  attempts: number = 0; // Contador de intentos actuales
  isLocked: boolean = false; // Estado para saber si está bloqueado
  lockTime: number = 30; // Tiempo de bloqueo en segundos
  remainingTime: number = 0; // Tiempo restante para volver a intentar
  timerSubscription!: Subscription;

  loginForm: FormGroup;
  errorMessage: string = '';
  // userROL!: string;
  loading: boolean = false;
  captchagenerado: boolean = false;
  //datos de la empresa
  logo: string =
    'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730395938/images-AR/wyicw2mh3xxocscx0diz.png';

  nombreEmpresa: string = 'Atelier';

  public robot!: boolean;
  public presionado!: boolean;

 

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

 
  getCaptchaToken(): string {
    if (typeof grecaptcha !== 'undefined') {
      const token = grecaptcha.getResponse();
      if (!token) {
        console.warn('Token no generado todavía.');
      }
      console.log(token);
      return token;
    } else {
      console.error('reCAPTCHA no ha sido cargado.');
      return '';
    }
  }
  resetCaptcha(): void {
    grecaptcha.reset();
  }
  loadCaptchaScript() {
    if (typeof document === 'undefined') {
      console.warn(
        'No se puede cargar el script porque document no está definido.'
      );
      return;
    }

    const scriptId = 'recaptcha-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('reCAPTCHA script loaded');
      };
      document.body.appendChild(script);
    } else {
      console.log('El script de reCAPTCHA ya está cargado.');
    }
  }

  traerDatos() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const empresaData = data[0];
          // this.logo = empresaData.logo;
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

  // redirectTo(route: string): void {
  //   if (route === 'login') {
  //     this.router.navigate(['/auth/login']);
  //   } else {
  //     this.router.navigate(['/auth', route]);
  //   }
  // }

  recargarPagina() {
    window.location.reload();
  }

  validateCaptcha() {
    const token = grecaptcha.getResponse();

    console.log('El token del capchat: ' + token);
    return token ? token : null;
  }

inicia(){
  this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
  // Stop the foreground loading after 5s
  setTimeout(() => {
    this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
  }, 3000);

  // OR
  this.ngxService.startBackground("do-background-things");
  // Do something here...
  this.ngxService.stopBackground("do-background-things");

  this.ngxService.startLoader("loader-01"); // start foreground spinner of the loader "loader-01" with 'default' taskId
  // Stop the foreground loading after 5s
  setTimeout(() => {
    this.ngxService.stopLoader("loader-01"); // stop foreground spinner of the loader "loader-01" with 'default' taskId
  }, 3000);
}

validacionesPassword = {
  tieneMinuscula: false,
  tieneMayuscula: false,
  tieneNumero: false,
  tieneSimbolo: false,
  longitudMinima: false,
  longitudMayor5: false,
  tiene5CaracteresDiferentes: false,
};
passwordStrength: string = ''; // variable para almacenar la fuerza de la contraseña

  verificarPassword() {
    const password = this.loginForm.get('password')?.value || '';
  
    // Validaciones obligatorias
    this.validacionesPassword.tieneMinuscula = /[a-z]/.test(password); // Al menos una letra minúscula
    this.validacionesPassword.tieneMayuscula = /[A-Z]/.test(password); // Al menos una letra mayúscula
    this.validacionesPassword.tieneNumero = /\d/.test(password); // Al menos un número
    this.validacionesPassword.tieneSimbolo = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password); // Al menos un símbolo
    this.validacionesPassword.longitudMinima = password.length >= 15; // Longitud mínima requerida
    this.validacionesPassword.longitudMayor5 = password.length > 5; // Más de 5 caracteres
  
    // Al menos 5 caracteres diferentes
    const caracteresUnicos = new Set(password.split(''));
    this.validacionesPassword.tiene5CaracteresDiferentes = caracteresUnicos.size >= 5;
  
    // Verificar que la contraseña cumpla con todos los criterios
    const allValidations = [
      this.validacionesPassword.tieneMinuscula,
      this.validacionesPassword.tieneMayuscula,
      this.validacionesPassword.tieneNumero,
      this.validacionesPassword.tieneSimbolo,
      this.validacionesPassword.longitudMinima,
      this.validacionesPassword.longitudMayor5,
      this.validacionesPassword.tiene5CaracteresDiferentes,
    ];
  
    // Calcular cuántas validaciones se cumplen
    const validacionesCumplidas = allValidations.filter((v) => v).length;
  
    // Asignar nivel de seguridad y mensaje
    if (validacionesCumplidas === allValidations.length) {
      this.passwordStrength = 'strong'; // Contraseña fuerte
      this.passwordStrengthMessage = 'Contraseña segura y compleja';
      this.passwordStrengthClass = 'strong';
    } else if (validacionesCumplidas >= 5) {
      this.passwordStrength = 'medium'; // Contraseña media
      this.passwordStrengthMessage = 'Complejidad media';
      this.passwordStrengthClass = 'medium';
    } else {
      this.passwordStrength = 'weak'; // Contraseña débil
      this.passwordStrengthMessage = 'Demasiado simple';
      this.passwordStrengthClass = 'weak';
    }
  
    // this.verificarCoincidencia(); // Para verificar si la confirmación coincide con la contraseña
  }

  login(): void {
     this.captchaToken = this.validateCaptcha();
    
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
    // const captchaT = this.captchaToken;
    
    
    this.signInService.signIn({ email, password,captchaToken: this.captchaToken}).subscribe(
      (response) => {
        if (response) {
          this.storageService.setToken(response.token);
          const userData = this.sessionService.getUserData();
          // window.location.reload();
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
             
    this.inicia();
    
              window.location.reload();
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
            })
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
