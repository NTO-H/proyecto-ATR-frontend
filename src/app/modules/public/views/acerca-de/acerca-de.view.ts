import { DatosEmpresaService } from './../../../../shared/services/datos-empresa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.view.html',
  styleUrl: './acerca-de.view.scss',
})
export class AcercaDeView  implements OnInit{
  displayTermsDialog: boolean = false;
  termsAccepted: boolean = false;
  empresaData: any;
  // Mostrar el modal
  // showTermsDialog() {
  // }
  constructor(private datosEmpresaService: DatosEmpresaService) {}

  ngOnInit() {
    this.loadCompanyData(); // Cargar los datos de la empresa al iniciar
  }
  loadCompanyData() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        this.empresaData = data[0];  // Guardar los datos en la variable
        console.log('Datos de la empresa:', this.empresaData);
      },
      (error) => {

        console.error('Error al cargar los datos de la empresa:', error);
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
