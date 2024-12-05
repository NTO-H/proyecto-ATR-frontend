import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../../shared/models/usuario.model';
import { ActivatedRoute, Route } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { response } from 'express';
// import { Console } from 'console';
import { MessageService } from 'primeng/api';
import { TREESELECT_VALUE_ACCESSOR } from 'primeng/treeselect';
import { mensageservice } from '../../../../shared/services/mensage.service';
import { UsuarioService } from '../../../../shared/services/usuario.service';

@Component({
  selector: 'app-recuperacion-password',
  templateUrl: './recuperar-password.view.html',
  styleUrls: ['./recuperar-password.view.scss'],
})
export class RecuperarPasswordView {
  preguntas = [
    { label: '¿nombre de tu mejor amigo?', value: 'nombre_amigo' },
    { label: '¿color favorito?', value: 'color_favorito' },
    { label: '¿equipo de futbol?', value: 'equipo_futbol' },
  ];

  frmSeleccionMetodoRecuperacion: FormGroup;
  frmbuscarCorreo: FormGroup;
  frmVerificacion: FormGroup;
  frmPregunta: FormGroup;
  frmActualizaPassword: FormGroup;
  validacionesPassword = {
    tieneMinuscula: false,
    tieneMayuscula: false,
    tieneNumero: false,
    longitudMinima: false,
  };
  value: string | undefined;
  correoIngresado: string = '';

  esFrmCorreo: boolean = true;
  esFrmWhatsapp: boolean = false;
  esFrmPregunta: boolean = false;
  esfrmVerficacion: boolean = false;
  esFrmResetPassword: boolean = false;
  formularioEnviado: boolean = false;
  coincidenPasswords: boolean = true;
  passwordStrength: string = '';
  strengthColor: string = '';
  constructor(
    public msg: mensageservice,
    private router: Router,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.frmSeleccionMetodoRecuperacion = this.formBuilder.group({
      opcion: new FormControl('pregunta'),
    });
    this.frmbuscarCorreo = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.frmVerificacion = this.formBuilder.group({
      codigo: new FormControl('', [Validators.required]),
    });

    this.frmPregunta = this.formBuilder.group({
      pregunta: ['', Validators.required], // Hacer que la pregunta sea requerida
      respuesta: ['', Validators.required],
    });

    this.frmActualizaPassword = this.formBuilder.group({
      nueva: new FormControl('', [Validators.required]),
      confirma: new FormControl('', [Validators.required]),
    });
  }

