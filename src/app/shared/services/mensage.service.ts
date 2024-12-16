import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { manejoDeErroresHTTP } from './manejoDeErroresHttp.service';

interface MessageBody {
  // Define las propiedades esperadas en el objeto body
  // Por ejemplo:
  subject: string;
  content: string;
}
@Injectable()
export class mensageservice extends manejoDeErroresHTTP {
  // url = '/correo/token/';
  url = 'https://servidortropicalworld-1.onrender.com/correo/token/';
  constructor(private _http: HttpClient) {
    super();
  }

  enviarTokenCorreo(email: string): Observable<any> {
    return this._http
      .post<any>(`${environment.api}/enviar-correo`, { email })
      .pipe(catchError((error) => this.errorHandler(error)));
    // return this._http.post<any>(this.url, { correo });
  }
  enviarTokenSMS(number_to_send: string): Observable<any> {
    return this._http
      .post<any>(`${environment.api}/enviar-number`, {
        number_to_send,
      })
      .pipe(catchError((error) => this.errorHandler(error)));
    // return this._http.post<any>(this.url, { correo });
  }
  enviarTokenWasthapp(number_to_send: string): Observable<any> {
    return this._http
      .post<any>(`${environment.api}/msj/enviar-mensaje`, {
        number_to_send,
      })
      .pipe(catchError((error) => this.errorHandler(error)));
    // return this._http.post<any>(this.url, { correo });
  }
  activarCuenta(email: string, codigoVerificacion: string): Observable<any> {
    return this._http
      .post<any>(`${environment.api}/verificacion/activar-cuenta`, {
        email,
        codigoVerificacion,
      })
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  // verificarCodigo(email: string, codigo: string): Observable<any> {
  //   return this._http.post<any>(`${environment.api}/verificacion/activar-cuenta`, { email, codigo });
  // }

  enviarNotificacion(): Observable<any> {
    return this._http
      .post<any>(`${environment.api}/enviar-notificacion/revisar-correo`, {})
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  // enviarNotificacion(correo: string): Observable<any> {
  //     return this._http.post<any>(this.url , { correo });
  // }
}
