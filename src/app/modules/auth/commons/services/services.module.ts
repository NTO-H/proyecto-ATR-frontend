import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [], imports: [], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthServicesModule { }
