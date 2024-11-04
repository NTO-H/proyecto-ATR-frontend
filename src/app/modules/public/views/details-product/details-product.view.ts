import { Component } from '@angular/core';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.view.html',
  styleUrls: ['./details-product.view.scss', './info.scss','./carrucel.scss']
})
export class DetailsProductView {
  isLoading: boolean = true;
  images: any[] = [];  // Change to any[] to hold the required data
  productName: string = '';
  productPrice: string = '';
  productDescription: string = '';
  selectedImageIndex: number = 0; // Track the current index for the Galleria
  sizes: any[] = [];
  selectedColor: string = '';
  selectedSize: string = '';
  // sizes: any[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
      this.images = [
        { itemImageSrc: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726505353/images-AR/oaefwpo5njza8ytxfpzz.png' },
        { itemImageSrc: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730406784/images-AR/umiisnokywuzr8eq9ivc.jpg' },
        { itemImageSrc: 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730406784/images-AR/izxgnvwphgdb8gfvdhup.jpg' }
      ];
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
  // selectedImageIndex = 0; // Índice inicial de la imagen

  prevImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }
  
  nextImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex + 1) % this.images.length;
  }
  
  onImageChange(event: any) {
    this.selectedImageIndex = event.index;
  }
  
   // Imagen principal del producto
   mainImage: string = 'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg';

   // Lista de imágenes en miniatura
   thumbnailImages: string[] = [
     'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726505353/images-AR/oaefwpo5njza8ytxfpzz.png',
     'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730406784/images-AR/umiisnokywuzr8eq9ivc.jpg',
     'https://res.cloudinary.com/dvvhnrvav/image/upload/v1730406784/images-AR/izxgnvwphgdb8gfvdhup.jpg'
   ];
   changeMainImage(image: string) {
    this.mainImage = image;
  }
}
