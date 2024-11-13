import { DatosEmpresaService } from './../../../../shared/services/datos-empresa.service';
import { ControlAdministrativaService } from './../../../../shared/services/control-administrativa.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.view.html',
  styleUrl: './acerca-de.view.scss',
})
export class AcercaDeView implements OnInit {
  displayTermsDialog: boolean = false;
  termsAccepted: boolean = false;
  empresaData: any = {};
  politicasDePrivacidad: any=[];
  // Mostrar el modal
  // showTermsDialog() {
  // }
  constructor(
    private datosEmpresaService: DatosEmpresaService,
    private controlAdministrativaService: ControlAdministrativaService
  ) {}

  ngOnInit() {
    this.loadCompanyData(); // Cargar los datos de la empresa al iniciar
  }
  loadCompanyData() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        console.table(data[0]);
        this.empresaData = data[0]; // Guardar los datos en la variable
      },
      (error) => {
        console.error('Error al cargar los datos de la empresa:', error);
      }
    );
    this.controlAdministrativaService.obtenerTerminosYCondiciones().subscribe(
      (respuesta) => {
        console.log(respuesta)
        this.politicasDePrivacidad= respuesta
      },
      (error) => {
        console.log('error al consultar las politicas de privacidad');
      }
    );
  }

  
  // Acción al aceptar los términos
  acceptTerms() {
    this.displayTermsDialog = false;
    this.termsAccepted = false;
    // Aquí puedes añadir la lógica cuando se acepten los términos
    console.log('Términos y condiciones aceptados');
  }

  verTerminosYcondiciones() {
    this.displayTermsDialog = true;
  }
}
