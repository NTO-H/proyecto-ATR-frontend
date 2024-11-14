import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductoService } from '../../../../shared/services/producto.service';
import { Producto } from '../../../../shared/models/Producto.model';

@Component({
  selector: 'app-registo-producto',
  templateUrl: './registo-producto.component.html',
  styleUrls: ['./registo-producto.component.scss'],
})
export class RegistoProductoComponent implements OnInit {
  productoForm: FormGroup;

  imagenPrincipal: File | null = null; // Inicializa con null
  imagenesAdicionales: File[] = []; // Inicializa como un array vacío

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      imagenPrincipal: [''], // Aquí sigue siendo un string
      otrasImagenes: this.fb.array([]), // Inicializa el FormArray

      categoria: ['Ropa', [Validators.required]],
      color: ['', [Validators.required]],
      textura: [''],
      talla: ['', [Validators.required]],
      medida: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      disponible: [true],
      tipoVenta: ['Venta', [Validators.required]],
      nuevo: [true],
      descripcion: [''],
    });
  }

  ngOnInit(): void {}

  get otrasImagenes(): FormArray {
    return this.productoForm.get('otrasImagenes') as FormArray;
  }

  onImagePrincipalChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Convertir a string y asignar
        this.productoForm.patchValue({
          imagenPrincipal: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }




  

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.imagenPrincipal = inputElement.files[0];
      const file = inputElement.files[0];

      console.log(this.imagenPrincipal);
      const reader = new FileReader();

      reader.onload = () => {
        // Convertir a string y asignar
        this.productoForm.patchValue({
          imagenPrincipal: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  agregarImagen() {
    this.otrasImagenes.push(this.fb.control('')); // Añade un control vacío al FormArray
  } // Maneja la selección de imágenes adicionales
  otrasImagenesChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      // Guarda el archivo en el arreglo
      this.imagenesAdicionales[index] = file;

      console.log(
        `Nombre del archivo seleccionado para imagen adicional ${index + 1}: ${
          file.name
        }`
      );

      // Crea un FileReader para leer el contenido del archivo
      const reader = new FileReader();
      reader.onload = () => {
        this.otrasImagenes.at(index).setValue(reader.result as string); // Almacena la URL en el FormArray

        // console.log(`Preview de la imagen ${index + 1}:`, this.imagenesAdicionalesPreview[index]);
      };
      reader.readAsDataURL(file);

      // Mostrar el contenido actual del arreglo imagenesAdicionales
      console.log(
        'Contenido actual de imagenesAdicionales:',
        this.imagenesAdicionales
      );
    }
  }

  // // Maneja la selección de imágenes adicionales
  // otrasImagenesChange(event: Event, index: number): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     const file = inputElement.files[0];

  //     // Agregar el archivo al array de imágenes adicionales
  //     this.imagenesAdicionales[index] = file; // Almacena el archivo en el índice correspondiente del array

  //     console.log(
  //       `Archivo seleccionado para imagen adicional ${index + 1}:`,
  //       file
  //     );

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       // Convertir a string y asignar al FormArray
  //       this.otrasImagenes.at(index).setValue(reader.result as string); // Almacena la URL en el FormArray

  //       // Mostrar el contenido completo del FormArray
  //       console.log('Contenido actual de otrasImagenes:');
  //       this.otrasImagenes.controls.forEach((control, idx) => {
  //         console.log(`Imagen adicional ${idx + 1}:`, control.value);
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // } // Método para agregar el producto
  onAgregarProducto() {
    const productoNombre = this.productoForm.get('nombre')?.value;
    const productoCategoria = this.productoForm.get('categoria')?.value;
    const productoPrecio = this.productoForm.get('precio')?.value;
    const productoDescripcion = this.productoForm.get('descripcion')?.value;
  
    // Verificar si se ha seleccionado una imagen principal
    if (!this.imagenPrincipal) {
      console.error('No se ha seleccionado ningún archivo para la imagen principal.');
      return;
    } else {
      console.log('Imagen principal seleccionada:', this.imagenPrincipal);
    }
  
    // Crear un objeto FormData y agregar los campos necesarios
    const formData = new FormData();
    formData.append('nombre', productoNombre);
    formData.append('categoria', productoCategoria);
    formData.append('precio', productoPrecio);
    formData.append('descripcion', productoDescripcion);
  
    // Agregar la imagen principal al FormData
    formData.append('imagenPrincipal', this.imagenPrincipal); // El nombre debe coincidir con el esperado en el backend
  
    // Verificar y agregar las imágenes adicionales al FormData
    if (this.imagenesAdicionales && this.imagenesAdicionales.length > 0) {
      this.imagenesAdicionales.forEach((imagen, index) => {
        formData.append(`otrasImagenes`, imagen); // Ajusta el nombre según lo que el backend espera
      });
    }
  
    // Mostrar el contenido de FormData (solo para depuración; los archivos no se imprimen directamente)
    console.log('Contenido del FormData:');
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}: Archivo - ${value.name}`);
      } else {
        console.log(`${key}:`, value);
      }
    });
  
    // Enviar el FormData al servicio del backend
    this.productoService.crearProducto(formData).subscribe(
      (response) => {
        console.log('Producto creado exitosamente:', response);
      },
      (err) => {
        console.error('Error al crear el producto:', err);
        // Swal.fire('Error', 'Hubo un error al agregar el producto.', 'error');
      }
    );
  }
  
}  