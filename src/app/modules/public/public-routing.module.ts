import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeView } from './views/home/home.view';
import path from 'path';
import { PublicComponent } from './public.component';
import { AcercaDeView } from './views/acerca-de/acerca-de.view';
import { SignInView } from '../auth/view/sign-in/sign-in.view';
import { SignUpView } from '../auth/view/sign-up/sign-up.view';
import { ConfigView } from './views/config/config.view';
import { DetailsProductView } from './views/details-product/details-product.view';
import { PerfilView } from './views/perfil/perfil.view';
import { TerminosComponent } from './views/terminos/terminos.component';
import { PoliticasComponent } from './views/politicas/politicas.component';

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
      {
        path: 'terminos',
        component: TerminosComponent,
        data: {
          title: 'terminos',
          breadcrumb: [
            {
              label: 'terminos',
              path: '/public/terminos',
            },
          ],
        },
      },
      {
        path: 'politicas',
        component: PoliticasComponent,
        data: {
          title: 'politicas',
          breadcrumb: [
            {
              label: 'politicas',
              path: '/public/politicas',
            },
          ],
        },
      },
      {
        path: 'Mi-perfil',
        component: PerfilView,
        data: {
          title: 'Mi perfil',
          breadcrumb: [
            {
              label: 'Mi-perfil',
              path: '/public/Mi-perfil',
            },
          ],
        },
      },
      { path: 'Config', component: ConfigView },
      { path: 'Detail', component: DetailsProductView },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
