import { Component } from '@angular/core';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';

@Component({
  selector: 'app-ajustes-generales',
  templateUrl: './ajustes-generales.component.html',
  styleUrls: ['./ajustes-generales.component.scss'],
})
export class AjustesGeneralesComponent {
  empresa = {
    slogan: '',
    tituloPagina: '',
    direccion: '',
    correoElectronico: '',
    telefono: '',
  };

  redesSociales: { plataforma: string; enlace: string }[] = [
    { plataforma: '', enlace: '' }, // Inicializa con un campo vacío
  ];

  selectedFile: File | null = null;

  constructor(private datosEmpresaService: DatosEmpresaService) {}
  onSubmit() {
    const formData = new FormData();

    // Añadir los datos de la empresa
    formData.append('slogan', this.empresa.slogan);
    formData.append('tituloPagina', this.empresa.tituloPagina);
    formData.append('direccion', this.empresa.direccion);
    formData.append('correoElectronico', this.empresa.correoElectronico);
    formData.append('telefono', this.empresa.telefono);

    // Añadir las redes sociales
    formData.append('redesSociales', JSON.stringify(this.redesSociales)); // Convertir a JSON si es necesario

    if (this.selectedFile) {
      console.log("checa",this.selectedFile)
      formData.append('file', this.selectedFile);
    }

    // Llamar al servicio
    this.datosEmpresaService.updateUsuario(formData).subscribe(
      (response) => {
        console.log('Usuario actualizado', response);
      },
      (error) => {
        console.error('Error al actualizar usuario', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      console.log('Archivo seleccionado:', file); // Muestra el nombre del archivo en consola
      this.selectedFile = file; // Guarda el archivo en la propiedad
    }
  }

  addRed() {
    this.redesSociales.push({ plataforma: '', enlace: '' });
  }

  removeRed(index: number) {
    this.redesSociales.splice(index, 1);
  }
}
