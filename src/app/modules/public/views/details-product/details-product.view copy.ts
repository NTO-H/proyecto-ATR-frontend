import { Component } from '@angular/core';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.view.html',
  styleUrls: ['./details-product.view.scss','./info.scss']
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
   // Imagen principal del producto
   mainImage: string = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg';

   // Lista de imágenes en miniatura
   thumbnailImages: string[] = [
     'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726505353/images-AR/oaefwpo5njza8ytxfpzz.png',
     'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730406784/images-AR/umiisnokywuzr8eq9ivc.jpg',
     'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730406784/images-AR/izxgnvwphgdb8gfvdhup.jpg'
   ];
 
   // Cambia la imagen principal cuando se hace clic en una miniatura
   changeMainImage(image: string) {
     this.mainImage = image;
   }
}
