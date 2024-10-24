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
    return this.http.post(environment.api + '/admin/crearPoliticas', politica);
  }
  obtenerPoliticas(): Observable<any> {
    return this.http.get(environment.api + '/admin/obtenerPoliticas');
  }
  obtenerHistorialPoliticas(id: any): Observable<any> {
    return this.http.get(
      environment.api + '/admin/obtenerHistorialPoliticas/' + id
    );
  }
  actualizarPoliticas(id: any, nuevaPolitica: any): Observable<any> {
    return this.http.put(
      environment.api + '/admin/actualizarPoliticas/' + id,
      nuevaPolitica
    );
  }
  // Eliminar una política específica por ID
  eliminarPolitica(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/admin/eliminarPolitica/${id}`);
  }
}
