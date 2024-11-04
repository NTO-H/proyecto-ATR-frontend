import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Politica } from '../models/politica.model';

@Injectable({
  providedIn: 'root',
})
export class ControlAdministrativaService {
  url = 'admin';
  constructor(private http: HttpClient) {}

  //Politicas
  registerPolitica(politica: any): Observable<any> {
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

  eliminarPolitica(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/admin/eliminarPolitica/${id}`);
  }

  //TerminosYCondiciones
  registerTerminosYCondiciones(terminosYCondiciones: any): Observable<any> {
    return this.http.post(
      environment.api + '/admin/crearTerminosYCondiciones',
      terminosYCondiciones
    );
  }
  obtenerTerminosYCondiciones(): Observable<any> {
    return this.http.get(
      environment.api + '/admin/obtenerTerminosYCondiciones'
    );
  }
  obtenerHistorialTerminosYCondiciones(id: any): Observable<any> {
    return this.http.get(
      environment.api + '/admin/obtenerHistorialTerminosYCondiciones/' + id
    );
  }
  actualizarTerminosYCondiciones(id: any, nuevoTerminos: any): Observable<any> {
    return this.http.put(
      environment.api + '/admin/actualizarTerminosYCondiciones/' + id,
      nuevoTerminos
    );
  }

  eliminarTerminosYCondiciones(id: string): Observable<any> {
    return this.http.delete(
      `${environment.api}/admin/eliminarTerminosYCondiciones/${id}`
    );
  }

  //Registro DeslindeLegal
  registerDeslindeLegal(nuevoDeslindeLegal: any): Observable<any> {
    return this.http.post(
      environment.api + '/admin/crearDeslindeLegal',
      nuevoDeslindeLegal
    );
  }
  obtenerDeslindeLegal(): Observable<any> {
    return this.http.get(
      environment.api + '/admin/obtenerDeslindesLegales'
    );
  }
  obtenerHistorialDeslindeLegal(id: any): Observable<any> {
    return this.http.get(
      environment.api + '/admin/obtenerHistorialDeslindeLegal/' + id
    );
  }
  actualizarDeslindeLegal(id: any, nuevoDeslindeLegal: any): Observable<any> {
    return this.http.put(
      environment.api + '/admin/actualizarDeslindeLegal/' + id,
      nuevoDeslindeLegal
    );
  }

  eliminarDeslindeLegal(id: string): Observable<any> {
    return this.http.delete(
      `${environment.api}/admin/eliminarDeslindeLegal/${id}`
    );
  }
}
