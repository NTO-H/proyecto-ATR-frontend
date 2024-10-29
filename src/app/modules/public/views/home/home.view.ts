import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css', '../../../../shared/styles/categoriesNav.scss','../../../../shared/styles/styles.scss'],
})
export class HomeView implements OnInit {
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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init(); // Inicializa AOS solo si está en el navegador
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
