import { Component } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-deslinde-legal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-deslinde-legal.component.html',
  styleUrl: './historial-deslinde-legal.component.scss',
})
export class HistorialDeslindeLegalComponent {
  id: string | null = null;
  historialDeslindeLegal: any[] = []; // Se usa 'any[]' en lugar de una interfaz específica
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
    this.controlAdministrativaService.obtenerHistorialDeslindeLegal(id).subscribe(
      (response: { historial: any[] }) => {
        this.historialDeslindeLegal = response.historial.sort((a, b) => Number(b.version) - Number(a.version));;
        console.log(this.historialDeslindeLegal); // Verifica la estructura
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
