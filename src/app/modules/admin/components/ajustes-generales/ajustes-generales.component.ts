import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import Swal from 'sweetalert2';
import { error } from 'node:console';
import { RedSocial } from '../../../../shared/interfaces/redSocial.interface';

// interface SocialLink {
//   icon: string;
//   url: string;
// }

interface IconOption {
  label: string;
  plataforma: string;
  icon: string;
}

@Component({
  selector: 'app-ajustes-generales',
  templateUrl: './ajustes-generales.component.html',
  styleUrls: ['./ajustes-generales.component.scss'],
})
export class AjustesGeneralesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef; // Referencia al input de archivo
  logoUrl: string | ArrayBuffer | null = null;
  empresa = {
    logo: '',
    slogan: '',
    tituloPagina: '',
    direccion: '',
    correoElectronico: '',
    telefono: '',
  };
  numIntentos: number = 5;
  tiempoDeBloqueo: number = 20; //segundos

  profileImg: string | null = null; // Imagen por defecto es null

  redesSociales: RedSocial[] = [];

  selectedFile: File | null = null;

  iconOptions: IconOption[] = [
    { plataforma: 'Facebook', label: 'Facebook', icon: 'pi pi-facebook' },
    { plataforma: 'Twitter', label: 'Twitter', icon: 'pi pi-twitter' },
    { plataforma: 'Instagram', label: 'Instagram', icon: 'pi pi-instagram' },
    { plataforma: 'LinkedIn', label: 'LinkedIn', icon: 'pi pi-linkedin' },
    { plataforma: 'GitHub', label: 'GitHub', icon: 'pi pi-github' },
    { plataforma: 'YouTube', label: 'YouTube', icon: 'pi pi-youtube' },
    { plataforma: 'Ninguno', label: 'Ninguno', icon: '' },
  ];

  platformIconMap: { [key: string]: string } = {
    'facebook.com': 'pi pi-facebook',
    'twitter.com': 'pi pi-twitter',
    'instagram.com': 'pi pi-instagram',
    'linkedin.com': 'pi pi-linkedin',
    'github.com': 'pi pi-github',
    'youtube.com': 'pi pi-youtube',
  };

  constructor(private datosEmpresaService: DatosEmpresaService) {}

  ngOnInit() {
    this.traerDatos();
  }
  removeRed(_id: any, id: number) {
    this.datosEmpresaService.eliminarRedSocial(_id).subscribe((respuesta) => {
      console.log(respuesta);
      this.traerDatos();

      Swal.fire({
        icon: 'success',
        title: 'Configuraciones actualizadas',
        text: 'Red social eliminado con exito',
      });
    });

    this.redesSociales.splice(id, 1);
  }
  saveRed(id: number) {
    const red = this.redesSociales[id];
    console.log('Guardando o actualizando la red social:', red);
    this.datosEmpresaService
      .guardarRedSocial(id, red)
      .subscribe((respuesta) => {
        this.traerDatos();
        Swal.fire({
          icon: 'success',
          title: 'Configuraciones guardadas',
          text: 'Red social agregado con exito',
        });
        console.log(respuesta);
      });
  }

  addRed() {
    const redSocial: RedSocial = {
      _id: '',
      plataforma: '',
      icon: '',
      enlace: '',
    };

    this.redesSociales.push(redSocial);
  }
  onUrlChange(index: number) {
    const enlace = this.redesSociales[index].enlace.toLowerCase();

    // Detectar la plataforma por la URL y asignar el ícono correspondiente
    let platform = 'Ninguno'; // Valor por defecto
    let icon = '';

    // Buscar la plataforma correspondiente en el mapeo de plataformas
    for (const key in this.platformIconMap) {
      if (enlace.includes(key)) {
        platform = key.split('.')[0]; // Solo el nombre de la plataforma
        icon = this.platformIconMap[key]; // Asignar el ícono de esa plataforma
        break;
      }
    }

    // Actualizar los valores de plataforma y ícono
    this.redesSociales[index].plataforma =
      platform.charAt(0).toUpperCase() + platform.slice(1); // Capitalizar
    this.redesSociales[index].icon = icon;

    // Si no se encontró ninguna plataforma conocida, poner "Ninguno" y sin ícono
    if (!icon) {
      this.redesSociales[index].plataforma = 'Ninguno';
      this.redesSociales[index].icon = '';
    }
  }

  traerDatos() {
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const empresaData = data[0];
          this.profileImg = empresaData.logo;
          this.empresa = {
            logo: empresaData.logo,
            slogan: empresaData.slogan,
            tituloPagina: empresaData.tituloPagina,
            direccion: empresaData.direccion,
            correoElectronico: empresaData.correoElectronico,
            telefono: empresaData.telefono,
          };

          this.selectedFile = null;
          this.redesSociales = empresaData.redesSociales.map(
            (redSocial: any) => {
              // Encuentra el ícono correspondiente
              const selectedIcon = this.iconOptions.find(
                (option) =>
                  option.plataforma.toLowerCase().trim() ===
                  redSocial.plataforma.toLowerCase().trim()
              );

              return {
                ...redSocial,
                icon: selectedIcon ? selectedIcon.icon : '', // Asignar ícono correspondiente
              };
            }
          );
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
    console.log(this.redesSociales);
  }
  onSubmitSystemSettings() {
    //convertinos todo a un json
    const payload = {
      numIntentos: this.numIntentos,
      tiempoDeBloqueo: this.tiempoDeBloqueo,
    };

    this.datosEmpresaService.configurarEmpresa(payload).subscribe(
      (respuesta) => {
        if (respuesta) {
          Swal.fire({
            icon: 'success',
            title: 'Configuraciones guardadas',
            text: 'Las configuraciones se guardaron con exito',
          });
        }
      },

      (error) => {
        console.error('Error al configurar la empresa', error);
      }
    );
    console.log(this.numIntentos);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('slogan', this.empresa.slogan);
    formData.append('tituloPagina', this.empresa.tituloPagina);
    formData.append('direccion', this.empresa.direccion);
    formData.append('correoElectronico', this.empresa.correoElectronico);
    formData.append('telefono', this.empresa.telefono);

    formData.append('redesSociales', JSON.stringify(this.redesSociales));

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

    this.datosEmpresaService.editarPerfilEmpresa(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario actualizado correctamente.',
        });
        console.log('Usuario actualizado', response);
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
      reader.onload = (e: any) => {
        this.logoUrl = reader.result; // Asignar la URL del archivo
        this.profileImg = e.target.result;
      };
      reader.readAsDataURL(file);
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
      logo: '',
      slogan: '',
      tituloPagina: '',
      direccion: '',
      correoElectronico: '',
      telefono: '',
    };
    this.redesSociales = [{ _id: '', plataforma: '', icon: '', enlace: '' }];

    this.resetFileInput();
  }

  // removeRed(index: number) {
  //   this.redesSociales.splice(index, 1);
  // }

  // socialLinks: SocialLink[] = [];
  currentIcon: IconOption | null = null;
  currentUrl: string = '';
  links: { icon: string; label: string; url: string }[] = [];

  handleAddLink() {
    if (this.currentIcon && this.currentUrl) {
      this.links.push({
        icon: this.currentIcon.icon,
        label: this.currentIcon.plataforma,
        url: this.currentUrl,
      });
      this.currentIcon = null;
      this.currentUrl = '';
    }
  }

  // handleRemoveLink(index: number) {
  //   this.socialLinks.splice(index, 1);
  // }

  // removeRed(index: number) {
  //   this.redesSociales.splice(index, 1);
  // }

  currentPreview() {
    return this.redesSociales.some((red) => red.plataforma && red.enlace);
  }
}
