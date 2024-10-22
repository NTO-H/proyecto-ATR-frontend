import { NgModule } from '@angular/core';
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
import { MenuModule } from 'primeng/menu';
// import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DetailsProductView } from './views/details-product/details-product.view';
import { SkeletonModule } from 'primeng/skeleton';

// import { VerificarCodigoView } from './views/verificar-codigo/verificar-codigo.view';
const MATERIALS =[SkeletonModule,CardModule,ButtonModule,DialogModule,SidebarModule,CheckboxModule,MenuModule]
const COMPONENTS =[FooterComponent,HeaderComponent]
const VIEWS=[HomeView,PublicComponent, AcercaDeView,DetailsProductView]
@NgModule({
  declarations: [VIEWS,COMPONENTS],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,
    PublicRoutingModule, ...MATERIALS,
  ]
})
export class PublicModule {


 }
