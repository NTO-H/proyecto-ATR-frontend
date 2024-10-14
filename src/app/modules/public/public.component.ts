import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
})
export class PublicComponent implements OnInit {
  title = 'frontend';
  isScrolled = false;

  visible: boolean = false;
  sidebarVisible: boolean = false;
  isMobile: boolean = false;

constructor(private router:Router){

}

  ngOnInit(): void {
    this.showDialog();
    const ua = navigator.userAgent;
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


  showDialog() {
    this.sidebarVisible =true;
  }
  // Detecta el scroll del usuario
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isScrolled = scrollPosition > 10;
  }
}
