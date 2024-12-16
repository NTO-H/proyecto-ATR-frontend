import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Politica } from '../models/politica.model';
import { manejoDeErroresHTTP } from './manejoDeErroresHttp.service';

@Injectable({
  providedIn: 'root',
})
export class ControlAdministrativaService extends manejoDeErroresHTTP {
  url = 'admin';
  constructor(private http: HttpClient) {
    super();
  }

  //Politicas
  registerPolitica(politica: any): Observable<any> {
    return this.http
      .post(environment.api + '/admin/crearPoliticas', politica)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  obtenerPoliticas(): Observable<any> {
    return this.http
      .get(environment.api + '/admin/obtenerPoliticas')
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  obtenerHistorialPoliticas(id: any): Observable<any> {
    return this.http
      .get(environment.api + '/admin/obtenerHistorialPoliticas/' + id)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  actualizarPoliticas(id: any, nuevaPolitica: any): Observable<any> {
    return this.http
      .put(environment.api + '/admin/actualizarPoliticas/' + id, nuevaPolitica)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  eliminarPolitica(id: string): Observable<any> {
    return this.http
      .delete(`${environment.api}/admin/eliminarPolitica/${id}`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  //TerminosYCondiciones
  registerTerminosYCondiciones(terminosYCondiciones: any): Observable<any> {
    return this.http
      .post(
        environment.api + '/admin/crearTerminosYCondiciones',
        terminosYCondiciones
      )
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  obtenerTerminosYCondiciones(): Observable<any> {
    return this.http
      .get(environment.api + '/admin/obtenerTerminosYCondiciones')
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  obtenerHistorialTerminosYCondiciones(id: any): Observable<any> {
    return this.http
      .get(
        environment.api + '/admin/obtenerHistorialTerminosYCondiciones/' + id
      )
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  actualizarTerminosYCondiciones(id: any, nuevoTerminos: any): Observable<any> {
    return this.http
      .put(
        environment.api + '/admin/actualizarTerminosYCondiciones/' + id,
        nuevoTerminos
      )
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  eliminarTerminosYCondiciones(id: string): Observable<any> {
    return this.http
      .delete(`${environment.api}/admin/eliminarTerminosYCondiciones/${id}`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  //Registro DeslindeLegal
  registerDeslindeLegal(nuevoDeslindeLegal: any): Observable<any> {
    return this.http
      .post(environment.api + '/admin/crearDeslindeLegal', nuevoDeslindeLegal)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  obtenerDeslindeLegal(): Observable<any> {
    return this.http
      .get(environment.api + '/admin/obtenerDeslindesLegales')
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  obtenerHistorialDeslindeLegal(id: any): Observable<any> {
    return this.http
      .get(environment.api + '/admin/obtenerHistorialDeslindeLegal/' + id)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  actualizarDeslindeLegal(id: any, nuevoDeslindeLegal: any): Observable<any> {
    return this.http
      .put(
        environment.api + '/admin/actualizarDeslindeLegal/' + id,
        nuevoDeslindeLegal
      )
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  eliminarDeslindeLegal(id: string): Observable<any> {
    return this.http
      .delete(`${environment.api}/admin/eliminarDeslindeLegal/${id}`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
}
