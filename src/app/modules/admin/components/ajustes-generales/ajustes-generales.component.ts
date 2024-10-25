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
  logoUrl: string | ArrayBuffer | null = null;
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

  ngOnInit() {
    this.traerDatos();
  }

  traerDatos() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const empresaData = data[0]; // Suponiendo que `data` es un arreglo y tomamos el primer elemento
          this.empresa = {
            slogan: empresaData.slogan,
            tituloPagina: empresaData.tituloPagina,
            direccion: empresaData.direccion,
            correoElectronico: empresaData.correoElectronico,
            telefono: empresaData.telefono,
          };
          this.redesSociales = empresaData.redesSociales || []; // Asegúrate de que redesSociales exista
          this.selectedFile = null; // Restablece el archivo seleccionado
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontraron datos de la empresa.',
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los datos de la empresa.',
        });
        console.error('Error al cargar datos de la empresa', error);
      }
    );
  }

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
        this.resetForm();
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
    return (
      red.plataforma.length >= 3 &&
      red.plataforma.length <= 20 &&
      urlPattern.test(red.enlace)
    );
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

        const reader = new FileReader();
        reader.onload = () => {
            this.logoUrl = reader.result; // Asignar la URL del archivo
        };
        reader.readAsDataURL(file);

        console.log('Archivo seleccionado:', file);
        this.selectedFile = file;
    }
}


  resetFileInput() {
    this.selectedFile = null;
    this.fileInput.nativeElement.value = ''; // Limpia el input de archivo
    this.logoUrl = null; // Restablece la URL del logo
  }

  resetForm() {
    this.empresa = {
      slogan: '',
      tituloPagina: '',
      direccion: '',
      correoElectronico: '',
      telefono: '',
    };
    this.redesSociales = [{ plataforma: '', enlace: '' }];
    this.resetFileInput();
  }

  addRed() {
    this.redesSociales.push({ plataforma: '', enlace: '' });
  }

  removeRed(index: number) {
    this.redesSociales.splice(index, 1);
  }
}
