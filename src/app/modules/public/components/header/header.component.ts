import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isScrolled = false;

  sidebarVisible: boolean = false;
  isMobile: boolean = false;
  items: MenuItem[] = [];
  isLoggedIn: boolean = false; // Set this based on your authentication logic

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateMenuItems();
    const ua = navigator.userAgent;
    this.onWindowScroll();
    console.log(ua);

    // Verificar si estamos en un entorno del navegador (donde window existe)
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      console.log(ua);

      // Detectar si la ventana tiene un tamaño similar al de un móvil
      if (window.innerWidth <= 768) {
        this.isMobile = true;
        console.log('El navegador está en un tamaño de móvil');
      } else {
        this.isMobile = false;
        console.log('El navegador está en un tamaño de escritorio');
      }

      // Detectar si el navegador es Chrome
      if (/Chrome/i.test(ua)) {
        console.log('Navegador Chrome detectado');
      } else {
        console.log('Navegador no es Chrome');
      }

      // Escuchar cambios en el tamaño de la ventana
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
          this.isMobile = true;
          console.log('El navegador ahora está en un tamaño de móvil');
        } else {
          this.isMobile = false;
          console.log('El navegador ahora está en un tamaño de escritorio');
        }
      });
    } else {
      console.log('No se está ejecutando en un navegador');
    }
  }
  // Detecta el scroll del usuario
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      const scrollPosition =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isScrolled = scrollPosition > 10;
    }
  }

  showDialog() {
    this.sidebarVisible = true;
  }
  updateMenuItems() {
    if (this.isLoggedIn) {
      // If the user is logged in
      this.items = [
        {
          label: 'User Settings',
          icon: 'pi pi-cog',
          command: () => this.goToSettings(),
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        },
      ];
    } else {
      // If the user is not logged in
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

  goToLogin() {
    // Navigate to login page
    console.log('Navigating to login page');
  }

  goToRegister() {
    // Navigate to register page
    console.log('Navigating to register page');
  }

  goToSettings() {
    // Navigate to user settings page
    console.log('Navigating to settings page');
  }

  logout() {
    // Perform logout logic
    console.log('Logging out');
    this.isLoggedIn = false;
    this.updateMenuItems(); // Update menu after logout
  }

  redirectTo(route: string): void {
    this.sidebarVisible = false;
    // this.sidebarVisible2 = !this.sidebarVisible2
    console.log(route);
    if (route === 'Sign-in') {
      this.router.navigate(['/auth', route]); // Navegación hacia la página de inicio de sesión
    } else if (route === 'Sign-up') {
      this.router.navigate(['/auth', route]); // Navegación hacia la página de inicio de sesión
    } else if (route === 'Activar-cuenta') {
      this.router.navigate(['/auth', route]); // Navegación hacia la página de inicio de sesión
    } else {
      console.log('click', route);
      this.router.navigate(['/public', route]); // Navegación hacia otras páginas públicas
    }
  }
}
