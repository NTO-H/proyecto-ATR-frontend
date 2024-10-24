import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { Politica } from '../../../../shared/models/politica.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-politicas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-politicas.component.html',
  styleUrls: ['./historial-politicas.component.scss'], 
})
export class HistorialPoliticasComponent {
  id: string | null = null;
  historial: Politica[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private controlAdministrativaService: ControlAdministrativaService
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
    this.controlAdministrativaService.obtenerHistorialPoliticas(id).subscribe(
      (response: { historial: Politica[] }) => { // Ajustamos aquí para que el tipo de respuesta sea el correcto
        this.historial = response.historial; // Accedemos a la propiedad 'historial'
        console.log(this.historial); // Verifica la estructura
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
