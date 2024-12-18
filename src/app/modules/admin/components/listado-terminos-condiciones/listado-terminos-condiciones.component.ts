import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidationErrors } from '@angular/forms';
import { Termino } from './../../../../shared/interfaces/terminosYCondiciones';

@Component({
  selector: 'app-listado-terminos-condiciones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listado-terminos-condiciones.component.html',
  styleUrls: ['./listado-terminos-condiciones.component.scss'],
})
export class ListadoTerminosCondicionesComponent {
  terminoAEditar: any = {
    titulo: '',
    contenido: '',
    fechaVigencia: this.getCurrentDate(),
  };
  historialTerminos: Termino[] = [];
  id = '';

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {
    this.cargarTerminos();
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  cargarTerminos() {
    this.controlAdministrativaService.obtenerTerminosYCondiciones().subscribe({
      next: (response: Termino[]) => {
        this.historialTerminos = response.sort(
          (a, b) => Number(b.version) - Number(a.version)
        );
      },
      error: (error) => {
        console.error('Error al cargar historial:', error);
      },
    });
  }

  editarTermino(termino: Termino) {
    this.terminoAEditar = { ...termino };
    const fechaFormateada = new Date(this.terminoAEditar.fechaVigencia)
      .toISOString()
      .split('T')[0];
    this.terminoAEditar.fechaVigencia = fechaFormateada;
    this.id = termino._id;
  }

  noSpecialCharacters(control: any): ValidationErrors | null {
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,\s]*$/;
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    return valid ? null : { invalidCharacters: true };
  }

  isValidTitle(title: string): boolean {
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ.,\s]*$/;
    return regex.test(title) && title.length >= 5 && title.length <= 100; // Longitud entre 5 y 100 caracteres
  }

  isValidContent(content: string): boolean {
    return content.length >= 20 && content.length <= 500; // Longitud entre 20 y 500 caracteres
  }

  actualizarTermino() {
    if (this.terminoAEditar) {
      const fechaVigencia = this.terminoAEditar.fechaVigencia;
      const [year, month, day] = fechaVigencia.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        Swal.fire(
          'Error',
          'La fecha de vigencia no puede ser una fecha pasada.',
          'error'
        );
        return;
      }

      if (
        !this.isValidTitle(this.terminoAEditar.titulo) ||
        !this.isValidContent(this.terminoAEditar.contenido) ||
        this.noSpecialCharacters({ value: this.terminoAEditar.contenido })?.[
          'invalidCharacters'
        ]
      ) {
        Swal.fire(
          'Error',
          'El título debe tener entre 5 y 100 caracteres y solo debe contener letras, números y espacios. El contenido debe tener entre 20 y 500 caracteres y no debe contener caracteres <, > o =.',
          'error'
        );
        return;
      }

      this.controlAdministrativaService
        .actualizarTerminosYCondiciones(this.id, this.terminoAEditar)
        .subscribe({
          next: (response) => {
            this.cargarTerminos();
            this.terminoAEditar = {
              titulo: '',
              contenido: '',
              fechaVigencia: this.getCurrentDate(),
            };
            Swal.fire(
              'Actualización exitosa',
              'El término y condición se ha actualizado correctamente.',
              'success'
            );
          },
          error: (error) => {
            console.error('Error al actualizar término:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al actualizar el término.',
              'error'
            );
          },
        });
    }
  }

  cancelarEdicion() {
    this.terminoAEditar = {
      titulo: '',
      contenido: '',
      fechaVigencia: this.getCurrentDate(),
    };
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
