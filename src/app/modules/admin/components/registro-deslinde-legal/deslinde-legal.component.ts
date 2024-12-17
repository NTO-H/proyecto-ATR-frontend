import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-deslinde-legal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deslinde-legal.component.html',
  styleUrls: ['./deslinde-legal.component.scss'], // Corregido `styleUrl` a `styleUrls`
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
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses en JS son 0-indexados
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Swal.fire(
        'Error',
        'Por favor completa todos los campos obligatorios.',
        'error'
      );
      return;
    }

    const selectedDate = new Date(this.nuevoDeslindeLegal.fechaVigencia);
    const today = new Date();
    const minimumDate = new Date();
    minimumDate.setDate(today.getDate() + 3);

    if (selectedDate < today) {
      Swal.fire(
        'Error',
        'La fecha de vigencia no puede ser la fecha de hoy ni una pasada.',
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
