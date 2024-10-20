import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrl: './listado-clientes.component.scss',
})
export class ListadoClientesComponent implements OnInit {
  data: any[] = []; // Cambia el tipo según tu modelo de cliente
  newClient = {
    nombre: '',
    email: '',
    telefono: '',
    rol: 'CLIENTE', // Valor por defecto
  };

  ngOnInit(): void {
    this.getUsuario();
  }

  constructor(private us: UsuarioService) {}

  getUsuario() {
    this.us.getUsuarios().subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }

  addClient(): void {
  
  }
  editClient(cliente: any): void {
   
  }

  deleteClient(id: string): void {
    
  }
}
