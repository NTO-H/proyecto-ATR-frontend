import { Component, OnInit } from '@angular/core';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import { error } from 'console';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.scss',
})
export class TerminosComponent implements OnInit {
  terminos: any;
  constructor(private datosEmpresaS_: DatosEmpresaService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getData();
  }

  getData() {
    this.datosEmpresaS_.getTerminos().subscribe(
      (response: any) => {
        if (response.success) {
          this.terminos = response.data;
  
          // Imprimir el mensaje recibido desde el back-end
          console.log(response.message);
  
          if (response.data.length === 0) {
            console.warn('Advertencia desde el back-end:', response.message);
          }
        } else {
          console.error('Error desde el back-end:', response.message);
        }
      },
      (error) => {
        console.error('Error al conectarse al servidor:', error);
      }
    );
  }
  


}
