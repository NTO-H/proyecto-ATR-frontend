import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrl: './home.view.css',
})
export class HomeView {
  constructor(private router: Router) {}
  productos = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripción del producto 1',
      precio: 100,
      imagen:
        'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg',
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 200,
      imagen:
        'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726505353/images-AR/oaefwpo5njza8ytxfpzz.png',
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 200,
      imagen:
        'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg',
    },
    {
      id: 2,
      nombre: 'Producto 2',
      descripcion: 'Descripción del producto 2',
      precio: 200,
      imagen:
        'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726505353/images-AR/oaefwpo5njza8ytxfpzz.png',
    },

    // Agrega más productos aquí
  ];

  verDetalles() {
    // alert('mostrar');
    this.router.navigate(['/public/Detail']); // Navegación hacia otras páginas públicas
  }

  redirectTo(route: string): void {
    // this.sidebarVisible2 = !this.sidebarVisible2
    console.log(route);
    if (route === 'login') {
      this.router.navigate(['/auth/login']); // Navegación hacia la página de inicio de sesión
    } else {
      console.log('click', route);
      this.router.navigate(['/public', route]); // Navegación hacia otras páginas públicas
    }
  }
}
