import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrl: './home.view.css'
})
export class HomeView {

  productos = [
      { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto 1', precio: 100, imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg' },
      { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 200, imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg' },
      { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 200, imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg' },
      { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', precio: 200, imagen: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg' },
      
      // Agrega más productos aquí
    
  ];
}

