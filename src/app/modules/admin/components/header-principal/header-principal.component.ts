import { Component } from '@angular/core';

@Component({
  selector: 'app-header-principal',
  templateUrl: './header-principal.component.html',
  styleUrl: './header-principal.component.scss'
})
export class HeaderPrincipalComponent {
  isLoggedIn = !!localStorage.getItem('token'); // Verificar si el token existe
  menuOpen = false;
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  logout() {
    localStorage.removeItem('token');
    this.menuOpen = false;
    // Redirigir al usuario o realizar acciones posteriores al logout
  }
  
}
