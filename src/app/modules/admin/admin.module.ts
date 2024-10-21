import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de usar CommonModule aquí
import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HomeView } from './views/home/home.view';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { ClientesService } from '../../shared/services/clientes.service';
import { SessionService } from '../../shared/services/session.service';
import { StorageService } from '../../shared/services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { ClienteListadoComponent } from './components/cliente-listado/cliente-listado.component';
import { ControlClientesView } from './views/control-clientes/control-clientes.view';
import { ControlProductosView } from './views/control-productos/control-productos.view';
import { ControlVentasView } from './views/control-ventas/control-ventas.view';
import { ControlRentasView } from './views/control-rentas/control-rentas.view';
import { HistorialView } from './views/historial/historial.view';
import { RegistroRentaComponent } from './components/registro-renta/registro-renta.component';
import { ListadoRentaComponent } from './components/listado-renta/listado-renta.component';
import { RegistroVentaComponent } from './components/registro-venta/registro-venta.component';
import { RegistoProductoComponent } from './components/registo-producto/registo-producto.component';
import { RegistoPoliticaComponent } from './components/registo-politica/registo-politica.component';
import { RegistroTerminosCondicionesComponent } from './components/registro-terminos-condiciones/registro-terminos-condiciones.component';
import { ListadoPoliticaComponent } from './components/listado-politica/listado-politica.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { ListadoVentaComponent } from './components/listado-venta/listado-venta.component';
import { ListadoComentarioComponent } from './components/listado-comentario/listado-comentario.component';
import { ConfiguracionView } from './views/configuracion/configuracion.view';
import { ReportesView } from './views/reportes/reportes.view';
import { PoliticasView } from './views/politicas/politicas.view';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { ControlAdministrativaService } from '../../shared/services/control-administrativa.service';
import { PerfilAdministradorComponent } from './components/perfil-administrador/perfil-administrador.component';
import { AjustesGeneralesComponent } from './components/ajustes-generales/ajustes-generales.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { UsuarioService } from '../../shared/services/usuario.service';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const VIEWS = [HomeView, FooterComponent];
const UTILS = [];

@NgModule({
  declarations: [
    VIEWS,
    AdminComponent,
    ClienteListadoComponent,
    ControlClientesView,
    ControlProductosView,
    ControlVentasView,
    ControlRentasView,
    HistorialView,
    RegistroRentaComponent,
    ListadoRentaComponent,
    RegistroVentaComponent,
    RegistoProductoComponent,
    RegistoPoliticaComponent,
    RegistroTerminosCondicionesComponent,
    ListadoPoliticaComponent,
    ListadoProductosComponent,
    ListadoVentaComponent,
    ListadoComentarioComponent,
    ConfiguracionView,
    ReportesView,
    PoliticasView,
    ListadoClientesComponent,
    PerfilAdministradorComponent,
    AjustesGeneralesComponent,
    NotificacionesComponent,
  ],
  imports: [
    CommonModule, // Asegúrate de que este sea el módulo importado y no BrowserModule
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [
    UsuarioService,
    ControlAdministrativaService,
    ClientesService,
    StorageService,
    SessionService,
  ],
})
export class AdminModule {}
