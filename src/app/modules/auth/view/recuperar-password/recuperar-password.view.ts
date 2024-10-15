import { Component } from '@angular/core';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [],
  templateUrl: './recuperar-password.view.html',
  styleUrl: './recuperar-password.view.scss',
})
export class RecuperarPasswordView {
  recoverByEmail() {
    console.log('Recuperación por correo seleccionada');
    // Aquí puedes agregar la lógica para recuperar la contraseña por correo
  }

  recoverByCode() {
    console.log('Recuperación por código seleccionada');
    // Aquí puedes agregar la lógica para recuperar la contraseña por código SMS
  }
}
