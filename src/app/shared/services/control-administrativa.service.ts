import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Politica } from '../models/politica.model';

@Injectable({
  providedIn: 'root',
})
export class ControlAdministrativaService {
  // admin/politica

  url = 'admin';
  constructor(private http: HttpClient) {}

  registerPolitica(politica: Politica): Observable<any> {
    return this.http.post(environment.api + '/politica', politica);
  }
  obtenerPoliticas(): Observable<any> {
    return this.http.get(environment.api + '/politicas');
  }
  eliminarPolitica(id: any): Observable<any> {
    return this.http.delete(environment.api + this.url + '/politica/:id' + id);
  }
}
