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
  styleUrls: ['./recuperar-password.view.scss']
})
export class RecuperarPasswordView {
  preguntas = [
    { label: '¿nombre de tu mejor amigo?', value: 'nombre_amigo' },
    { label: '¿color favorito?', value: 'color_favorito' },
    { label: '¿equipo de futbol?', value: 'equipo_futbol' }
  ];

  frmSeleccionMetodoRecuperacion: FormGroup;
  frmbuscarCorreo: FormGroup;
  frmVerificacion: FormGroup;
  frmPregunta: FormGroup;
  frmActualizaPassword: FormGroup;
  
  value: string | undefined;
  correoIngresado: string = '';

  esFrmCorreo: boolean = false;
  esFrmWhatsapp: boolean = false;
  esFrmPregunta: boolean = false;
  esfrmVerficacion: boolean = false;
  esFrmResetPassword: boolean = false;
  formularioEnviado: boolean = false;




  constructor(public msg: mensageservice, private router: Router, private usuarioService: UsuarioService, private toastr: ToastrService, private formBuilder: FormBuilder) {



    this.frmSeleccionMetodoRecuperacion = this.formBuilder.group({
      opcion: new FormControl('pregunta'),
    });


    this.frmbuscarCorreo = this.formBuilder.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
    })


    this.frmVerificacion = this.formBuilder.group({
      codigo: new FormControl('', [Validators.required])
    })

    this.frmPregunta = this.formBuilder.group({
      pregunta: ['', Validators.required], // Hacer que la pregunta sea requerida
      respuesta: ['', Validators.required],
    })
    
    this.frmActualizaPassword = this.formBuilder.group({
      nueva: new FormControl('', [Validators.required]),
      confirma: new FormControl('', [Validators.required]),
    })
  }

  inputControl: FormControl = new FormControl('');
  ngOnInit() {
    this.inputControl = new FormControl('');
    this.frmbuscarCorreo = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  seleccion() {
    if (this.frmSeleccionMetodoRecuperacion.value.opcion == "correo") {
      this.esFrmCorreo = true;

      console.log('actualizarPasswordxCorreo')
      this.toastr.info(`Has seleccionado la opción de recuperación por correo.`, 'Selección');
    } else if (this.frmSeleccionMetodoRecuperacion.value.opcion == "whatsapp") {
        console.log('actualizarPasswordPorWhatsapp')
      this.toastr.info(`Has seleccionado la opción de recuperación por whatsapp.`, 'Selección');
      this.esFrmWhatsapp = true;
    
    } else if (this.frmSeleccionMetodoRecuperacion.value.opcion == "pregunta") {
        console.log('actualizarPasswordPorPregunta')
      this.toastr.info(`Has seleccionado la opción de recuperación por pregunta.`, 'Selección');
      this.esFrmPregunta = true;
    
    }
     else {
      this.toastr.error(`Debes seleccionar una opción de recuperación.`, 'Error');
    }
    this.formularioEnviado = true;
  }

  enviarYbuscarCorreo() {

    const correo = this.frmbuscarCorreo.value.correo;
    console.log(correo)
    this.esFrmCorreo = true;
    this.usuarioService.enviarCorreo(correo).subscribe((response) => {
      if (response) {
        this.esFrmCorreo = false;
        this.toastr.info(`Revisa tu vandeja de correos.`, 'Envio');
        this.msg.enviarCorreo(correo).subscribe(
          () => {
            this.toastr.success('Correo electrónico enviado correctamente');
            this.esfrmVerficacion = true;
          },
          (error) => {
            console.error('Error al enviar correo electrónico:', error);
            this.toastr.error('Error al enviar correo electrónico');
            this.esfrmVerficacion = false;
          }
        );
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
    )
  }
  enviarCorreoElectronico(correo: string, mensaje: string) {
    console.log(`Enviando correo electrónico a ${correo} con el mensaje: ${mensaje}`);
  }



  enviarRespuesta() {
    this.esFrmPregunta = false;
    this.esFrmResetPassword = true;

    const pregunta = this.frmPregunta.get('pregunta')?.value
    const respuesta = this.frmPregunta.value.respuesta;

    console.log("respuesta=>", respuesta)
    console.log("pregunta=>", pregunta)

    if (pregunta == '' || respuesta == '') {
      Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');

      this.esFrmPregunta = true;
      // this.esFrmResetPassword = false;
      return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
    } 
    
    
    
    this.usuarioService.enviarDatos(pregunta, respuesta).subscribe((response) => {

      console.log(response)
      if (response) {
        this.esFrmPregunta = false;
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
    )
  }

  // comparacion de token en el usuario
  verficarCodigo() {
    this.esFrmCorreo = false;
    const correo = this.frmbuscarCorreo.value.correo;
    console.log("correo desde html=>", correo)
    
    const token = this.frmVerificacion.get('codigo')?.value;
    console.log("token desde html=>", token)





    this.usuarioService.enviarToken(correo, token).subscribe((response) => {
    
      console.log(response)
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
    )
  }


  
  ValidaPass(nueva: string, confirma: string): boolean {

    return nueva === confirma;
  }

  




  actualizarPasswordxCorreo() {
    
    this.esFrmResetPassword = true;
    const token = this.frmVerificacion.get('codigo')?.value;
    const correo = this.frmbuscarCorreo.value.correo;
    const nueva = this.frmActualizaPassword.get('nueva')?.value;
    console.log(nueva)
    const confirma = this.frmActualizaPassword.get('confirma')?.value;

    // Verifica que las contraseñas sean cadenas
    if (typeof nueva !== 'string'  ||  typeof confirma !== 'string') {
      // Si alguna de las contraseñas no es una cadena, muestra un mensaje de error y retorna
      Swal.fire('Error', 'Las contraseñas no son válidas', 'error');
      // this.esFrmResetPassword = true;

      return;
    }else if (nueva !== confirma) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      // this.esFrmResetPassword = true;
      return;

    }

    
    // Realiza la actualización de la contraseña
    this.usuarioService.actualizaPasswordxCorreo(token, correo, nueva).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          Swal.fire('¡Operación exitosa!', 'Se actualizó tu contraseña', 'success');
          this.router.navigate(['/login']); // Redirige al home del cliente
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



  actualizarPasswordPorPregunta() {
    
    this.esFrmResetPassword = true;

    const pregunta = this.frmPregunta.get('pregunta')?.value
    const respuesta = this.frmPregunta.value.respuesta;

    console.log("respuesta=>", respuesta)
    console.log("pregunta=>", pregunta)

    if (pregunta =='' || respuesta=='') {
      Swal.fire('Error', 'Por favor selecciona una pregunta', 'error');

      this.esFrmPregunta = true;
      // this.esFrmResetPassword = false;
      return; // No permitir enviar el formulario si no se ha seleccionado una pregunta
    } else {
    
    

      this.esFrmPregunta = false;
      this.esFrmResetPassword = true;

      const nueva = this.frmActualizaPassword.get('nueva')?.value;
      console.log(nueva)

    this.usuarioService.actualizaPasswordxPregunta(pregunta, respuesta,nueva).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          Swal.fire('¡Operación exitosa!', 'Se actualizó tu contraseña', 'success');



          console.log('Inicio de sesión exitoso:', response);
          if (response && response.rol && response.rol=="admin") {
            const rol = response.rol;
            // const token = response.token;
            // localStorage.setItem('token', token);
            localStorage.setItem('rol', rol);


            



          }





          this.router.navigate(['/login']); // Redirige al home del cliente
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
  }

  




  actualizarPassword() {
    
    if (this.frmSeleccionMetodoRecuperacion.value.opcion == 'pregunta') {
      this.actualizarPasswordPorPregunta();
      console.log('actualizarPasswordPorPregunta')
    } else if (this.frmSeleccionMetodoRecuperacion.value.opcion =='whatsapp'){
      console.log('actualizarPasswordxWhatsapp')
      this.actualizarPasswordxCorreo();
    
    } else if (this.frmSeleccionMetodoRecuperacion.value.opcion =='correo'){
      console.log('actualizarPasswordxCorreo')
      this.actualizarPasswordxCorreo();
    }
  }
  
}