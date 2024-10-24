import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrl: './listado-clientes.component.scss',
})
export class ListadoClientesComponent implements OnInit {
  data!: any;

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
}
