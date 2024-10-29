import { Component, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as AOS from 'aos';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '../../../../shared/services/session.service';
import { ERol } from '../../../../shared/constants/rol.enum';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isScrolled = false;
  sidebarVisible: boolean = false;
  isMobile: boolean = false;
  items: MenuItem[] = [];
  isLoggedIn: boolean = false;
  userROL!: string;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    import('aos').then(AOS => {
      AOS.init();
    });

    this.checkScreenSize();
    this.renderer.listen('window', 'resize', () => this.checkScreenSize());
    this.updateMenuItems();
  }
}
  
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.pageYOffset || 0;
      this.isScrolled = scrollPosition > 10;
    }
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.pageYOffset || 0;
      this.isScrolled = scrollPosition > 10;
    }
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768; // Determina si es móvil o escritorio
      console.log(this.isMobile ? 'Modo móvil' : 'Modo escritorio');
    }
  }

  showDialog() {
    this.sidebarVisible = true; // Muestra el sidebar
  }

  updateMenuItems() {
    this.isLoggedIn = this.isUserLoggedIn(); // Actualiza el estado de inicio de sesión
    if (this.isLoggedIn) {
      this.items = [
        {
          label: 'Mi perfil',
          icon: 'pi pi-user',
          command: () => this.redirectTo('Mi-perfil'),
        },
        {
          label: 'Configuración',
          icon: 'pi pi-cog',
          command: () => this.redirectTo('Config'),
        },
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        },
      ];
    } else {
      this.items = [
        {
          label: 'Iniciar sesión',
          icon: 'pi pi-sign-in',
          command: () => this.redirectTo('Sign-in'),
        },
        {
          label: 'Registrarme',
          icon: 'pi pi-user-plus',
          command: () => this.redirectTo('Sign-up'),
        },
        {
          label: 'Activar cuenta',
          icon: 'pi pi-check-circle',
          command: () => this.redirectTo('Activar-cuenta'),
        },
      ];
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token'); // Elimina el token de inicio de sesión
    }
    this.isLoggedIn = false; // Cambia el estado de inicio de sesión
    this.updateMenuItems(); // Actualiza los elementos del menú
    this.router.navigate(['/auth/login']); // Redirige a la página de inicio de sesión
  }

  isUserLoggedIn(): boolean {
    // if (userData) {
      const userData = this.sessionService.getUserData();
          if (userData) {
      this.userROL = userData.rol;
      let navigateTo = '';

      if (this.userROL === ERol.CLIENTE) {
        return true
      }
    }
    return false; // Devuelve false si no está en el navegador
    
    // return null; // Devuelve false si no está en el navegador
    // Verifica si está en el navegador antes de acceder a localStorage
    // if (isPlatformBrowser(this.platformId)) {
    //   return !!localStorage.getItem('token');
    // }
  }

  redirectTo(route: string): void {
    this.sidebarVisible = false; // Cierra el sidebar al redirigir
    if (route === 'Sign-in' || route === 'Sign-up' || route === 'Activar-cuenta') {
      this.router.navigate(['/auth', route]);
    } else {
      this.router.navigate(['/public', route]);
    }
  }
}
