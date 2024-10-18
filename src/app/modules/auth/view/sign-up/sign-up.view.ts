import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../../../shared/models/usuario.model';
// import Inputmask from 'inputmask';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up-view',
  templateUrl: './sign-up.view.html',
  styleUrls: ['./sign-up.view.scss']
})
export class SignUpView implements OnInit {
  formulario!: FormGroup;
  passwordStrength: string = '';
strengthColor: string = '';
coincidenPasswords: boolean = true;

  validacionesPassword = {
    tieneMinuscula: false,
    tieneMayuscula: false,
    tieneNumero: false,
    longitudMinima: false
  };



  constructor(private  uservice :UsuarioService) {
  }
  

  verificarPassword() {
    const password = this.formulario.get('password')?.value;
    
    this.validacionesPassword.tieneMinuscula = /[a-z]/.test(password);
    this.validacionesPassword.tieneMayuscula = /[A-Z]/.test(password);
    this.validacionesPassword.tieneNumero = /[0-9]/.test(password);
    this.validacionesPassword.longitudMinima = password.length >= 8;
  
    // Determina la fuerza de la contraseña
    const validaciones = Object.values(this.validacionesPassword).filter(v => v).length;
    
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
  
  ngOnInit() {
    
    const inputElement = document.getElementById('tel');
    // Inputmask({ mask: '+52 999 999 9999' }).mask(inputElement);
    this.formulario = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      tel: new FormControl('', [Validators.required, Validators.pattern('^(\\d{3}) \\d{3}-\\d{4}$')]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      // tel: ['', [Validators.required, Validators.pattern(/^\+52 \d{3} \d{3} \d{4}$/)]]
    });

    // Escucha los cambios en el campo de contraseña
    this.formulario.get('password')?.valueChanges.subscribe(value => {
      this.validarPassword(value);
    });
  }

  validarPassword(value: string) {
    this.validacionesPassword.tieneMinuscula = /[a-z]/.test(value);
    this.validacionesPassword.tieneMayuscula = /[A-Z]/.test(value);
    this.validacionesPassword.tieneNumero = /\d/.test(value);
    this.validacionesPassword.longitudMinima = value.length >= 8;
  }

  
  
  registroCliente() {
    const nombre = this.formulario.get('nombre')?.value;
    const email = this.formulario.get('email')?.value;
    const telefono = this.formulario.get('telefono')?.value;
    const estado = this.formulario.get('estado')?.value;
    const numero = this.formulario.get('numero')?.value;
    // Aquí puedes realizar las operaciones necesarias con el valor de 'nombre'

    // if (!nombre) {
    //   Swal.fire('Error', 'Por favor ingresa tu nombre', 'error');
    //   return;
    // }
    // if (!email) {
    //   Swal.fire('Error', 'Por favor ingresa tu email', 'error');
    //   return;
    // }
    // if (!purificadora) {
    //   Swal.fire('Error', 'Por favor ingresa el nombre de la purifiadora', 'error');
    //   return;
    // }
    // if (!calle) {
    //   Swal.fire('Error', 'Por favor ingresa tu calle', 'error');
    //   return;
    // }
    // if (!longitud) {
    //   Swal.fire('Error', 'Por favor ingresa tu longitud', 'error');
    //   return;
    // }
    // if (!latitud) {
    //   Swal.fire('Error', 'Por favor ingresa tu latitud', 'error');
    //   return;
    // }
    // if (!telefono) {
    //   Swal.fire('Error', 'Por favor ingresa tu telefono', 'error');
    //   return;
    // }
    // if (!numero) {
    //   Swal.fire('Error', 'Por favor ingresa tu numero', 'error');
    //   return;
    // }

    const USUARIO: Usuario = {
      nombre: this.formulario.get('nombre')?.value,
      email: this.formulario.get('email')?.value,
      telefono: this.formulario.get('telefono')?.value,
      // estatus: '',
      password: '',
      // usuario: '',
    }

// ! modal


    this.uservice.register(USUARIO).subscribe(response => {

      Swal.fire("Exitoso", "El resgitro fue exitos", 'success')
    }, (error) => {
      // Manejo de error...
      console.error(error); // Imprime el error en la consola para depuración
      let errorMessage = "Error desconocido"; // Mensaje por defecto en caso de que no haya un mensaje de error específico
      if (error && error.error && error.error.message) {
        errorMessage = error.error.message; // Si hay un mensaje de error específico, lo usamos
      }
      Swal.fire("Error", errorMessage, 'error'); // Mostramos el mensaje de error en la alerta

    })
  }

  volverAtras() {
    // this.location.back();
    console.log("presionado atras")
  }




  onSubmit() {
    if (this.formulario.valid) {
      // Procesar el formulario
      console.log(this.formulario.value);
    }
  }

  verificarCoincidencia() {
    const password = this.formulario.get('password')?.value;
    const confirmPassword = this.formulario.get('confirmPassword')?.value;

    this.coincidenPasswords = password === confirmPassword;
  }
  mostrarTooltip: boolean = false;

  passwordsCoincidenValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }
}
