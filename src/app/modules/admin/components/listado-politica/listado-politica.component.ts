import { Component, OnInit } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { Politica } from '../../../../shared/models/politica.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-politica',
  templateUrl: './listado-politica.component.html',
  styleUrls: ['./listado-politica.component.scss'], // Asegúrate de que sea styleUrls
})
export class ListadoPoliticaComponent implements OnInit {
  politicas: Politica[] = []; // Inicializa como un arreglo vacío
  politicaAEditar: Politica | null = null;
  isEditing: boolean = false;
  isLoading: boolean = false; // Estado de carga
  errorMessage: string | null = null;

  constructor(
    private controlAdministrativaService: ControlAdministrativaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerPoliticas(); // Cargar políticas al iniciar el componente
  }

  obtenerPoliticas() {
    this.isLoading = true; // Activar estado de carga
    this.controlAdministrativaService.obtenerPoliticas().subscribe(
      (data: Politica[]) => {
        this.politicas = data; // Guarda los datos en la variable
        console.table(this.politicas); // Mostrar datos en consola
        this.isLoading = false; // Desactivar estado de carga
      },
      (error) => {
        this.isLoading = false; // Desactivar estado de carga
        this.errorMessage = 'Error al obtener políticas. Inténtalo más tarde.'; // Mensaje de error
        console.error('Error al obtener políticas:', error);
      }
    );
  }
  cancelarEdicion() {
    this.isEditing = false; // Desactivamos la edición
    this.politicaAEditar = null; // Reiniciamos el objeto de política
  }

  actualizarPolitica() {
    if (!this.politicaAEditar) return; // Verificar si hay una política a editar
    this.controlAdministrativaService
      .actualizarPoliticas(this.politicaAEditar._id, this.politicaAEditar)
      .subscribe(
        (response) => {
          console.log('Política actualizada:', response);
          this.obtenerPoliticas(); // Recargar la lista después de actualizar
          this.isEditing = false; // Desactivamos el modo edición
          this.politicaAEditar = null; // Limpiamos la política que se estaba editando
        },
        (error) => {
          this.errorMessage =
            'Error al actualizar política. Inténtalo más tarde.'; // Mensaje de error
          console.error('Error al actualizar política:', error);
        }
      );
  }

  editarPolitica(doc: Politica) {
    this.politicaAEditar = { ...doc }; // Copiar los datos de la política seleccionada
    this.isEditing = true; // Cambiar el estado a editar
  }

  eliminarPolitica(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta política?')) {
      console.log(id)
      this.controlAdministrativaService.eliminarPolitica(id).subscribe(
        (response) => {
          console.log('Política eliminada:', response);
          alert('Política eliminada correctamente.');
          this.obtenerPoliticas(); // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar política:', error);
        }
      );
    }
  }

  verHistorial(id: string) {
    this.router.navigate(['/admin/politicas/historial-Politicas', id]);
  }
}
