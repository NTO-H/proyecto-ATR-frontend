import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { manejoDeErroresHTTP } from './manejoDeErroresHttp.service';

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService extends manejoDeErroresHTTP {
  constructor(private http: HttpClient) {
    super();
  }

  /*

  Modo de comunicación con el servidor asíncrono

  parametro token: string

  return Observable<any>

   */

  getTokenClientModule(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<any>(
        'http://localhost:4000/api/v1/verificar/' + token + '/',
        httpOptions
      )

      .pipe(catchError((error) => this.errorHandler(error)));
  }
}
