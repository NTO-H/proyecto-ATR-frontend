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


  ngOnInit() {
    this.getData();
  }
  constructor(
    // private ngxService: NgxUiLoaderService,
    private uss: UsuarioService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private router: Router
  ) {}
  toggleEditMode(): void {
    this.editMode = !this.editMode;
    // Puedes agregar lógica para guardar datos aquí
    if (!this.editMode) {
      console.log('Datos guardados:', this.data);
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
      .split('')
      .map((word) => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  getData(): void {
    // this.ngxService.start();
    const userData = this.sessionService.getId();
    console.log('userData=>', userData);
    if (userData) {
      this.id = userData;
      console.log('id=>', this.id);
      if (this.id) {
        this.uss.detalleUsuarioById(this.id).subscribe((data) => {
          this.data = data;
        });
      }
    }
    
  }
  logout() {
    this.storageService.removeItem('token');
    this.router.navigate(["/auth/login"]);
  }

}
