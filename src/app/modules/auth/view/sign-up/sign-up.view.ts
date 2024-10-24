import { Component, OnInit } from '@angular/core';
// import * AOS
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Usuario } from '../../../../shared/models/usuario.model';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { UsuarioService } from '../../../../shared/services/usuario.service';
import Swal from 'sweetalert2';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import { mensageservice } from '../../../../shared/services/mensage.service';
@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up.view.html',
  styleUrls: ['./sign-up.view.scss', './listacard.scss'],
})
export class SignUpView implements OnInit {
  formulario!: FormGroup;
  passwordStrength: string = '';
  strengthColor: string = '';
  coincidenPasswords: boolean = true;
  mostrarPassword: boolean = false;
  ViewActivateAcount: boolean = false;

  datosBasicosForm!: FormGroup;
  frmActivateAcount!: FormGroup;
  politicasForm!: FormGroup;
  datosConfidencialesForm!: FormGroup;
  public myGlobalVariable: any; // Cambia `any` por el tipo que necesites

  validacionesPassword = {
    tieneMinuscula: false,
    tieneMayuscula: false,
    tieneNumero: false,
    longitudMinima: false,
  };
  activeIndex: number = 0;

  nextStep() {
    if (this.activeIndex < 2) {
      this.activeIndex++;
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  errorMessages = {
    username: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private msgs: mensageservice,
    private router: Router,
    private fb: FormBuilder,
    private uservice: UsuarioService
  ) {
    // Inicializar el formulario de datos básicos
    this.datosBasicosForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });

    // Inicializar el formulario de datos confidenciales
    this.datosConfidencialesForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });

    // Inicializar el formulario de políticas
    this.politicasForm = this.fb.group({
      acceptTerms: [false, Validators.required], // Valida que el checkbox sea seleccionado
    });

    // Inicializar el formulario OTP
    this.frmActivateAcount = this.fb.group({
      otpCode: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    AOS.init();
    // Validar coincidencia de contraseñas
    this.datosConfidencialesForm
      .get('confirmPassword')
      ?.valueChanges.subscribe(() => {
        this.verificarCoincidencia();
      });

    this.datosBasicosForm.get('username')?.valueChanges.subscribe(() => {
      this.errorMessages.username = '';
    });
    this.datosBasicosForm.get('email')?.valueChanges.subscribe(() => {
      this.errorMessages.email = '';
    });

    // Validar número de teléfono y limpiar mensajes de error
    this.datosBasicosForm.get('telefono')?.valueChanges.subscribe(() => {
      const numeroTelefono = this.datosBasicosForm.get('tel')?.value;
      this.errorMessages.telefono = ''; // Limpiar mensaje de error inicialmente
      if (numeroTelefono && !isValidPhoneNumber(numeroTelefono, 'MX')) {
        this.errorMessages.telefono = 'Número telefónico inválido.';
      }
    });
  }

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword; // Cambia el estado de la visibilidad
  }

  // Verificar la fortaleza de la contraseña
  verificarPassword() {
    const password = this.datosConfidencialesForm.get('password')?.value;

    this.validacionesPassword.tieneMinuscula = /[a-z]/.test(password);
    this.validacionesPassword.tieneMayuscula = /[A-Z]/.test(password);
    this.validacionesPassword.tieneNumero = /[0-9]/.test(password);
    this.validacionesPassword.longitudMinima = password.length >= 8;

    // Determina la fuerza de la contraseña
    const validaciones = Object.values(this.validacionesPassword).filter(
      (v) => v
    ).length;

    if (validaciones === 0) {
      this.passwordStrength = 'Muy débil';
      this.strengthColor = 'text-danger';
    } else if (validaciones < 3) {
      this.passwordStrength = 'Débil';
      this.strengthColor = 'text-warning';
    } else if (validaciones === 3) {
      this.passwordStrength = 'Fuerte';
      this.strengthColor = 'text-info';
    } else if (validaciones === 4) {
      this.passwordStrength = 'Muy fuerte';
      this.strengthColor = 'text-success';
    }
  }

  // Verificar coincidencia de contraseñas
  verificarCoincidencia() {
    const password = this.datosConfidencialesForm.get('password')?.value;
    const confirmPassword =
      this.datosConfidencialesForm.get('confirmPassword')?.value;

    this.coincidenPasswords = password === confirmPassword;
  }

  registroDatosBasicos(): void {
    if (this.datosBasicosForm.valid) {
      console.log('Datos básicos válidos', this.datosBasicosForm.value);
      // Aquí puedes manejar la lógica para avanzar al siguiente paso
    } else {
      console.log('Datos básicos inválidos');
    }
  }

  registroDatosConfidenciales(): void {
    if (this.datosConfidencialesForm.valid) {
      // Validar que las contraseñas coincidan
      const password = this.datosConfidencialesForm.get('password')?.value;
      const confirmPassword =
        this.datosConfidencialesForm.get('confirmPassword')?.value;

      if (password === confirmPassword) {
        console.log(
          'Datos confidenciales válidos',
          this.datosConfidencialesForm.value
        );
        // Aquí puedes manejar la lógica para avanzar al siguiente paso
      } else {
        console.log('Las contraseñas no coinciden');
      }
    } else {
      console.log('Datos confidenciales inválidos');
    }
  }

  // // Registrar cliente
  registroCliente(): void {
    if (this.datosBasicosForm.valid && this.datosConfidencialesForm.valid) {
      // Accediendo a cada campo directamente de ambos formularios
      const username = this.datosBasicosForm.get('username')?.value;
      const email = this.datosBasicosForm.get('email')?.value;
      const telefono = this.datosBasicosForm.get('telefono')?.value;
      this.myGlobalVariable = email;
      const password = this.datosConfidencialesForm.get('password')?.value;
      // const confirmPassword = this.datosConfidencialesForm.get('confirmPassword')?.value;

      // Crear el objeto USUARIO accediendo campo por campo
      const USUARIO = {
        nombre: username,
        email: email,
        telefono: telefono,
        password: password,
        // confirmPassword: confirmPassword,
      };

      // Llama al servicio de registro, asumiendo que tienes un servicio de usuario
      this.uservice.register(USUARIO).subscribe(
        (response) => {
          Swal.fire('Exitoso', 'El registro fue exitoso', 'success');
          this.datosBasicosForm.reset(); // Resetea el formulario de datos básicos
          this.datosConfidencialesForm.reset(); // Resetea el formulario de datos confidenciales
          this.politicasForm.reset(); // Resetea el formulario de políticas
          // this.router.navigate(['/ruta-deseada']);

          // Simular la lógica para enviar el código de verificación
          this.msgs.enviarCorreo(email).subscribe({
            next: (res) => {
              console.log('Código de verificación enviado con éxito:', res);

              // Aquí puedes implementar más lógica si es necesario, como obtener un token de verificación o actualizar el estado de la aplicación
              this.msgs.enviarNotificacion().subscribe({});
              Swal.fire(
                'Verificación',
                'El código de verificación ha sido enviado',
                'info'
              );

              this.ViewActivateAcount = true;
              // Cambiar el valor de isOtpSent a true para mostrar el segundo formulario
            },
            error: (err) => {
              console.error('Error enviando el código de verificación:', err);
            },
          });

          // this.ViewActivateAcount = true;
        },
        (error) => {
          console.error(error);
          this.resetErrorMessages(); // Limpia mensajes de error antes de asignar nuevos

          // Maneja errores específicos
          if (error.status === 400) {
            this.errorMessages.username = error.error.message.includes(
              'usuario'
            )
              ? error.error.message
              : '';
            this.errorMessages.email = error.error.message.includes('email')
              ? error.error.message
              : '';
            this.errorMessages.telefono = error.error.message.includes(
              'telefono'
            )
              ? error.error.message
              : '';
          } else {
            this.errorMessages.username =
              'Ocurrió un error, por favor intenta nuevamente.';
          }
        }
      );
    } else {
      // Llama a una función para validar los campos de los formularios
      this.validateFormFields();
    }
  }

  // // Validar campos del formulario
  validateFormFields() {
    if (this.datosBasicosForm.get('username')?.invalid) {
      this.errorMessages.username = 'El nombre de usuario es requerido.';
    }
    if (this.datosBasicosForm.get('email')?.invalid) {
      this.errorMessages.email = 'El correo electrónico debe ser válido.';
    }
    if (this.datosBasicosForm.get('telefono')?.invalid) {
      this.errorMessages.telefono =
        'El número telefónico es requerido y debe ser válido.';
    }
    if (this.datosConfidencialesForm.get('password')?.invalid) {
      this.errorMessages.password = 'La contraseña es requerida.';
    }
    if (this.datosConfidencialesForm.get('confirmPassword')?.invalid) {
      this.errorMessages.confirmPassword = 'Por favor confirma tu contraseña.';
    }
  }

  // Restablecer mensajes de error
  resetErrorMessages() {
    this.errorMessages = {
      username: '',
      email: '',
      telefono: '',
      password: '',
      confirmPassword: '',
    };
  }

  verifyOtp(): void {
    if (this.frmActivateAcount.valid) {
      const codigoVerificacion = this.frmActivateAcount.get('otpCode')?.value;
      const email = this.myGlobalVariable;

      console.log('Email:', email);

      this.msgs.activarCuenta(email, codigoVerificacion).subscribe(
        (response) => {
          if (response) {
            // Aquí puedes realizar las acciones una vez que se haya verificado correctamente
            console.log('Código de verificación enviado con éxito:', response);

            // Enviar notificación adicional
            this.msgs.enviarNotificacion().subscribe(() => {
              // Mostrar mensaje de éxito con SweetAlert
              Swal.fire(
                'Bienvenido a la tienda en linea de ATELIER',
                'Se ha activado tu cuenta, ya puedes continuar.',
                'info'
              ).then(() => {
                // Redirigir al login después de cerrar el modal de SweetAlert
                this.router.navigate(['/auth/Sign-in']);
              });
            });
          }
        },
        (error) => {
          console.error('Error al verificar el código OTP:', error);
          // Manejo de error, por ejemplo mostrando un mensaje al usuario
          Swal.fire(
            'Error',
            'No se pudo activar tu cuenta. Por favor, intenta de nuevo.',
            'error'
          );
        }
      );
    }
  }
}
