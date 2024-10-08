import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importante para animaciones
import { AppComponent } from './app.component';
import { PublicModule } from './modules/public/public.module'; // Asegúrate de importar tu módulo público
import { RouterModule, RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppComponent],   
  imports: [RouterOutlet,
    BrowserModule, // Solo aquí
    BrowserAnimationsModule, // Solo aquí
    PublicModule,RouterModule // Importa el PublicModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
