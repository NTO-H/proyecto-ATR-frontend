import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeView } from './views/home/home.view';
import path from 'path';
import { PublicComponent } from './public.component';
// import { SignInView } from './views/sign-in/sign-in.view';
// import { SignUpView } from './views/sign-up/sign-up.view';
import { AcercaDeView } from './views/acerca-de/acerca-de.view';
import { SignInView } from '../auth/view/sign-in/sign-in.view';
import { SignUpView } from '../auth/view/sign-up/sign-up.view';
// import { RecuperarPasswordView } from './views/recuperar-password/recuperar-password.view';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'home',
        component: HomeView,
        data: {
          title: 'Home',
          breadcrumb: [
            {
              label: 'Home',
              path: '/public/home',
            },
          ],

          // data: {
          //   title: 'Home',
          //   breadcrumb: [
          //     {
          //       label: 'Home',
          //       path: '/public/home',
          //     },
          //   ],
        },
      },
      {
        path: 'AcercaDe',
        component: AcercaDeView,
        data: {
          title: 'AcercaDe',
          breadcrumb: [
            {
              label: 'AcercaDe',
              path: '/public/AcercaDe',
            },
          ],
        },
      },
   
      // { path: 'Sign-in', component: SignInView },
      // { path: 'Sign-up', component: SignUpView },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
