import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registo-politica',
  templateUrl: './registo-politica.component.html',
  styleUrls: ['./registo-politica.component.scss'],
})
export class RegistoPoliticaComponent {
  nuevaPolitica = {
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

    if (
      this.nuevaPolitica.titulo &&
      this.nuevaPolitica.contenido &&
      this.nuevaPolitica.fechaVigencia
    ) {
      this.controlAdministrativaService
        .registerPolitica(this.nuevaPolitica)
        .subscribe(
          (response) => {
            Swal.fire(
              'Política registrada',
              'La política se ha registrado correctamente.',
              'success'
            ); // Muestra una alerta con éxito

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
              'Error al registrar la política, porfavor intente otra ves',
              'error'
            );
            console.error(':', error);
          }
        );
    }
  }
}
