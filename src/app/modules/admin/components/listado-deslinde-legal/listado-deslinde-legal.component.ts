import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  listaDeslindeLegal: any[] = []; // Almacena la lista de términos
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
    this.controlAdministrativaService.obtenerDeslindeLegal().subscribe({
      next: (response: any[]) => {
        console.log(response);
        this.listaDeslindeLegal = response; // Almacena la lista en `listaDeslindeLegal`
      },
      error: (error) => {
        console.error('Error al cargar historial:', error);
      },
    });
  }

  editarTermino(termino: any) {
    this.deslindeLegalAEditar = { ...termino }; // Copia el término a editar
    this.id = termino._id; // Guarda el ID del término para la actualización
  }

  noSpecialCharacters(control: any) {
    // Permite solo letras, números y espacios. No permite <, >, =, y otros caracteres especiales
    const regex = /^[^<>=]*$/; // No permite los caracteres <, >, =
    const valid = regex.test(control.value);
    return valid ? null : { invalidCharacters: true }; // Retorna un error si hay caracteres inválidos
  }

  actualizarDeslindeLegal() {
    if (this.deslindeLegalAEditar) {
      const selectedDate = new Date(this.deslindeLegalAEditar.fechaVigencia);
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

      // Validar contenido antes de enviar
      if (this.noSpecialCharacters({ value: this.deslindeLegalAEditar.contenido })) {
        Swal.fire(
          'Error',
          'El contenido no debe contener caracteres <, > o =.',
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
