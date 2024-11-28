import { Component, Injectable, OnInit } from '@angular/core';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.scss',
})
export class PoliticasComponent implements OnInit {
  politicas: any;
  constructor(private datosEmpresaService_: DatosEmpresaService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.datosEmpresaService_.getPoliticas().subscribe(
      (data) => {
        this.politicas = data[0];

        console.log(data);
      },
      (error) => {
        console.log('error', error.message);
      }
    );
  }
}
