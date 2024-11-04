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
