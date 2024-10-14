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
    path: '**', // Ruta wildcard para capturar cualquier otra ruta no definida
    redirectTo: 'public', // Redirige a la ruta 'public'
  },


  
];
