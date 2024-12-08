import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrl: './header-principal.component.scss',
})
export class HeaderPrincipalComponent {
  isLoggedIn = false; // Inicializa como falso
  
  // isLoggedIn = !!localStorage.getItem('token'); // Verificar si el token existe
  menuOpen = false;

  // constructor(private router:Router){}
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    // Verifica si estamos en el navegador y actualiza `isLoggedIn`
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.removeItem('token');
    this.menuOpen = false;
    this.router.navigate(['/public/home']);

    // Redirigir al usuario o realizar acciones posteriores al logout
  }
}
