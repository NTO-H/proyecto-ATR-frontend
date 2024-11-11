import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ERol } from '../constants/rol.enum';
import { SessionService } from '../services/session.service';
import Swal from 'sweetalert2';

export const adminGuard = () => {
  const sesionS_ = inject(SessionService);

  const userData = sesionS_.getUserData();
  const router = inject(Router);

  const userROL = userData?.rol; // Obtener el rol del usuario

  // Verificar si el rol es admin

  if (userROL === ERol.ADMIN) {
    return true; // Usuario tiene rol de admin
  } else {
    router.navigate(['/public/home']);

    return false; // Usuario tiene rol de admin
  }
};

export const clientGuard = () => {
  const router = inject(Router);

  const rol = localStorage.getItem('rol');

  // Verificar si el rol es admin
  if (rol && rol === 'cliente') {
    return true; // Usuario tiene rol de admin
  } else {
    router.navigate(['/']);
    return false; // Usuario no tiene rol de admin
  }
};
export const EmployeeGuard = () => {
  const router = inject(Router);

  const rol = localStorage.getItem('rol');

  // Verificar si el rol es admin
  if (rol && rol === 'empleado') {
    return true; // Usuario tiene rol de admin
  } else {
    router.navigate(['/']);
    return false; // Usuario no tiene rol de admin
  }
};
