import { Component, OnInit } from '@angular/core';
import { ControlAdministrativaService } from '../../../../shared/services/control-administrativa.service';
import { AnyMxRecord } from 'dns';

@Component({
  selector: 'app-listado-politica',
  templateUrl: './listado-politica.component.html',
  styleUrl: './listado-politica.component.scss',
})
export class ListadoPoliticaComponent implements OnInit {
  
  politicas!:any
  
  ngOnInit(): void {
    this.obtenerPoliticas();
  }

  constructor(private cadm: ControlAdministrativaService) {}

  obtenerPoliticas() {
    this.cadm.obtenerPoliticas().subscribe((res)=>{
      this.politicas=res;
    })
  }
}
