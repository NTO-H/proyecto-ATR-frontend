import { Component } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.view.html',
  styleUrl: './acerca-de.view.scss'
})
export class AcercaDeView {
  displayTermsDialog: boolean = false;
  termsAccepted: boolean = false;

  // Mostrar el modal
  // showTermsDialog() {
  // }
  
  // Acción al aceptar los términos
  acceptTerms() {
    this.displayTermsDialog = false;
    this.termsAccepted = false;
    // Aquí puedes añadir la lógica cuando se acepten los términos
    console.log('Términos y condiciones aceptados');
  }



  verTerminosYcondiciones(){
    
    this.displayTermsDialog = true;
  }
}
