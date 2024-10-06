import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HomeView } from './views/home/home.view';
import { HeaderComponent } from '../public/components/header/header.component';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';

const VIEWS=[ HomeView,FooterComponent,HeaderComponent]
const UTILS=[ ]


@NgModule({
  declarations: [VIEWS],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
