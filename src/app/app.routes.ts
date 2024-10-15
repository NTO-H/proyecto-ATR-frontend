import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',
    loadChildren: () => import('../app/modules/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: '**', // Ruta wildcard para capturar cualquier otra ruta no definida
    redirectTo: 'public', // Redirige a la ruta 'public'
  },


  
];
