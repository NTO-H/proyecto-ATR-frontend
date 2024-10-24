import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';

@Component({
  selector: 'app-registo-politica',
  templateUrl: './registo-politica.component.html',
  styleUrl: './registo-politica.component.scss',
})
export class RegistoPoliticaComponent {

  nuevaPolitica = {
    titulo: '',
    contenido: '',
  };
  
  constructor(
    private controlAdministrativaService: ControlAdministrativaService
  ) {}
  onSubmit() {
    if (this.nuevaPolitica.titulo && this.nuevaPolitica.contenido) {
      this.controlAdministrativaService
        .registerPolitica(this.nuevaPolitica)
        .subscribe(
          (response) => {
            console.log('Política registrada con éxito:', response);
            // Aquí puedes limpiar el formulario o redireccionar
            this.nuevaPolitica = { titulo: '', contenido: '' };
          },
          (error) => {
            console.error('Error al registrar la política:', error);
          }
        );
    }
  }
}
