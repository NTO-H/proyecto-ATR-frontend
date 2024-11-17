import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
interface MessageBody {
  // Define las propiedades esperadas en el objeto body
  // Por ejemplo:
  subject: string;
  content: string;
}
@Injectable()
export class mensageservice {
  // url = '/correo/token/';
  url = 'https://servidortropicalworld-1.onrender.com/correo/token/';
  constructor(private _http: HttpClient) {}

  enviarTokenCorreo(email: string): Observable<any> {
    return this._http.post<any>(`${environment.api}/enviar-correo`, { email});
    // return this._http.post<any>(this.url, { correo });
  }
  enviarTokenSMS(number_to_send: string): Observable<any> {
    return this._http.post<any>(`${environment.api}/enviar-number`, { number_to_send});
    // return this._http.post<any>(this.url, { correo });
  }
  enviarTokenWasthapp(number_to_send: string): Observable<any> {
    return this._http.post<any>(`${environment.api}/msj/enviar-mensaje`, { number_to_send });
    // return this._http.post<any>(this.url, { correo });
  }
  activarCuenta(email: string, codigoVerificacion: string): Observable<any> {
    return this._http.post<any>(`${environment.api}/verificacion/activar-cuenta`, { email, codigoVerificacion });
  }
  // verificarCodigo(email: string, codigo: string): Observable<any> {
  //   return this._http.post<any>(`${environment.api}/verificacion/activar-cuenta`, { email, codigo });
  // }
  
  enviarNotificacion(): Observable<any> {
    return this._http.post<any>(
      `${environment.api}/enviar-notificacion/revisar-correo`,
      {}
    );
  }

  // enviarNotificacion(correo: string): Observable<any> {
  //     return this._http.post<any>(this.url , { correo });
  // }
}
