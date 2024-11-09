import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeView } from './views/home/home.view';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
// import {  } from './views/acerca-de/acerca-de.view';
import { AcercaDeView } from './views/acerca-de/acerca-de.view';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
// DialogModule
import { PerfilView } from './views/perfil/perfil.view';
import { MenuModule } from 'primeng/menu';
// import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DetailsProductView } from './views/details-product/details-product.view';
import { SkeletonModule } from 'primeng/skeleton';
import { CarritoView } from './views/carrito/carrito.view';
import { DatosEmpresaService } from '../../shared/services/datos-empresa.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { GalleriaModule } from 'primeng/galleria';
import { OverlayPanelModule } from 'primeng/overlaypanel';

// import { VerificarCodigoView } from './views/verificar-codigo/verificar-codigo.view';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Toast } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SignUpService } from '../auth/commons/services/sign-up.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import { TagComponent } from './components/tag/tag.component';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PaginatorModule } from 'primeng/paginator';

const MATERIALS =[AvatarModule,AvatarGroupModule,PaginatorModule,OverlayPanelModule,TieredMenuModule,SkeletonModule,CardModule,TabMenuModule,ButtonModule,DialogModule,SidebarModule,CheckboxModule,MenuModule]
const COMPONENTS =[FooterComponent,HeaderComponent]
const VIEWS=[HomeView,PublicComponent,PerfilView, AcercaDeView,DetailsProductView]
@NgModule({
  declarations: [VIEWS,COMPONENTS, CarritoView, TagComponent],
  exports:[COMPONENTS],
  imports: [GalleriaModule,
    CommonModule,ReactiveFormsModule,FormsModule,
    PublicRoutingModule,HttpClientModule, ...MATERIALS,
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Toast,MessageService,provideClientHydration(), [provideHttpClient(withFetch())],
  SignUpService,UsuarioService,DatosEmpresaService],
})
export class PublicModule {


 }
