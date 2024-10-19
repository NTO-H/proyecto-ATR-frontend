import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeView } from './views/home/home.view';
import { ControlClientesView } from './views/control-clientes/control-clientes.view';
import { ClienteListadoComponent } from './components/cliente-listado/cliente-listado.component';
import { ReportesView } from './views/reportes/reportes.view';
import { ConfiguracionView } from './views/configuracion/configuracion.view';
import { PoliticasView } from './views/politicas/politicas.view';
import { ListadoPoliticaComponent } from './components/listado-politica/listado-politica.component';
import { RegistoPoliticaComponent } from './components/registo-politica/registo-politica.component';
import { ControlProductosView } from './views/control-productos/control-productos.view';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { RegistoProductoComponent } from './components/registo-producto/registo-producto.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { ControlVentasView } from './views/control-ventas/control-ventas.view';
import { ListadoVentaComponent } from './components/listado-venta/listado-venta.component';
import { AdminComponent } from './admin.component';
import { ControlRentasView } from './views/control-rentas/control-rentas.view';
import { ListadoRentaComponent } from './components/listado-renta/listado-renta.component';
import { RegistroRentaComponent } from './components/registro-renta/registro-renta.component';
import { RegistroVentaComponent } from './components/registro-venta/registro-venta.component';
import { PerfilAdministradorComponent } from './components/perfil-administrador/perfil-administrador.component';
import { AjustesGeneralesComponent } from './components/ajustes-generales/ajustes-generales.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'politicas',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'inicio',
        component: HomeView,
      },
      {
        path: 'cliente',
        component: ControlClientesView,
        children: [
          {
            path: 'lista-clientes',
            component: ClienteListadoComponent,
          },
          {
            path: '',
            redirectTo: 'lista-clientes',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'politicas',
        component: PoliticasView,
        children: [
          {
            path: 'lista-Politicas',
            component: ListadoPoliticaComponent,
          },
          {
            path: 'registro-politica',
            component: RegistoPoliticaComponent,
          },
          {
            path: '',
            redirectTo: 'registro-politica',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'control-clientes',
        component: ControlClientesView,
        children: [
          {
            path: 'lista-clientes',
            component: ListadoClientesComponent,
          },
          {
            path: '',
            redirectTo: 'lista-clientes',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'control-productos',
        component: ControlProductosView,
        children: [
          {
            path: 'lista-productos',
            component: ListadoProductosComponent,
          },
          {
            path: 'registro-producto',
            component: RegistoProductoComponent,
          },
          {
            path: '',
            redirectTo: 'registro-producto',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'control-venta',
        component: ControlVentasView,
        children: [
          {
            path: 'lista-venta',
            component: ListadoVentaComponent,
          },
          {
            path: 'registro-venta',
            component: RegistroVentaComponent,
          },
          {
            path: '',
            redirectTo: 'lista-venta',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'control-renta',
        component: ControlRentasView,
        children: [
          {
            path: 'lista-renta',
            component: ListadoRentaComponent,
          },
          {
            path: 'registro-renta',
            component: RegistroRentaComponent,
          },
          {
            path: '',
            redirectTo: 'lista-renta',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'reportes',
        component: ReportesView,
      },
      {
        path: 'historial',
        component: ReportesView,
      },
      {
        path: 'configuracion',
        component: ConfiguracionView,
        children: [
          {
            path: 'perfil-administrador',
            component: PerfilAdministradorComponent, // El componente que renderiza "Perfil de administrador"
          },
          {
            path: 'ajustes-generales',
            component: AjustesGeneralesComponent, // El componente que renderiza "Ajustes generales"
          },
          {
            path: 'notificaciones',
            component: NotificacionesComponent, // El componente que renderiza "Notificaciones"
          },
          {
            path: '',
            redirectTo: 'perfil-administrador',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '**', // Ruta wildcard para manejar rutas no encontradas
        redirectTo: 'inicio', // O puedes redirigir a otra ruta
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
