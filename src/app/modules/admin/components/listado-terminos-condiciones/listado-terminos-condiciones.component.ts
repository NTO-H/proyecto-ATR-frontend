import { Router } from '@angular/router';
import { Termino } from './../../../../shared/interfaces/terminosYCondiciones';
import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-terminos-condiciones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listado-terminos-condiciones.component.html',
  styleUrl: './listado-terminos-condiciones.component.scss',
})
export class ListadoTerminosCondicionesComponent {
  historialTerminos: Termino[] = []; // Tipado adecuado
  terminoAEditar: Termino | null = null;

  id = '';

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {
    this.cargarTerminos();
  }

  // Método para obtener la fecha actual en formato YYYY-MM-DD
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses en JS son 0-indexados
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }

  cargarTerminos() {
    this.controlAdministrativaService.obtenerTerminosYCondiciones().subscribe({
      next: (response: Termino[]) => {
        this.historialTerminos = response.sort((a, b) => Number(b.version) - Number(a.version));
        console.log(this.historialTerminos);
      },
      error: (error) => {
        console.error('Error al cargar historial:', error);
      },
    });
  }

  editarTermino(termino: Termino) {
    this.terminoAEditar = { ...termino }; // Copia el término a editar
    const fechaFormateada = new Date(this.terminoAEditar.fechaVigencia)
      .toISOString()
      .split('T')[0];
    this.terminoAEditar.fechaVigencia = fechaFormateada;
    this.id = termino._id; // Guarda el ID del término para la actualización
  }

  actualizarTermino() {
    if (this.terminoAEditar) {
      const selectedDate = new Date(this.terminoAEditar.fechaVigencia);
      const today = new Date();
      const minimumDate = new Date();
      minimumDate.setDate(today.getDate() + 3);

      if (selectedDate < today) {
        Swal.fire(
          'Error',
          'La fecha de vigencia no puede ser una fecha pasada.',
          'error'
        );
        return;
      }

      if (selectedDate < minimumDate) {
        Swal.fire(
          'Error',
          'La fecha de vigencia debe ser al menos 3 días a partir de hoy.',
          'error'
        );
        return;
      }

      this.controlAdministrativaService
        .actualizarTerminosYCondiciones(this.id, this.terminoAEditar)
        .subscribe(
          (response) => {
            this.cargarTerminos();
            this.terminoAEditar = null; // Limpia el formulario
            Swal.fire(
              'Actualización exitosa',
              'El término y condición se ha actualizado correctamente.',
              'success'
            );
          },
          (error) => {
            console.error('Error al actualizar término:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar el término.',
              'error'
            );
          }
        );
    }
  }

  cancelarEdicion() {
    this.terminoAEditar = null;
  }

  eliminarTermino(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4caf50',
      cancelButtonColor: '#d81b60',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.controlAdministrativaService
          .eliminarTerminosYCondiciones(id)
          .subscribe({
            next: (response) => {
              this.cargarTerminos();
              Swal.fire(
                'Eliminado',
                'El término y condición se ha eliminado correctamente.',
                'success'
              );
            },
            error: (error) => {
              console.error('Error al eliminar término:', error);
              Swal.fire(
                'Error',
                'Hubo un problema al eliminar el término.',
                'error'
              );
            },
          });
      }
    });
  }

  verHistorial(id: string) {
    this.router.navigate([
      '/admin/configuracion/historial-terminos-condiciones',
      id,
    ]);
  }
}
