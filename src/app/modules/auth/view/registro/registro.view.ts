import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { mensageservice } from '../../../../shared/services/mensage.service';
import Swal from 'sweetalert2';
import { SessionService } from '../../../../shared/services/session.service';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from 'libphonenumber-js';
import axios from 'axios';

declare const $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.view.html',
  styleUrls: [
    './registro.view.scss',
    '../../../../shared/styles/notificaciones.scss',
  ],
})
export class RegistroView {
  currentStep = 1;
  passwordStrengthClass: string = ''; // Clase CSS que se aplica dinámicamente
  passwordStrengthMessage: string = ''; // Mensaje dinámico que se muestra debajo del campo

  verificationCode: string = '';
  remainingChars: number = 12;
  emailError: string | null = null;
  passwordStrength: string = ''; // variable para almacenar la fuerza de la contraseña
  personalDataForm: FormGroup;
  credentialsForm: FormGroup;
  otpForm: FormGroup; // Para Gmail
  otpWhatsappForm: FormGroup; // Nuevo para WhatsApp

  displayModal: boolean = false;
  isLoadingBasic: boolean = false;
  displayCode: boolean = false;
  displayGmailModal: boolean = false;
  displaySmsModal: boolean = false;
  displayWhatsappModal: boolean = false;
  // .t: string | null = null; // Puede ser null si no hay token aún
  tokenRespuesta: string | null = null; // Puede ser null si no hay token aún
  isLoading = false; // Controla la visibilidad del spinner
  detectedCountry: string | null = null;
  isPasswordCompromised: boolean = false;

  showSpinner() {
    this.isLoading = true;
    $('.ui.segment').modal('show'); // Muestra el modal con jQuery o Semantic UI

    // Simula una carga y oculta el spinner después de 3 segundos
    setTimeout(() => {
      this.hideSpinner();
    }, 3000);
  }
  get email() {
    return this.personalDataForm.get('email');
  }
  hideSpinner() {
    this.isLoading = false;
    $('.ui.segment').modal('hide'); // Oculta el modal
  }
  constructor(
    private router: Router,
    private msgs: mensageservice,
    private fb: FormBuilder,
    private uservice: UsuarioService,
    private sessionService_: SessionService,
    private mensageservice_: mensageservice,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {
    this.personalDataForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(40),
          Validators.pattern(
            /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+( [A-Za-zÁÉÍÓÚáéíóúÜüÑñ]+)*$/
          ), // Permitir letras y espacios
        ],
      ],

      email: [
        '',
        [
          Validators.required,
          this.emailValidator(),
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      telefono: ['', [Validators.required, this.telefonoValidator]],
    });

    this.credentialsForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    // Inicialización de otpForm (Gmail) y otpWhatsappForm (WhatsApp)
    this.otpForm = this.fb.group({
      otpCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });

    this.otpWhatsappForm = this.fb.group({
      otpCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }
  

  telefonoValidator(control: AbstractControl) {
    const phoneNumber = control.value;
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);

    if (parsedNumber && isValidPhoneNumber(phoneNumber)) {
      const country = parsedNumber.country; // El país del número
      console.log('El país es:', country);

      return null; // Número válido
    }
    return { invalidPhone: true }; // Número inválido
  }

  emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz|mx|us|uk|es|fr|de|ca|au|jp|xyz|me|tech|co|tv|cloud|ai)$/;

      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  endsWithSpace(value: string): boolean {
    return /\s$/.test(value);
  }
  updateRemainingChars(): void {
    if (this.personalDataForm.get('username')?.value) {
      this.remainingChars =
        this.remainingChars -
        this.personalDataForm.get('username')?.value.length;
    }
  }

  //   const emailControl = this.personalDataForm.get('email');
  //   const emailValue = emailControl?.value || '';

  //   if (/\s/.test(emailValue)) {
  //     this.emailError = 'El correo no debe contener espacios.';
  //   } else if (!emailControl?.valid && emailControl?.touched) {
  //     this.emailError = 'El correo tiene un formato inválido.';
  //   } else {
  //     this.emailError = null;
  //   }
  // }
  // Generar código de verificación
  generateCode(option: string) {
    this.displayModal = false; // Cierra el modal principal
    // this.showSpinner();
    if (option === 'gmail') {
      this.resendCodeGmail();
    } else if (option === 'whatsapp') {
      this.resendCodeWhatsapp();
    }
  }

  // Avanzar al siguiente paso del formulario
  goToNextStep() {
    this.personalDataForm.get('otpCode')?.reset();
    // this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    // this.isLoadingBasic = !this.isLoadingBasic;
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 2000);

    if (this.personalDataForm.invalid) {
      // Recolecta los mensajes de error
      let errorMessages = '';

      if (this.personalDataForm.get('username')?.hasError('required')) {
        errorMessages += '• El nombre es obligatorio.<br>';
      }
      if (this.personalDataForm.get('username')?.hasError('maxlength')) {
        errorMessages += '• El nombre no puede tener más de 12 caracteres.<br>';
      }

      if (this.personalDataForm.get('email')?.hasError('required')) {
        errorMessages += '• El correo es obligatorio.<br>';
      }
      if (this.personalDataForm.get('email')?.hasError('pattern')) {
        errorMessages += '• El formato del correo no es válido.<br>';
      }

      if (this.personalDataForm.get('telefono')?.hasError('required')) {
        errorMessages += '• El número telefónico es obligatorio.<br>';
      }
      if (this.personalDataForm.get('telefono')?.hasError('pattern')) {
        errorMessages +=
          '• El número telefónico debe contener exactamente 10 dígitos.<br>';
      }

      // Muestra el alert con los errores
      Swal.fire({
        icon: 'error',
        title: 'Errores en el formulario',
        html: errorMessages,
        confirmButtonText: 'Ok',
      });
      this.personalDataForm.markAllAsTouched(); // Marca todos los campos como tocados

      // Desactiva el estado de carga
      this.isLoadingBasic = false;
    } else {
      this.showSpinner();
      // isLoadingBasic
      const email = this.personalDataForm.get('email')?.value;
      const telefono = this.personalDataForm.get('telefono')?.value;

      this.uservice.checkEmailExists(email).subscribe({
        next: () => {},
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El email ya está registrado', // Mensaje simple de error
            confirmButtonText: 'Ok',
          });
          this.hideSpinner();
        },
      });

      this.uservice.checkTelefonoExists(telefono).subscribe({
        next: () => {
          this.isLoadingBasic = false;
          // Si no hay errores, mostrar el modal
          this.displayModal = true;
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.message, // Mensaje de error
            confirmButtonText: 'Ok',
          });
          this.hideSpinner();
        },
      });
    }
  }

  // Obtiene los controles inválidos y sus nombres
  getInvalidControls() {
    const invalidControls: {
      controlName: string;
      errors: ValidationErrors | null;
    }[] = [];

    Object.keys(this.personalDataForm.controls).forEach((controlName) => {
      const control = this.personalDataForm.get(controlName);
      if (control && control.invalid) {
        invalidControls.push({ controlName, errors: control.errors });
      }
    });

    return invalidControls;
  }

  // Mapea los errores a mensajes legibles
  getErrorMessages(errors: ValidationErrors | null): string {
    const messages: string[] = [];

    if (errors?.['required']) {
      messages.push('El campo es obligatorio.');
    }
    if (errors?.['maxlength']) {
      messages.push(`El campo excede la longitud máxima permitida.`);
    }
    if (errors?.['pattern']) {
      messages.push(`El formato ingresado no es válido.`);
    }

    return messages.join(' ');
  }
  // Retroceder al paso anterior
  goToPreviousStep() {
    this.currentStep = 1;
  }

  // Enviar formulario final
  onSubmit() {
    if (this.credentialsForm.valid) {
      console.log('Formulario enviado:', {
        ...this.personalDataForm.value,
        ...this.credentialsForm.value,
      });
    }
  }

  //! Método para veirificar el código OTP por WhatsApp
  submitOtpWhatsapp() {
    this.showSpinner();
    if (this.otpWhatsappForm.valid) {
      const otpCode = this.otpWhatsappForm.value.otpCode;
      // Obtener el token almacenado previamente
      const tokenRespuesta = this.tokenRespuesta; // Este token debería haberse obtenido al enviar el código

      console.log('tokenRespuesta:', tokenRespuesta);
      if (tokenRespuesta) {
        // Decodificar y validar el token
        const decodedData = this.sessionService_.getUserTokenDecode(
          tokenRespuesta,
          otpCode
        );

        if (decodedData) {
          this.hideSpinner();
          console.log('Código OTP verificado correctamente.');
          Swal.fire(
            'Éxito',
            'El código de verificación es correcto.',
            'success'
          );
          this.currentStep = 2;
          this.displayGmailModal = false;
        } else {
          this.hideSpinner();

          // console.warn('El código OTP proporcionado no es correcto.');
          Swal.fire(
            'Error',
            'El código de verificación es incorrecto.',
            'error'
          );
        }
      } else {
        this.hideSpinner();

        // console.error('No se encontró un token para validar.');
        Swal.fire(
          'Error',
          'No se pudo validar el código de verificación.',
          'error'
        );
      }
    } else {
      this.hideSpinner();

      console.log('Código OTP (Gmail) inválido.');
      Swal.fire('Error', 'Por favor ingrese un código válido.', 'error');
    }
  }

  //! Método para veirificar el código OTP por Gmail
  submitOtp() {
    this.showSpinner();
    if (this.otpForm.valid) {
      const otpCode = this.otpForm.value.otpCode;
      // Obtener el token almacenado previamente
      const tokenRespuesta = this.tokenRespuesta; // Este token debería haberse obtenido al enviar el código

      console.log('tokenRespuesta:', tokenRespuesta);
      if (tokenRespuesta) {
        // Decodificar y validar el token
        const decodedData = this.sessionService_.getUserTokenDecode(
          tokenRespuesta,
          otpCode
        );

        if (decodedData) {
          this.hideSpinner();
          console.log('Código OTP verificado correctamente.');
          Swal.fire(
            'Éxito',
            'El código de verificación es correcto.',
            'success'
          );
          this.currentStep = 2;
          this.displayGmailModal = false;
        } else {
          this.hideSpinner();

          // console.warn('El código OTP proporcionado no es correcto.');
          Swal.fire(
            'Error',
            'El código de verificación es incorrecto.',
            'error'
          );
        }
      } else {
        this.hideSpinner();

        // console.error('No se encontró un token para validar.');
        Swal.fire(
          'Error',
          'No se pudo validar el código de verificación.',
          'error'
        );
      }
    } else {
      this.hideSpinner();

      console.log('Código OTP (Gmail) inválido.');
      Swal.fire('Error', 'Por favor ingrese un código válido.', 'error');
    }
  }

  validacionesPassword = {
    tieneMinuscula: false,
    tieneMayuscula: false,
    tieneNumero: false,
    tieneSimbolo: false,
    longitudMinima: false,
    longitudMayor5: false,
    tiene5CaracteresDiferentes: false,
  };
  coincidenPasswords = false;

  // Validar contraseña  // Verificar la contraseña
  verificarPassword() {
    const password = this.credentialsForm.get('password')?.value;

    // Verificar la fortaleza de la contraseña
    this.checkPasswordStrength(password);

    // Verificar si la contraseña está comprometida
    this.checkIfPasswordIsPwned(password);
  }

  // Verificar la fortaleza de la contraseña
  checkPasswordStrength(password: string) {
    if (password.length < 8) {
      this.passwordStrengthMessage =
        'La contraseña debe tener al menos 8 caracteres.';
      this.passwordStrengthClass = 'text-danger';
    } else if (
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password)
    ) {
      this.passwordStrengthMessage =
        'La contraseña debe contener letras y números.';
      this.passwordStrengthClass = 'text-warning';
    } else {
      this.passwordStrengthMessage = 'Contraseña fuerte';
      this.passwordStrengthClass = 'text-success';
    }
  }

  // Verificar si la contraseña está comprometida
  async checkIfPasswordIsPwned(password: string) {
    const hash = await this.getPasswordHash(password);
    const prefix = hash.slice(0, 5); // Primeros 5 caracteres
    const suffix = hash.slice(5); // El resto del hash

    try {
      const response = await axios.get(
        `https://api.pwnedpasswords.com/range/${prefix}`
      );
      const matches = response.data.split('\n');

      this.isPasswordCompromised = false; // Resetear estado

      for (let match of matches) {
        const [matchHash, count] = match.split(':');
        if (matchHash === suffix) {
          this.isPasswordCompromised = true; // Contraseña comprometida
          this.toastr.error(
            `¡Esta contraseña ha sido comprometida! Se ha encontrado ${count} veces.`,
            'Advertencia',
            {
              toastClass: 'toast error', // Aplica tus estilos personalizados
            }
          );
          break;
        }
      }

      if (!this.isPasswordCompromised) {
        this.passwordStrengthClass = 'text-success'; // Si no está comprometida, mantener mensaje positivo
      }
    } catch (error) {
      console.error('Error al verificar la contraseña', error);
    }
  }

  // Generar hash SHA-1 usando la Web Crypto API
  async getPasswordHash(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    return hashHex.toUpperCase();
  }

  // Validador de fuerza de la contraseña
  passwordStrengthValidator() {
    return () => {
      const password = this.credentialsForm.get('password')?.value || '';
      const isValid =
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        password.length >= 8;

      return isValid ? null : { passwordStrength: true };
    };
  }

  // Verificar si las contraseñas coinciden
  verificarCoincidencia() {
    const password = this.credentialsForm.get('password')?.value;
    const confirmPassword = this.credentialsForm.get('confirmPassword')?.value;
    this.coincidenPasswords = password === confirmPassword;
  }

  registroCliente(): void {
    if (this.personalDataForm.valid && this.credentialsForm.valid) {
      const username = this.personalDataForm.get('username')?.value;
      const email = this.personalDataForm.get('email')?.value;
      const telefono = this.personalDataForm.get('telefono')?.value;
      const password = this.credentialsForm.get('password')?.value;

      // Crear el objeto USUARIO accediendo campo por campo
      const USUARIO = {
        nombre: username,
        email: email,
        telefono: telefono,
        password: password,
      };

      this.showSpinner();
      // Llama al servicio de registro, asumiendo que tienes un servicio de usuario
      this.uservice.register(USUARIO).subscribe(
        (response) => {
          // Swal.fire('Exitoso', 'El registro fue exitoso', 'success');
          this.personalDataForm.reset(); // Resetea el formulario de datos básicos
          // this.datosConfidencialesForm.reset(); // Resetea el formulario de datos confidenciales
          // this.politicasForm.reset(); // Resetea el formulario de políticas
          this.hideSpinner();
          Swal.fire(
            'Bienvenido a la tienda en linea de ATELIER',
            'Se ha activado tu cuenta, ya puedes continuar.',
            'info'
          ).then(() => {
            // Redirigir al login después de cerrar el modal de SweetAlert
            this.router.navigate(['/public/home']);
          });
        },
        (error) => {
          console.error(error);
          // this.resetErrorMessages(); // Limpia mensajes de error antes de asignar nuevos

          // Extract the error message from the response (adjust as per your backend structure)
          const errorMessage =
            error.error?.message || 'An unknown error occurred';

          // Display the backend error message using Toastr
          this.toastr.error(errorMessage, 'Error');
        }
      );
    }
  }

  // Método para reenviar el código por WhatsApp

  resendCodeWhatsapp() {
    this.showSpinner();
    const number_to_send = this.personalDataForm.get('telefono')?.value;
    this.mensageservice_.enviarTokenWasthapp(number_to_send).subscribe({
      next: (response) => {
        this.tokenRespuesta = response.token;
        this.hideSpinner();
        console.log('Token recibido:', this.tokenRespuesta);

        this.personalDataForm.get('otpCode')?.reset();

        this.displayWhatsappModal = true; // Muestra el modal de WhatsApp
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el código. Por favor, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  resendCodeGmail() {
    this.showSpinner();

    const email = this.personalDataForm.get('email')?.value;

    this.mensageservice_.enviarTokenCorreo(email).subscribe({
      next: (response) => {
        this.tokenRespuesta = response.token;
        console.log('Token recibido:', this.tokenRespuesta);

        this.hideSpinner();

        this.displayGmailModal = true; // Muestra el modal de WhatsApp
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el código. Por favor, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  resendCodeByOtherMethod() {
    if (this.displayGmailModal) {
      this.displayGmailModal = false;
      Swal.fire({
        title: 'Seleccione un método',
        text: '¿Cómo desea recibir el código de verificación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'WhatsApp',
        // cancelButtonText: 'SMS',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resendCodeWhatsapp(); // Llama al método de envío por WhatsApp
        }
        // else {
        //   this.resendCodeSMS(); // Llama al método para SMS
        // }
      });
    } else if (this.displayWhatsappModal) {
      this.displayWhatsappModal = false;
      Swal.fire({
        title: 'Seleccione un método',
        text: '¿Cómo desea recibir el código de verificación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Gmail',
        // cancelButtonText: 'SMS',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resendCodeGmail(); // Llama al método de envío por Gmail
        }
        //  else {
        //   this.resendCodeSMS(); // Llama al método para SMS
        // }
      });
    }
  }
}
