import { Component } from '@angular/core';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.view.html',
  styleUrl: './details-product.view.scss'
})
export class DetailsProductView {
  isLoading: boolean = true;
  images: string[] = [];
  productName: string = '';
  productPrice: string = '';
  productDescription: string = '';
  selectedColor: string = '';
  selectedSize: string = '';
  sizes: any[] = [];

  ngOnInit() {
    // Simular la carga de datos (puedes reemplazar con una llamada real a API)
    setTimeout(() => {
      this.isLoading = false; // Simular que los datos están listos
      this.images = [ /* Lista de URLs de imágenes */ ];
      this.productName = 'Tenis Urbanos Adidas IH5426 para Mujer';
      this.productPrice = '$1255 MXN';
      this.productDescription = 'Renueva tu look urbano...';
      this.sizes = [
        { label: '23', value: '23' },
        { label: '24', value: '24' },
        // Más tallas...
      ];
    }, 3000);
  }
}
