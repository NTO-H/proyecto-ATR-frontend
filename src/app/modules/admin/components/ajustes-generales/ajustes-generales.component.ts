import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajustes-generales',
  templateUrl: './ajustes-generales.component.html',
  styleUrls: ['./ajustes-generales.component.scss'],
})
export class AjustesGeneralesComponent {
  @ViewChild('fileInput') fileInput!: ElementRef; // Referencia al input de archivo

  empresa = {
    slogan: '',
    tituloPagina: '',
    direccion: '',
    correoElectronico: '',
    telefono: '',
  };

  redesSociales: { plataforma: string; enlace: string }[] = [
    { plataforma: '', enlace: '' },
  ];

  selectedFile: File | null = null;

  constructor(private datosEmpresaService: DatosEmpresaService) {}

  onSubmit() {
    const formData = new FormData();

    formData.append('slogan', this.empresa.slogan);
    formData.append('tituloPagina', this.empresa.tituloPagina);
    formData.append('direccion', this.empresa.direccion);
    formData.append('correoElectronico', this.empresa.correoElectronico);
    formData.append('telefono', this.empresa.telefono);

    if (this.selectedFile) {
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
      if (this.selectedFile.size > maxSizeInBytes) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El tamaño del archivo excede el límite de 2 MB.',
        });
        return;
      }
      formData.append('file', this.selectedFile);
    }

    const invalidRedes = this.redesSociales.filter(red => !this.validateRed(red));
    if (invalidRedes.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay enlaces de redes sociales inválidos.',
      });
      return;
    }

    formData.append('redesSociales', JSON.stringify(this.redesSociales));

    this.datosEmpresaService.updateUsuario(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario actualizado correctamente.',
        });
        console.log('Usuario actualizado', response);
        
        // Limpiar el input de archivo y la selección
        this.selectedFile = null;
        this.fileInput.nativeElement.value = ''; // Limpia el input de archivo
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar usuario.',
        });
        console.error('Error al actualizar usuario', error);
      }
    );
  }

  validateRed(red: { plataforma: string; enlace: string }): boolean {
    const urlPattern = new RegExp('https?://.+');
    return red.plataforma.length >= 3 && red.plataforma.length <= 20 && urlPattern.test(red.enlace);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['image/jpeg', 'image/png'];
      if (!validExtensions.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Formato no válido',
          text: 'Solo se permiten archivos en formato JPEG o PNG.',
        });
        this.selectedFile = null;
        this.fileInput.nativeElement.value = ''; // Limpia el input de archivo
        return;
      }

      console.log('Archivo seleccionado:', file);
      this.selectedFile = file;
    }
  }

  addRed() {
    this.redesSociales.push({ plataforma: '', enlace: '' });
  }

  removeRed(index: number) {
    this.redesSociales.splice(index, 1);
  }
}
