import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registo-politica',
  templateUrl: './registo-politica.component.html',
  styleUrls: ['./registo-politica.component.scss'],
})
export class RegistoPoliticaComponent implements OnInit {
  nuevaPoliticaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nuevaPoliticaForm = this.fb.group({
      titulo: ['', Validators.required, this.noSpecialCharacters],
      contenido: ['', [Validators.required, this.noSpecialCharacters]],
      fechaVigencia: [this.getCurrentDate(), Validators.required],
    });
  }

  noSpecialCharacters(control: any): ValidationErrors | null {
    // Expresión regular combinada
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;

    // Si el valor está vacío, no validamos nada (otro validador lo maneja)
    if (!control.value) {
      return null;
    }

    const valid = regex.test(control.value);
    return valid ? null : { invalidCharacters: true }; // Retorna un error si hay caracteres inválidos
  }

  // Método para obtener la fecha actual en formato YYYY-MM-DD
  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses en JS son 0-indexados
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }

  onSubmit() {
    const selectedDate = new Date(this.nuevaPoliticaForm.value.fechaVigencia);
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

    if (this.nuevaPoliticaForm.valid) {
      this.controlAdministrativaService
        .registerPolitica(this.nuevaPoliticaForm.value)
        .subscribe(
          (response) => {
            console.log(this.nuevaPoliticaForm.value);
            Swal.fire(
              'Política registrada',
              'La política se ha registrado correctamente.',
              'success'
            );

            this.nuevaPoliticaForm.reset({
              fechaVigencia: this.getCurrentDate(),
            });
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
}
