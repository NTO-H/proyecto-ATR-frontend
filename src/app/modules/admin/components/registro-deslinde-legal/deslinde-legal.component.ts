import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-deslinde-legal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deslinde-legal.component.html',
  styleUrls: ['./deslinde-legal.component.scss'],
})
export class DeslindeLegalComponent {
  nuevoDeslindeLegal = {
    titulo: '',
    contenido: '',
    fechaVigencia: this.getCurrentDate(), // Inicializa con la fecha actual
  };

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {}

  // Método para obtener la fecha actual en formato YYYY-MM-DD
  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  isValidTitleLength(title: string): boolean {
    return title.length >= 5 && title.length <= 30; // Verifica la longitud
  }

  isValidTitleCharacters(title: string): boolean {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    return regex.test(title); // Verifica caracteres permitidos
  }

  isValidContentLength(content: string): boolean {
    return content.length >= 30 && content.length <= 300; // Verifica la longitud
  }

  isValidContentCharacters(content: string): boolean {
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,;:()]*$/; // Permite letras, números y algunos caracteres especiales
    return regex.test(content); // Verifica caracteres permitidos
  }

  onSubmit(form: NgForm) {
    const fechaVigencia = this.nuevoDeslindeLegal.fechaVigencia;
    const [year, month, day] = fechaVigencia.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validación de la fecha
    if (selectedDate < today) {
      Swal.fire(
        'Error',
        'La fecha de vigencia no puede ser la fecha de hoy ni una pasada.',
        'error'
      );
      return;
    }

    // Inicializar un array para almacenar mensajes de error
    const errorMessages: string[] = [];

    // Validaciones de título
    if (!this.isValidTitleLength(this.nuevoDeslindeLegal.titulo)) {
      errorMessages.push('El título debe tener entre 5 y 30 caracteres.');
    }

    if (!this.isValidTitleCharacters(this.nuevoDeslindeLegal.titulo)) {
      errorMessages.push('El título no debe contener caracteres especiales.');
    }

    // Validaciones de contenido
    if (!this.isValidContentLength(this.nuevoDeslindeLegal.contenido)) {
      errorMessages.push('El contenido debe tener entre 30 y 300 caracteres.');
    }

    if (!this.isValidContentCharacters(this.nuevoDeslindeLegal.contenido)) {
      errorMessages.push(
        'El contenido no debe contener caracteres especiales.'
      );
    }

    // Si hay errores, mostrar todos los mensajes
    if (errorMessages.length > 0) {
      Swal.fire('Errores de validación', errorMessages.join('<br>'), 'error');
      return;
    }

    // Registro del Deslinde Legal si todas las validaciones son correctas
    this.controlAdministrativaService
      .registerDeslindeLegal(this.nuevoDeslindeLegal)
      .subscribe(
        (response) => {
          Swal.fire(
            'Deslinde Legal registrado',
            'El Deslinde Legal se ha registrado correctamente.',
            'success'
          );

          // Reiniciar el formulario
          this.nuevoDeslindeLegal = {
            titulo: '',
            contenido: '',
            fechaVigencia: this.getCurrentDate(),
          };
          form.resetForm(); // Resetea el formulario
          this.router.navigate(['/admin/configuracion/listado-legal']);
        },
        (error) => {
          Swal.fire(
            'Error',
            'Error al registrar el Deslinde Legal, por favor intente otra vez',
            'error'
          );
          console.error(':', error);
        }
      );
  }
}
