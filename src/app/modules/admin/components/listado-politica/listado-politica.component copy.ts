import { Component, OnInit } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { Politica } from '../../../../shared/models/politica.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-politica',
  templateUrl: './listado-politica.component.html',
  styleUrls: ['./listado-politica.component.scss'], // Asegúrate de que sea styleUrls
})
export class ListadoPoliticaComponent implements OnInit {
  politicas: Politica[] = []; // Inicializa como un arreglo vacío
  politicaAEditar = {
    _id: '',
    titulo: '',
    contenido: '',
    fechaVigencia: this.getCurrentDate(),
  };
  isEditing: boolean = false;
  isLoading: boolean = false; // Estado de carga
  errorMessage: string | null = null;

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {}

  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses en JS son 0-indexados
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }
  ngOnInit(): void {
    this.obtenerPoliticas(); // Cargar políticas al iniciar el componente
  }

  obtenerPoliticas() {
    this.isLoading = true; // Activar estado de carga
    this.controlAdministrativaService.obtenerPoliticas().subscribe(
      (data: Politica[]) => {
        this.politicas = data; // Guarda los datos en la variable
        console.table(this.politicas); // Mostrar datos en consola
        this.isLoading = false; // Desactivar estado de carga
      },
      (error) => {
        this.isLoading = false; // Desactivar estado de carga
        this.errorMessage = 'Error al obtener políticas. Inténtalo más tarde.'; // Mensaje de error
        console.error('Error al obtener políticas:', error);
      }
    );
  }

  cancelarEdicion() {
    this.isEditing = false; // Desactivamos la edición
    this.politicaAEditar = {
      _id: '',
      titulo: '',
      contenido: '',
      fechaVigencia: this.getCurrentDate(),
    };
  }

  actualizarPolitica() {
    
    if (!this.politicaAEditar) return; // Verificar si hay una política a editar

    this.controlAdministrativaService
      .actualizarPoliticas(this.politicaAEditar._id, this.politicaAEditar)
      .subscribe(
        (response) => {
          console.log('Política actualizada:', response);
          this.obtenerPoliticas(); // Recargar la lista después de actualizar
          this.isEditing = false; // Desactivamos el modo edición
          this.politicaAEditar = {
            _id: '',
            titulo: '',
            contenido: '',
            fechaVigencia: this.getCurrentDate(),
          };
          Swal.fire(
            'Actualización exitosa',
            'La política ha sido actualizada.',
            'success'
          ); // Mensaje de éxito
        },
        (error) => {
          this.errorMessage =
            'Error al actualizar política. Inténtalo más tarde.'; // Mensaje de error
          console.error('Error al actualizar política:', error);
          Swal.fire(
            'Error',
            'No se pudo actualizar la política. Inténtalo más tarde.',
            'error'
          ); // Mensaje de error con SweetAlert
        }
      );
  }

  editarPolitica(doc: Politica) {
    this.politicaAEditar = { ...doc }; // Copiar los datos de la política seleccionada
    this.isEditing = true; // Cambiar el estado a editar
  }

  eliminarPolitica(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.controlAdministrativaService.eliminarPolitica(id).subscribe(
          (response) => {
            console.log('Política eliminada:', response);
            Swal.fire(
              'Eliminada',
              'La política ha sido eliminada correctamente.',
              'success'
            );
            this.obtenerPoliticas(); // Recargar la lista después de eliminar
          },
          (error) => {
            console.error('Error al eliminar política:', error);
            Swal.fire(
              'Error',
              'No se pudo eliminar la política. Inténtalo más tarde.',
              'error'
            ); // Mensaje de error con SweetAlert
          }
        );
      }
    });
  }
  verHistorial(id: string) {
    this.router.navigate(['/admin/politicas/historial-listado-politica/', id]);
  }
}
