import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css', '../../../../shared/styles/categoriesNav.scss','../../../../shared/styles/styles.scss'],
})
export class HomeView implements OnInit {
  isMobile: boolean = false;

  productos = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 100,
      imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg',
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 200,
      imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726505353/images-AR/oaefwpo5njza8ytxfpzz.png',
    },
    {
      id: 3,
      nombre: 'Producto 3',
      descripcion: 'Descripción del producto 3',
      precio: 150,
      imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg',
    },
    {
      id: 4,
      nombre: 'Producto 4',
      descripcion: 'Descripción del producto 4',
      precio: 250,
      imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726505353/images-AR/oaefwpo5njza8ytxfpzz.png',
    },
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768; // Determina si es móvil o escritorio
      this.applyHeroImageVisibility();
      console.log(this.isMobile ? 'Modo móvil' : 'Modo escritorio');
    }
  }
  applyHeroImageVisibility() {
    const heroImageElement = document.querySelector('.hero-img');
    if (heroImageElement) {
      if (this.isMobile) {
        heroImageElement.classList.add('hide-hero-img'); // Oculta en móviles
      } else {
        heroImageElement.classList.remove('hide-hero-img'); // Muestra en pantallas grandes
      }
    }
  }
  private detectDevice() {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      console.log(ua);
      this.isMobile = window.innerWidth <= 600;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.detectDevice();
  }


  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // Inicializa AOS solo si está en el navegador
    }
    this.detectDevice();
  

  

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
        if (window.innerWidth <= 600) {
          this.isMobile = true;
          console.log('El navegador ahora está en un tamaño de móvil');
        } else {
          this.isMobile = false;
          console.log('El navegador ahora está en un tamaño de escritorio');
        }
      });
    } else {
      this.isMobile = false;

      console.log('No se está ejecutando en un navegador');
    }
  }

  verDetalles() {
    this.router.navigate(['/public/Detail']);
  }

  redirectTo(route: string): void {
    console.log(route);
    if (route === 'login') {
      this.router.navigate(['/auth/login']);
    } else {
      console.log('click', route);
      this.router.navigate(['/public', route]);
    }
  }

  agregarProducto() {
    const nuevoProducto = {
      id: 5,
      nombre: 'Producto 5',
      descripcion: 'Descripción del producto 5',
      precio: 300,
      imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg',
    };
    this.productos.push(nuevoProducto);
    if (isPlatformBrowser(this.platformId)) {
      AOS.refresh(); // Refresca AOS solo si está en el navegador
    }
  }
}
