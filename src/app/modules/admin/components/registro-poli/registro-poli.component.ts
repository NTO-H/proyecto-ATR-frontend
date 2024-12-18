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
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;
    return regex.test(title) && title.length <= 30;
  }

  noSpecialCharacters(control: any): ValidationErrors | null {
    const regex = /^(?!.*<script>)[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]*$/;

    if (!control.value) {
      return null;
    }

    const valid = regex.test(control.value);
    return valid ? null : { invalidCharacters: true };
  }

  validateTitle() {
    this.noSpecialCharacters({ value: this.nuevaPolitica.titulo });
  }

  validateContent() {
    this.noSpecialCharacters({ value: this.nuevaPolitica.contenido });
  }

  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  onSubmit() {
    const fechaVigencia = this.nuevaPolitica.fechaVigencia;
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
