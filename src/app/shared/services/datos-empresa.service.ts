import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { manejoDeErroresHTTP } from './manejoDeErroresHttp.service';

@Injectable({
  providedIn: 'root',
})
export class DatosEmpresaService extends manejoDeErroresHTTP {
  constructor(private http: HttpClient) {
    super();
  }

  editarPerfilEmpresa(data: any): Observable<any> {
    const url = `${environment.api}/Empresa/editarPerfilEmpresa/`;
    return this.http
      .put(url, data)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  configurarEmpresa(data: any): Observable<any> {
    const url = `${environment.api}/Empresa/editarConfigurarEmpresa/`;
    return this.http
      .put(url, data)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  traerDatosEmpresa(): Observable<any> {
    const url = `${environment.api}/Empresa/obtenerPerfilesEmpresa`;
    return this.http
      .get(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  consultarConfigurarEmpresa(): Observable<any> {
    const url = `${environment.api}/Empresa/consultarConfigurarEmpresa`;
    return this.http
      .get(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  getPoliticas(): Observable<any> {
    const url = `${environment.api}/politicas/`;
    return this.http
      .get(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  getTerminos(): Observable<any> {
    const url = `${environment.api}/admin/obtenerTerminosYCondicionesVigentes`;
    return this.http
      .get(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  // consultarConfigurarEmpresa(): Observable<any> {
  //   const url = `${environment.api}/Empresa/consultarConfigurarEmpresa`;
  //   return this.http.get(url);
  // }

  //redes sociales
  guardarRedSocial(id: any, redSocial: any): Observable<any> {
    const url = `${environment.api}/Empresa/guardarRedSocial/` + id;
    return this.http
      .post(url, redSocial)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  //redes sociales
  obtenerRedesSociales(): Observable<any> {
    const url = `${environment.api}/Empresa/obtenerRedesSociales`;
    return this.http
      .get(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  eliminarRedSocial(id: any): Observable<any> {
    const url = `${environment.api}/Empresa/eliminarRedSocial/` + id;
    return this.http
      .delete(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
}
