import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeView } from './views/home/home.view';
import { DialogModule } from 'primeng/dialog';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const UTILS =[CardModule,ButtonModule,DialogModule]
const VIEWS=[HomeView]
@NgModule({
  declarations: [VIEWS,PublicComponent],
  imports: [UTILS,
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule {


 }
