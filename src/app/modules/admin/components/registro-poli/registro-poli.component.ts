import { Component, OnInit } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registo-politica',
  templateUrl: './registro-poli.component.html',
  styleUrls: ['./registro-poli.component.scss'],
})
export class RegistroPoliComponent implements OnInit {
  nuevaPolitica = {
    titulo: '',
    contenido: '',
    fechaVigencia: this.getCurrentDate(),
  };

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {}

  ngOnInit() {}

  isValidTitle(title: string): boolean {
    // Expresión regular para validar solo letras y espacios
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;
    return regex.test(title) && title.length <= 30; // Verifica que no haya números y que tenga máximo 30 caracteres
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

  validateTitle() {
    if (!this.noSpecialCharacters(this.nuevaPolitica.titulo)) {
      // Aquí puedes manejar el error
    }
  }

  validateContent() {
    if (!this.noSpecialCharacters(this.nuevaPolitica.contenido)) {
      // Aquí puedes manejar el error
    }
  }

  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }

  onSubmit() {
    const selectedDate = new Date(this.nuevaPolitica.fechaVigencia);
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
      .registerPolitica(this.nuevaPolitica)
      .subscribe(
        (response) => {
          Swal.fire(
            'Política registrada',
            'La política se ha registrado correctamente.',
            'success'
          );

          this.nuevaPolitica = {
            titulo: '',
            contenido: '',
            fechaVigencia: this.getCurrentDate(),
          };
          this.router.navigate(['admin/configuracion/listado-politica']);
        },
        (error) => {
          Swal.fire(
            'Error',
            'Error al registrar la política, por favor intente otra vez',
            'error'
          );
          console.error(':', error);
        }
      );
  }
}
