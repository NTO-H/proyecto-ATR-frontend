import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeView } from './views/home/home.view';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
// import {  } from './views/acerca-de/acerca-de.view';
import { AcercaDeView } from './views/acerca-de/acerca-de.view';
// import {  } from '@angular/platform-browser/animations';


const COMPONENTS =[CardModule,ButtonModule,DialogModule,SidebarModule]
const VIEWS=[HomeView,PublicComponent, AcercaDeView]
@NgModule({
  declarations: [VIEWS],
  imports: [
    CommonModule,
    PublicRoutingModule, ...COMPONENTS
  ]
})
export class PublicModule {


 }
