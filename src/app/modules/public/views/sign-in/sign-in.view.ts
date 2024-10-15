import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.view.html',
  styleUrl: './sign-in.view.scss'
})
export class SignInView {



  constructor(private router:Router){

  }
  
  redirectTo(route: string): void {
    // this.sidebarVisible2 = !this.sidebarVisible2
    console.log(route)
    if (route === 'login') {
      this.router.navigate(['/auth/login']) // Navegación hacia la página de inicio de sesión
    } else {
      console.log("click",route)
      this.router.navigate(['/public', route]) // Navegación hacia otras páginas públicas
    }
  }


}