  inputControl: FormControl = new FormControl('');
  ngOnInit() {
    this.inputControl = new FormControl('');
    this.frmbuscarCorreo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  verificarCoincidencia() {
    const nueva = this.frmActualizaPassword.get('nueva')?.value;
    const confirma = this.frmActualizaPassword.get('confirma')?.value;

    this.coincidenPasswords = nueva === confirma;
  }


  enviarYbuscarCorreo() {
    const email = this.frmbuscarCorreo.get('email')?.value;
    console.log(email);
    this.esFrmCorreo = true;
    this.usuarioService.enviarCodido(email).subscribe(
      (response) => {
        if (response) {
          this.esFrmCorreo = false;
          this.toastr.info(`Revisa tu vandeja de correos.`, 'Envio');
           this.esfrmVerficacion = true;
          //     // Aquí puedes implementar más lógica si es necesario, como obtener un token de verificación o actualizar el estado de la aplicación
          this.msg.enviarNotificacion().subscribe({});
        
        } else {
          this.esFrmCorreo = true;
          this.toastr.error('El correo no fue encontrado', 'Error');
          this.esfrmVerficacion = false;
        }
      },
      (error) => {
        console.error('No se encontró el correo:', error);
        this.toastr.error('No se encontró el correo', 'Error');
      }
    );
  }

  // enviarRespuesta() {
  //   this.esFrmPregunta = false;
  //   this.esFrmResetPassword = true;

  //   const pregunta = this.frmPregunta.get('pregunta')?.value;
  //   const respuesta = this.frmPregunta.value.respuesta;

  //   console.log('respuesta=>', respuesta);
  //   console.log('pregunta=>', pregunta);

  //   if (pregunta == '' || respuesta == '') {
  //     Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');

  //     this.esFrmPregunta = true;
  //     // this.esFrmResetPassword = false;
  //     return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
  //   }

  //   this.usuarioService.enviarDatos(pregunta, respuesta).subscribe(
  //     (response) => {
  //       console.log(response);
  //       if (response) {
  //         this.esFrmPregunta = false;
  //         this.toastr.success('ya puedes actualizar tu password');

  //         this.esFrmResetPassword = true;
  //       } else {
  //         this.esFrmCorreo = false;
  //         this.toastr.error('El correo no fue encontrado', 'Error');
  //         this.esfrmVerficacion = true;
  //       }
  //     },
  //     (error) => {
  //       console.error('No se encontró el correo:', error);
  //       this.toastr.error('No se encontró el correo', 'Error');
  //     }
  //   );
  // }

  // comparacion de token en el usuario
  verficarCodigo() {
    this.esFrmCorreo = false;
    const email = this.frmbuscarCorreo.value.email;
    console.log('correo desde html=>', email);

    const token = this.frmVerificacion.get('codigo')?.value;
    console.log('token desde html=>', token);

    if (!token || token == null) {
      this.toastr.error('Ingrese el código', 'Error de entrada');
    } else {
      this.usuarioService.enviarToken(email, token).subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.esfrmVerficacion = false;
            // esFrmResetPassword
            this.toastr.success('ya puedes actualizar tu password');

            this.esFrmResetPassword = true;
          } else {
            this.esFrmCorreo = false;
            this.toastr.error('El correo no fue encontrado', 'Error');
            this.esfrmVerficacion = true;
          }
        },
        (error) => {
          console.error('No se encontró el correo:', error);
          this.toastr.error('No se encontró el correo', 'Error');
        }
      );
    }
  }

  ValidaPass(nueva: string, confirma: string): boolean {
    return nueva === confirma;
  }

  actualizarPasswordxCorreo() {
    this.esFrmResetPassword = true;
    // const token = this.frmVerificacion.get('codigo')?.value;
    const email = this.frmbuscarCorreo.value.email;
    const nueva = this.frmActualizaPassword.get('nueva')?.value;
    console.log(nueva);
    const confirma = this.frmActualizaPassword.get('confirma')?.value;

    // Verifica que las contraseñas sean cadenas
    if (typeof nueva !== 'string' || typeof confirma !== 'string') {
      // Si alguna de las contraseñas no es una cadena, muestra un mensaje de error y retorna
      Swal.fire('Error', 'Las contraseñas no son válidas', 'error');
      // this.esFrmResetPassword = true;

      return;
    } else if (nueva !== confirma) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      // this.esFrmResetPassword = true;
      return;
    }

    // Realiza la actualización de la contraseña
    this.usuarioService.actualizaPasswordxCorreo(email, nueva).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          Swal.fire(
            '¡Operación exitosa!',
            'Se actualizó tu contraseña',
            'success'
          );
          this.router.navigate(['/auth/Sign-in']); // Redirige al home del cliente
          this.esFrmResetPassword = false;
        } else {
          this.toastr.error('Los datos no fueron encontrados', 'Error');
          this.esFrmResetPassword = true;
        }
      },
      (error) => {
        this.esFrmResetPassword = false;
        console.error('No se encontró coincidencias:', error);
        // this.toastr.error('Error al actualizar la contraseña', 'Error');
      }
    );
  }


  verificarPassword() {
    const password = this.frmActualizaPassword.get('nueva')?.value;

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

  actualizarPassword() {
   if (this.frmSeleccionMetodoRecuperacion.value.opcion == 'whatsapp') {
      console.log('actualizarPasswordxWhatsapp');
      this.actualizarPasswordxCorreo();
    } else if (this.frmSeleccionMetodoRecuperacion.value.opcion == 'correo') {
      console.log('actualizarPasswordxCorreo');
      this.actualizarPasswordxCorreo();
    }
  }
}
