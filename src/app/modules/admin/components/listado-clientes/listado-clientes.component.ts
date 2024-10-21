import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../../../shared/services/usuario.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss'], // Fixed typo
})
export class ListadoClientesComponent implements OnInit, AfterViewInit {
  // Define columns for the table
  displayedColumns: string[] = ['Id', 'Nombre', 'Correo', 'Telefono', 'Rol', 'FechaDeRegistro'];

  // MatTableDataSource expects an array of any type here
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private us: UsuarioService) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUsuario() {
    this.us.getUsuarios().subscribe((res) => {
      console.log(res);
      this.dataSource.data = res; // Set the dataSource with the user data
    });
  }
}
