import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-terminos-condiciones',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './historial-terminos-condiciones.component.html',
  styleUrl: './historial-terminos-condiciones.component.scss',
})
export class HistorialTerminosCondicionesComponent {
  id: string | null = null;
  historialTerminos: any[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.obtenerHistorial(this.id);
      }
    });
  }

  obtenerHistorial(id: string) {
    this.isLoading = true;
    this.controlAdministrativaService
      .obtenerHistorialTerminosYCondiciones(id)
      .subscribe(
        (response: { historial: any[] }) => {
          // Ajustamos aquí para que el tipo de respuesta sea el correcto
          this.historialTerminos = response.historial; // Accedemos a la propiedad 'historial'
          console.log(this.historialTerminos); // Verifica la estructura
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage =
            'Error al obtener el historial. Inténtalo más tarde.';
          console.error('Error al obtener historial:', error);
        }
      );
  }
}
