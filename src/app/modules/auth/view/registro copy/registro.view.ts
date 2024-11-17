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

@Component({
  selector: 'app-registro',
  templateUrl: './registro.view.html',
  styleUrls: ['./registro.view.scss'],
})
export class RegistroView {
  currentStep = 1;
  verificationCode: string = '';
  remainingChars: number = 15;
  emailError: string | null = null;

  personalDataForm: FormGroup;
  credentialsForm: FormGroup;
  otpForm: FormGroup; // Para Gmail
  otpWhatsappForm: FormGroup; // Nuevo para WhatsApp

  displayModal: boolean = false;
  displayCode: boolean = false;
  displayGmailModal: boolean = false;
  displaySmsModal: boolean = false;
  displayWhatsappModal: boolean = false;
  // .t: string | null = null; // Puede ser null si no hay token aún
  tokenRespuesta: string | null = null; // Puede ser null si no hay token aún

  constructor(
    private router: Router,
    private msgs: mensageservice,
    private fb: FormBuilder,
    private uservice: UsuarioService,
    private sessionService_: SessionService,
    private mensageservice_: mensageservice,
    private toastr: ToastrService
  ) {
    this.personalDataForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(15)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Regex para validar correos sin espacios y con formato válido
          ),
        ],
      ],
      telefono: ['', [Validators.required]],
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
  updateRemainingChars() {
    const usernameValue = this.personalDataForm.get('username')?.value || '';
    this.remainingChars = 15 - usernameValue.length;
  }
  validateEmail() {
    const emailControl = this.personalDataForm.get('email');
    const emailValue = emailControl?.value || '';

    if (/\s/.test(emailValue)) {
      this.emailError = 'El correo no debe contener espacios.';
    } else if (!emailControl?.valid && emailControl?.touched) {
      this.emailError = 'El correo tiene un formato inválido.';
    } else {
      this.emailError = null;
    }
  }
  // Generar código de verificación
  generateCode(option: string) {
    this.displayModal = false; // Cierra el modal principal
    if (option === 'gmail') {
      const email = this.personalDataForm.get('email')?.value;

      this.mensageservice_.enviarTokenCorreo(email).subscribe((response) => {
        this.tokenRespuesta = response.token;
        console.log(this.tokenRespuesta);

        // Decodificar el token
        // const decodedData = this.sessionService_.getUserTokenDecode(tokenRespuesta);
        // console.log('Datos decodificados:', decodedData);

        Swal.fire(
          'Verificación',
          'El código de verificación ha sido enviado',
          'info'
        );
        this.displayGmailModal = true; // Muestra el modal de Gmail
      });
    } else if (option === 'whatsapp') {
      const number_to_send = this.personalDataForm.get('telefono')?.value;
      this.mensageservice_
        .enviarTokenWasthapp(number_to_send)
        .subscribe((response) => {
          this.tokenRespuesta = response.token;
          console.log(this.tokenRespuesta);
          Swal.fire(
            'Verificación',
            'El código de verificación ha sido enviado',
            'info'
          );

          this.displayWhatsappModal = true; // Muestra el modal de WhatsApp
        });
    }
  }

  // Avanzar al siguiente paso del formulario
  goToNextStep() {
    this.personalDataForm.get('otpCode')?.reset();
    if (this.personalDataForm.invalid) {
      // Recolecta los mensajes de error
      let errorMessages = '';

      if (this.personalDataForm.get('username')?.hasError('required')) {
        errorMessages += '• El nombre es obligatorio.<br>';
      }
      if (this.personalDataForm.get('username')?.hasError('maxlength')) {
        errorMessages += '• El nombre no puede tener más de 15 caracteres.<br>';
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
    } else {
      const email = this.personalDataForm.get('email')?.value;
      this.uservice.checkEmailExists(email).subscribe({
        next: () => {
          // Si no hay errores, mostrar el modal
          this.displayModal = true;
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El email ya está registrado', // Mensaje simple de error
            confirmButtonText: 'Ok',
          });
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

  // Reenviar código de verificación
  resendCode() {
    this.otpForm.get('otpCode')?.reset(); // Limpia el valor del campo 'otpCode'

    const email = this.personalDataForm.get('email')?.value;

    this.mensageservice_.enviarTokenCorreo(email).subscribe((response) => {
      this.tokenRespuesta = response.token;
      console.log(this.tokenRespuesta);

      Swal.fire(
        'Verificación',
        'El código de verificación ha sido enviado',
        'info'
      );
      this.personalDataForm.get('otpCode')?.reset();
    });
  }
  resendCodeW() {
    this.otpForm.get('otpCode')?.reset(); // Limpia el valor del campo 'otpCode'

    const number_to_send = this.personalDataForm.get('telefono')?.value;
    this.mensageservice_
      .enviarTokenWasthapp(number_to_send)
      .subscribe((response) => {
        this.tokenRespuesta = response.token;
        console.log(this.tokenRespuesta);
        Swal.fire(
          'Verificación',
          'El código de verificación ha sido enviado',
          'info'
        );
        this.personalDataForm.get('otpCode')?.reset();
      });
  }
  // Método para enviar el código OTP por Gmail
  submitOtp() {
    if (this.otpForm.valid) {
      const otpCode = this.otpForm.value.otpCode;
      // console.log('Código OTP (Gmail) enviado:', otpCode);

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
          console.log('Código OTP verificado correctamente.');
          Swal.fire(
            'Éxito',
            'El código de verificación es correcto.',
            'success'
          );
          this.currentStep = 2;
          this.displayGmailModal = false;
        } else {
          console.warn('El código OTP proporcionado no es correcto.');
          Swal.fire(
            'Error',
            'El código de verificación es incorrecto.',
            'error'
          );
        }
      } else {
        console.error('No se encontró un token para validar.');
        Swal.fire(
          'Error',
          'No se pudo validar el código de verificación.',
          'error'
        );
      }
    } else {
      console.log('Código OTP (Gmail) inválido.');
      Swal.fire('Error', 'Por favor ingrese un código válido.', 'error');
    }
  }

  // validateFormFields() {
  //   if (this.personalDataForm.get('username')?.invalid) {
  //     this.errorMessages.username = 'El nombre de usuario es requerido.';
  //   }
  //   if (this.personalDataForm.get('email')?.invalid) {
  //     this.errorMessages.email = 'El correo electrónico debe ser válido.';
  //   }
  //   if (this.datosBasicosForm.get('telefono')?.invalid) {
  //     this.errorMessages.telefono =
  //       'El número telefónico es requerido y debe ser válido.';
  //   }
  //   if (this.datosConfidencialesForm.get('password')?.invalid) {
  //     this.errorMessages.password = 'La contraseña es requerida.';
  //   }
  //   if (this.datosConfidencialesForm.get('confirmPassword')?.invalid) {
  //     this.errorMessages.confirmPassword = 'Por favor confirma tu contraseña.';
  //   }
  // }

  // Restablecer mensajes de error
  // resetErrorMessages() {
  //   this.errorMessages = {
  //     username: '',
  //     email: '',
  //     telefono: '',
  //     password: '',
  //     confirmPassword: '',
  //   };
  // }// Validador personalizado para validar la fortaleza de la contraseña

  validacionesPassword = {
    tieneMinuscula: false,
    tieneMayuscula: false,
    tieneNumero: false,
    longitudMinima: false,
  };
  coincidenPasswords = false;

  verificarPassword() {
    const password = this.credentialsForm.get('password')?.value || '';
    this.validacionesPassword.tieneMinuscula = /[a-z]/.test(password);
    this.validacionesPassword.tieneMayuscula = /[A-Z]/.test(password);
    this.validacionesPassword.tieneNumero = /\d/.test(password);
    this.validacionesPassword.longitudMinima = password.length >= 8;

    this.verificarCoincidencia();
  }
  verificarCoincidencia() {
    const password = this.credentialsForm.get('password')?.value;
    const confirmPassword = this.credentialsForm.get('confirmPassword')?.value;
    this.coincidenPasswords = password == confirmPassword;
  }
  // Validador para comparar contraseña y confirmación
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

      // Llama al servicio de registro, asumiendo que tienes un servicio de usuario
      this.uservice.register(USUARIO).subscribe(
        (response) => {
          // Swal.fire('Exitoso', 'El registro fue exitoso', 'success');
          this.personalDataForm.reset(); // Resetea el formulario de datos básicos
          // this.datosConfidencialesForm.reset(); // Resetea el formulario de datos confidenciales
          // this.politicasForm.reset(); // Resetea el formulario de políticas

          Swal.fire(
            'Bienvenido a la tienda en linea de ATELIER',
            'Se ha activado tu cuenta, ya puedes continuar.',
            'info'
          ).then(() => {
            // Redirigir al login después de cerrar el modal de SweetAlert
            this.router.navigate(['/auth/Sign-in']);
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
          // Maneja errores específicos
          // if (error.status === 400) {

          // } else {
          //   this.errorMessages.username =
          //     'Ocurrió un error, por favor intenta nuevamente.';
          // }
        }
      );
    } else {
      // Llama a una función para validar los campos de los formularios
      // this.validateFormFields();
    }
  }

  // Método para enviar el código OTP por WhatsApp
  submitOtpWhatsapp() {
    if (this.otpWhatsappForm.valid) {
      console.log(
        'Código OTP (WhatsApp) enviado:',
        this.otpWhatsappForm.value.otpCode
      );
    } else {
      console.log('Código OTP (WhatsApp) inválido.');
    }
  }

  // Método para reenviar el código por WhatsApp

  resendCodeWhatsapp() {
    const number_to_send = this.personalDataForm.get('telefono')?.value;

    this.mensageservice_.enviarTokenWasthapp(number_to_send).subscribe({
      next: (response) => {
        this.tokenRespuesta = response.token;
        console.log('Token recibido:', this.tokenRespuesta);

        Swal.fire({
          title: 'Verificación',
          text: 'El código de verificación ha sido enviado por WhatsApp.',
          icon: 'info',
          confirmButtonText: 'Ok',
        });

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
    const email = this.personalDataForm.get('email')?.value;

    this.mensageservice_.enviarTokenCorreo(email).subscribe({
      next: (response) => {
        this.tokenRespuesta = response.token;
        console.log('Token recibido:', this.tokenRespuesta);

        Swal.fire({
          title: 'Verificación',
          text: 'El código de verificación ha sido enviado por email.',
          icon: 'info',
          confirmButtonText: 'Ok',
        });

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
        cancelButtonText: 'SMS',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resendCodeWhatsapp(); // Llama al método de envío por WhatsApp
        } else {
          this.resendCodeSMS(); // Llama al método para SMS
        }
      });
    } else if (this.displayWhatsappModal) {
      this.displayWhatsappModal = false;
      Swal.fire({
        title: 'Seleccione un método',
        text: '¿Cómo desea recibir el código de verificación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Gmail',
        cancelButtonText: 'SMS',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resendCodeGmail(); // Llama al método de envío por Gmail
        } else {
          this.resendCodeSMS(); // Llama al método para SMS
        }
      });
    }
  }
  

  // Método ficticio para SMS como ejemplo
  resendCodeSMS() {
    const number_to_send = this.personalDataForm.get('telefono')?.value;

    this.mensageservice_.enviarTokenSMS(number_to_send).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Verificación',
          text: 'El código de verificación ha sido enviado por SMS.',
          icon: 'info',
          confirmButtonText: 'Ok',
        });

        this.displaySmsModal = true; // Muestra otro modal si se usa SMS
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el código por SMS. Por favor, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }
}
