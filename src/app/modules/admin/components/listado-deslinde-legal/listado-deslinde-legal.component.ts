import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-listado-deslinde-legal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './listado-deslinde-legal.component.html',
  styleUrls: ['./listado-deslinde-legal.component.scss'],
})
export class ListadoDeslindeLegalComponent {
  deslindeLegalAEditar: any = {
    titulo: '',
    contenido: '',
    fechaVigencia: this.getCurrentDate(),
  };
  listaDeslindeLegal: any = [];
  id = '';

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {
    this.cargarTerminos(); // Carga la lista de términos al iniciar la aplicación
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
    this.controlAdministrativaService.obtenerDeslindeLegal().subscribe(
      (response) => {
        console.log(response);
        this.listaDeslindeLegal = response.sort(
          (a: { version: string }, b: { version: string }) => {
            return Number(b.version) - Number(a.version); // Convierte 'version' a número y realiza la comparación
          }
        );
        console.log(this.listaDeslindeLegal);
      },
      (error) => {
        console.error('Error al cargar historial:', error);
      }
    );
  }

  editarTermino(termino: any) {
    this.deslindeLegalAEditar = { ...termino }; // Copia el término a editar
    const fechaFormateada = new Date(this.deslindeLegalAEditar.fechaVigencia)
      .toISOString()
      .split('T')[0];
    this.deslindeLegalAEditar.fechaVigencia = fechaFormateada;
    this.id = termino._id; // Guarda el ID del término para la actualización
  }

  noSpecialCharacters(control: any): ValidationErrors | null {
    // Expresión regular para validar caracteres especiales
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;

    // Si el valor está vacío, no validamos nada (otro validador lo maneja)
    if (!control.value) {
      return null;
    }

    const valid = regex.test(control.value);
    return valid ? null : { invalidCharacters: true }; // Retorna un error si hay caracteres inválidos
  }

  isValidTitle(title: string): boolean {
    // Expresión regular para validar solo letras y espacios
    const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(title);
  }

  actualizarDeslindeLegal() {
    if (this.deslindeLegalAEditar) {
      const fechaVigencia = this.deslindeLegalAEditar.fechaVigencia;
      const [year, month, day] = fechaVigencia.split('-').map(Number);
      const selectedDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      console.log(fechaVigencia);
      console.log(today);
      if (selectedDate < today) {
        Swal.fire(
          'Error',
          'La fecha de vigencia no puede ser una fecha pasada.',
          'error'
        );
        return;
      }

      // Validar título y contenido antes de enviar
      if (
        !this.isValidTitle(this.deslindeLegalAEditar.titulo) ||
        this.noSpecialCharacters({ value: this.deslindeLegalAEditar.contenido })
      ) {
        Swal.fire(
          'Error',
          'El título solo debe contener letras, números y espacios. El contenido no debe contener caracteres <, > o =.',
          'error'
        );
        return;
      }

      this.controlAdministrativaService
        .actualizarDeslindeLegal(this.id, this.deslindeLegalAEditar)
        .subscribe({
          next: (response) => {
            this.cargarTerminos();
            this.deslindeLegalAEditar = {
              titulo: '',
              contenido: '',
              fechaVigencia: this.getCurrentDate(),
            }; // Limpia el formulario
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
    this.deslindeLegalAEditar = {
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
      '/admin/configuracion/historial-deslinde-legal/' + id,
    ]);
  }
}
