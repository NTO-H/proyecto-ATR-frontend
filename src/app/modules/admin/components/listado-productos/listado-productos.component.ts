import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../shared/services/producto.service';
import { Producto } from '../../../../shared/models/Producto.model';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: [
    '../../../../shared/styles/tablePrime.scss',
    '../../../../shared/styles/form.scss',
  ],
})
export class ListadoProductosComponent implements OnInit {
  allProducts: Producto[] = [];
  visible: boolean = false;
  totalRecords: number = 0;
  rows: number = 5; // Número de registros por página
  first: number = 0; // Índice del primer registro de la página actual
  paginatedUser: Producto[] = [];
  filterText: string = '';
  productForm!: FormGroup;
  idProducto!: string;

  constructor(private productoS: ProductoService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProductos();
  }

  getProductos() {
    this.productoS.obtenerProductos().subscribe(
      (response) => {
        this.allProducts = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  highlightText(text: string): string {
    if (!this.filterText) {
      return text; // Si no hay texto a filtrar, regresa el texto original.
    }

    const regex = new RegExp(`(${this.filterText})`, 'gi'); // Crea una expresión regular para encontrar el texto de búsqueda.
    return text.replace(regex, '<strong>$1</strong>'); // Reemplaza las coincidencias con el texto en negritas.
  }

  onGlobalFilter(event: Event) {
    // const value = event.target as HTMLInputElement;
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    if (value) {
      const filteredData = this.allProducts.filter(
        (c) =>
          c.nombre.toLowerCase().includes(value) ||
          c.categoria.toLowerCase().includes(value) ||
          c.color.toLowerCase().includes(value)
        // c.precio.toLowerCase().includes(value) ||
        // c.colonia.toLowerCase().includes(value)
      );

      this.totalRecords = filteredData.length;
      this.paginatedUser = filteredData.slice(
        this.first,
        this.first + this.rows
      );
    } else {
      this.totalRecords = this.allProducts.length;
      this.paginatedUser = this.allProducts.slice(
        this.first,
        this.first + this.rows
      );

      // this.dt2.filterGlobal(input.value, "contains");
    }
  }

  deleteProduct(id: any) {
    this.idProducto = id;

    $('.basic.test.modal')
      .modal({
        closable: false, // Evita cerrar haciendo clic fuera del modal
        onApprove: () => {
          // this.us.eliminarUsuario(id)
          this.confirmarEliminar(); // Ejecuta la confirmación cuando se aprueba
        },
      })
      .modal('show');
  }

  confirmarEliminar() {
    // this.usuarioId = id;
    this.productoS.eliminarProducto(this.idProducto).subscribe((response) => {
      Swal.fire(
        'Eliminado',
        'El producto se ha eliminado correctamente.',
        'success'
      );
      this.getProductos();
    });
    // console.log(`Usuario con ID ${this.usuarioId} eliminado.`);
    //
    // Aquí puedes llamar a tu servicio para eliminar el usuario
  }

  editProduct(id: any) {
    // this.visible = true;
    // this.idCliente = this.router.snapshot.params["id"];
    // if (id !== null) {
    //   console.log("actualizar....");
    //   this.UserS.detalleClienteById(id).subscribe((data) => {
    //     this.listUsuario = data;
    //     this.clienteForm.setValue({
    //       nombre: data.nombre,
    //       email: data.email,
    //       estatus: data.estatus,
    //       numCasa: data.numCasa,
    //       telefono: data.telefono,
    //       latitud: data.latitud,
    //       longitud: data.longitud,
    //     });
    //   });
    // }
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedUser();
  }

  updatePaginatedUser() {
    console.log();
    this.paginatedUser = this.allProducts.slice(
      this.first,
      this.first + this.rows
    );
  }
}
