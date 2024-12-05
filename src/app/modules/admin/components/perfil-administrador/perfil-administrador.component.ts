import { Component } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { SessionService } from '../../../../shared/services/session.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../../shared/services/storage.service';

@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.component.html',
  styleUrl: './perfil-administrador.component.scss'
})
export class PerfilAdministradorComponent {
  data: any = {};
  id!: string;
  editMode: boolean = false;
  profileImg: string | null = null; // Imagen por defecto es null

  constructor(
    private uss: UsuarioService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getData();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      console.log('Saliendo del modo edición, datos guardados:', this.data);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = e.target.result; // Actualiza con la imagen seleccionada
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  getInitials(name: string | null | undefined): string {
    if (!name) {
      return 'NA'; // Valor por defecto si no hay nombre
    }
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getData(): void {
    const userData = this.sessionService.getId();
    console.log('userData=>', userData);
    if (userData) {
      this.id = userData;
      console.log('id=>', this.id);
      if (this.id) {
        this.uss.detalleUsuarioById(this.id).subscribe((data) => {
          this.data = data;
          this.profileImg = data.profileImg || null; // Carga la imagen si existe
        });
      }
    }
  }

  saveChanges(): void {
    const updatedProfile = {
      ...this.data,
      profileImg: this.profileImg, // Agrega la imagen al perfil
    };

    // Llama al servicio para guardar los cambios
    this.uss.actualizarUsuario(this.id, updatedProfile).subscribe(
      (response) => {
        console.log('Perfil actualizado:', response);
        alert('Perfil actualizado correctamente.');
        this.toggleEditMode(); // Salir del modo de edición
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        alert('Hubo un problema al actualizar el perfil.');
      }
    );
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
