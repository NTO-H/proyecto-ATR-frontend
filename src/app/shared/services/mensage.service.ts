import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
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
    constructor(private _http: HttpClient) { }
  

    
    
    enviarCorreo(correo: string): Observable<any> {
        return this._http.post<any>(this.url , { correo });
    }
}