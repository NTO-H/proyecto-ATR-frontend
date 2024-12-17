import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import Swal from 'sweetalert2';
import { RedSocial } from '../../../../shared/interfaces/redSocial.interface';

interface IconOption {
  label: string;
  plataforma: string;
  icon: string; // Interfaz para definir el formato de las opciones de íconos
}

@Component({
  selector: 'app-ajustes-generales',
  templateUrl: './ajustes-generales.component.html',
  styleUrls: ['./ajustes-generales.component.scss'],
})
export class AjustesGeneralesComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef; // Referencia al input de archivo para subir imágenes
  logoUrl: string | ArrayBuffer | null = null; // URL del logo de la empresa

  empresa = {
    // Objeto que guarda los datos de la empresa
    logo: '',
    slogan: '',
    tituloPagina: '',
    direccion: '',
    correoElectronico: '',
    telefono: '',
  };

  numIntentos: number = 6; // Número de intentos permitidos
  tiempoDeBloqueo: number = 20; // Tiempo de bloqueo en minutos

  profileImg: string | null = null; // Imagen de perfil de la empresa

  redesSociales: RedSocial[] = []; // Array para almacenar las redes sociales de la empresa

  selectedFile: File | null = null; // Archivo seleccionado para subir

  // Opciones de íconos para las redes sociales
  iconOptions: IconOption[] = [
    { plataforma: 'Facebook', label: 'Facebook', icon: 'pi pi-facebook' },
    { plataforma: 'Twitter', label: 'Twitter', icon: 'pi pi-twitter' },
    { plataforma: 'Instagram', label: 'Instagram', icon: 'pi pi-instagram' },
    { plataforma: 'LinkedIn', label: 'LinkedIn', icon: 'pi pi-linkedin' },
    { plataforma: 'GitHub', label: 'GitHub', icon: 'pi pi-github' },
    { plataforma: 'YouTube', label: 'YouTube', icon: 'pi pi-youtube' },
    { plataforma: 'Ninguno', label: 'Ninguno', icon: '' },
  ];

  // Mapa de plataformas a íconos
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
    // Método que se ejecuta al inicializar el componente
    this.traerDatos(); // Llama a la función para cargar los datos de la empresa
  }

  removeRed(_id: any, id: number) {
    // Elimina una red social
    this.datosEmpresaService.eliminarRedSocial(_id).subscribe((respuesta) => {
      this.traerDatos(); // Vuelve a cargar los datos después de eliminar

      Swal.fire({
        icon: 'success',
        title: 'Configuraciones actualizadas',
        text: 'Red social eliminada con éxito',
      });
    });
    this.redesSociales.splice(id, 1); // Elimina la red social del array
  }

  saveRed(id: number) {
    // Guarda o actualiza una red social
    const red = this.redesSociales[id]; // Obtiene la red social seleccionada
    console.log('Guardando o actualizando la red social:', red);
    this.datosEmpresaService
      .guardarRedSocial(id, red) // Envía la red social al backend
      .subscribe((respuesta) => {
        this.traerDatos(); // Vuelve a cargar los datos
        Swal.fire({
          icon: 'success',
          title: 'Configuraciones guardadas',
          text: 'Red social agregada con éxito',
        });
        console.log(respuesta);
      });
  }

  addRed() {
    // Agrega un nuevo espacio para añadir una red social
    const redSocial: RedSocial = {
      _id: '',
      plataforma: '',
      icon: '',
      enlace: '',
    };

    this.redesSociales.push(redSocial); // Añade la nueva red social al array
  }

  onUrlChange(index: number) {
    // Maneja los cambios en la URL de la red social
    const enlace = this.redesSociales[index].enlace.toLowerCase();

    let platform = 'Ninguno'; // Valor por defecto
    let icon = '';

    // Detecta la plataforma por la URL y asigna el ícono correspondiente
    for (const key in this.platformIconMap) {
      if (enlace.includes(key)) {
        platform = key.split('.')[0]; // Solo el nombre de la plataforma
        icon = this.platformIconMap[key]; // Asigna el ícono de esa plataforma
        break;
      }
    }

    // Actualiza los valores de plataforma e ícono
    this.redesSociales[index].plataforma =
      platform.charAt(0).toUpperCase() + platform.slice(1); // Capitaliza el nombre
    this.redesSociales[index].icon = icon;

    // Si no se encontró ninguna plataforma conocida, asigna "Ninguno"
    if (!icon) {
      this.redesSociales[index].plataforma = 'Ninguno';
      this.redesSociales[index].icon = '';
    }
  }

  traerDatos() {
    // Carga los datos de la empresa desde el backend
    this.datosEmpresaService.traerDatosEmpresa().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const empresaData = data[0];
          this.profileImg = empresaData.logo; // Asigna la imagen de perfil
          this.empresa = {
            logo: empresaData.logo,
            slogan: empresaData.slogan,
            tituloPagina: empresaData.tituloPagina,
            direccion: empresaData.direccion,
            correoElectronico: empresaData.correoElectronico,
            telefono: empresaData.telefono,
          };

          this.selectedFile = null; // Resetea el archivo seleccionado

          // Mapea las redes sociales y asigna íconos
          this.redesSociales = empresaData.redesSociales.map(
            (redSocial: any) => {
              const selectedIcon = this.iconOptions.find(
                (option) =>
                  option.plataforma.toLowerCase().trim() ===
                  redSocial.plataforma.toLowerCase().trim()
              );

              return {
                ...redSocial,
                icon: selectedIcon ? selectedIcon.icon : '', // Asigna ícono correspondiente
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

    // Carga configuraciones de la empresa
    this.datosEmpresaService.consultarConfigurarEmpresa().subscribe(
      (data) => {
        this.numIntentos = data.configuracion.intentosPermitidos; // Asigna intentos permitidos
        this.tiempoDeBloqueo = data.configuracion.tiempoDeBloqueo; // Asigna tiempo de bloqueo
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar las configuraciones de la empresa.',
        });
        console.error(
          'Error al cargar las configuraciones de la empresa',
          error
        );
      }
    );
  }

  onSubmitSystemSettings() {
    // Envía configuraciones del sistema al backend
    const payload = {
      intentosPermitidos: this.numIntentos,
      tiempoDeBloqueo: this.tiempoDeBloqueo,
    };

    this.datosEmpresaService.configurarEmpresa(payload).subscribe(
      (respuesta) => {
        if (respuesta) {
          console.log(respuesta);
          Swal.fire({
            icon: 'success',
            title: 'Configuraciones guardadas',
            text: 'Las configuraciones se guardaron con éxito',
          });
        }
      },
      (error) => {
        console.error('Error al configurar la empresa', error);
      }
    );
  }

  onSubmit() {
    // Envía los datos de la empresa al backend
    const formData = new FormData();
    formData.append('slogan', this.empresa.slogan);
    formData.append('tituloPagina', this.empresa.tituloPagina);
    formData.append('direccion', this.empresa.direccion);
    formData.append('correoElectronico', this.empresa.correoElectronico);
    formData.append('telefono', this.empresa.telefono);

    formData.append('redesSociales', JSON.stringify(this.redesSociales)); // Convierte redes sociales a JSON

    // Verifica si hay un archivo seleccionado
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
      formData.append('file', this.selectedFile); // Agrega el archivo al FormData
    }

    // Envía los datos al backend para actualizar
    this.datosEmpresaService.editarPerfilEmpresa(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Usuario actualizado correctamente.',
        });
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
    // Valida la red social ingresada
    const urlPattern = new RegExp('https?://.+');
    return (
      red.plataforma.length >= 3 &&
      red.plataforma.length <= 20 &&
      urlPattern.test(red.enlace)
    );
  }

  onFileSelected(event: any) {
    // Maneja la selección de un archivo
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
        this.logoUrl = reader.result; // Asigna la URL del archivo
        this.profileImg = e.target.result; // Muestra la imagen de perfil
      };
      reader.readAsDataURL(file); // Lee el archivo como URL de datos
      this.selectedFile = file; // Guarda el archivo seleccionado
    }
  }

  resetFileInput() {
    // Resetea el input de archivo
    this.selectedFile = null;
    this.fileInput.nativeElement.value = ''; // Limpia el input de archivo
    this.logoUrl = null; // Restablece la URL del logo
  }

  resetForm() {
    // Resetea el formulario de la empresa
    this.empresa = {
      logo: '',
      slogan: '',
      tituloPagina: '',
      direccion: '',
      correoElectronico: '',
      telefono: '',
    };
    this.redesSociales = [{ _id: '', plataforma: '', icon: '', enlace: '' }];

    this.resetFileInput(); // Limpia el input de archivo
  }

  currentIcon: IconOption | null = null; // Icono actualmente seleccionado
  currentUrl: string = ''; // URL actualmente seleccionada
  links: { icon: string; label: string; url: string }[] = []; // Array para almacenar enlaces

  handleAddLink() {
    // Maneja la adición de un nuevo enlace
    if (this.currentIcon && this.currentUrl) {
      this.links.push({
        icon: this.currentIcon.icon,
        label: this.currentIcon.label,
        url: this.currentUrl,
      });
      this.currentIcon = null; // Resetea el ícono actual
      this.currentUrl = ''; // Resetea la URL actual
    }
  }
}
