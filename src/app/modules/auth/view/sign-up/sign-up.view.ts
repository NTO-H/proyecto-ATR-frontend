import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from '../../../../shared/models/usuario.model';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { UsuarioService } from '../../../../shared/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up.view.html',
  styleUrls: ['./sign-up.view.scss','./listacard.scss'],
})
export class SignUpView implements OnInit {
  formulario!: FormGroup;
  passwordStrength: string = '';
  strengthColor: string = '';
  coincidenPasswords: boolean = true;
  mostrarPassword: boolean = false; 
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
    tel: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private fb: FormBuilder,private uservice: UsuarioService) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
      acceptTerms: [false, Validators.requiredTrue]
    });

    // Validar coincidencia de contraseñas
    this.formulario.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.verificarCoincidencia();
    });

    this.formulario.get('username')?.valueChanges.subscribe(() => {
      this.errorMessages.username = '';
    });
    this.formulario.get('email')?.valueChanges.subscribe(() => {
      this.errorMessages.email = '';
    });

    // Validar número de teléfono y limpiar mensajes de error
    this.formulario.get('tel')?.valueChanges.subscribe(() => {
      const numeroTelefono = this.formulario.get('tel')?.value;
      this.errorMessages.tel = ''; // Limpiar mensaje de error inicialmente
      if (numeroTelefono && !isValidPhoneNumber(numeroTelefono, 'MX')) {
        this.errorMessages.tel = 'Número telefónico inválido.';
      }
    });
    
  }

  togglePasswordVisibility() {
    this.mostrarPassword = !this.mostrarPassword; // Cambia el estado de la visibilidad
  }

  // Verificar la fortaleza de la contraseña
  verificarPassword() {
    const password = this.formulario.get('password')?.value;

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
    const password = this.formulario.get('password')?.value;
    const confirmPassword = this.formulario.get('confirmPassword')?.value;

    this.coincidenPasswords = password === confirmPassword;
  }

  // Registrar cliente
  registroCliente() {
    if (this.formulario.valid) {
      const USUARIO: Usuario = {
        nombre: this.formulario.get('username')?.value,
        email: this.formulario.get('email')?.value,
        telefono: this.formulario.get('tel')?.value,
        password: this.formulario.get('password')?.value,
      };

      this.uservice.register(USUARIO).subscribe(
        (response) => {
          Swal.fire('Exitoso', 'El registro fue exitoso', 'success');
          this.formulario.reset(); // Resetea el formulario después del registro
        },
        (error) => {
          console.error(error);
          this.resetErrorMessages(); // Limpiar mensajes de error antes de asignar nuevos
          if (error.status === 400) {
            this.errorMessages.username = error.error.message.includes('usuario') ? error.error.message : '';
            this.errorMessages.email = error.error.message.includes('email') ? error.error.message : '';
            this.errorMessages.tel = error.error.message.includes('telefono') ? error.error.message : '';
          } else {
            this.errorMessages.username = 'Ocurrió un error, por favor intenta nuevamente.';
          }
        }
      );
    } else {
      this.validateFormFields();
    }
  }

  // Validar campos del formulario
  validateFormFields() {
    if (this.formulario.get('username')?.invalid) {
      this.errorMessages.username = 'El nombre de usuario es requerido.';
    }
    if (this.formulario.get('email')?.invalid) {
      this.errorMessages.email = 'El correo electrónico debe ser válido.';
    }
    if (this.formulario.get('tel')?.invalid) {
      this.errorMessages.tel =
        'El número telefónico es requerido y debe ser válido.';
    }
    if (this.formulario.get('password')?.invalid) {
      this.errorMessages.password = 'La contraseña es requerida.';
    }
    if (this.formulario.get('confirmPassword')?.invalid) {
      this.errorMessages.confirmPassword = 'Por favor confirma tu contraseña.';
    }
  }

  // Restablecer mensajes de error
  resetErrorMessages() {
    this.errorMessages = {
      username: '',
      email: '',
      tel: '',
      password: '',
      confirmPassword: '',
    };
  }
}