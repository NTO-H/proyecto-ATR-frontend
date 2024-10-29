import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mensageservice } from '../../../../shared/services/mensage.service';

@Component({
  selector: 'app-verificar-codigo',
  templateUrl: './verificar-codigo.view.html',
  styleUrls: ['./verificar-codigo.view.scss'], // Asegúrate de que 'styleUrls' esté en plural
})
export class VerificarCodigoView implements OnInit {
  formulario!: FormGroup;
  formulario1!: FormGroup;
  email: string = '';
  otpCode: string = '';
  isOtpSent: boolean = false;

  constructor(private fb: FormBuilder, private msgs: mensageservice) {}

  ngOnInit(): void {
    // Inicializar el formulario de correo
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // Inicializar el formulario OTP
    this.formulario1 = this.fb.group({
      otpCode: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // Envío del código de verificación
  sendVerificationCode(): void {
    if (this.formulario.valid) {
      const email = this.formulario.get('email')?.value;
  
      // Simular la lógica para enviar el código de verificación
      // this.msgs.enviarCorreo(email).subscribe({
      //   next: (res) => {
      //     this.isOtpSent = true;
      //     console.log('Código de verificación enviado con éxito:', res);
          
      //     // Aquí puedes implementar más lógica si es necesario, como obtener un token de verificación o actualizar el estado de la aplicación
      //     this.msgs.enviarNotificacion().subscribe({
      //     });
          
      //     // Cambiar el valor de isOtpSent a true para mostrar el segundo formulario
      //   },
      //   error: (err) => {
      //     console.error('Error enviando el código de verificación:', err);
      //   }
      // });
    }
  }
  

  // Verificación del código OTP
  verifyOtp(): void {
    if (this.formulario1.valid) {
      const otpCode = this.formulario1.get('otpCode')?.value;
      console.log(`Verificando código OTP: ${otpCode}`);
      // Lógica para verificar el OTP
    }
  }
}
