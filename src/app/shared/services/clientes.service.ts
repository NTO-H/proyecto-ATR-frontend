import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cliente } from '../interfaces/client.interface';
import { Usuario } from '../models/usuario.model';
import { manejoDeErroresHTTP } from './manejoDeErroresHttp.service';

@Injectable({
  providedIn: 'root',
})
export class ClientesService extends manejoDeErroresHTTP {
  constructor(private http: HttpClient) {
    super();
  }

  obtenerPurificadoras(): Observable<any> {
    return this.http
      .get(`${environment.api}/adminPage/purificadoras`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  obtenerColoniasYclientes(): Observable<any> {
    return this.http
      .get(`${environment.api}/usuarios/clientes/agrupados`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  // http://localhost:4000/usuarios/getUsuarios
  obtenerCLientes(): Observable<any> {
    return this.http
      .get(`${environment.api}/usuarios/`)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  // obtenerCLientesByIdPurificadora(idPurificadora: any): Observable<any> {
  //   return this.http.get(
  //     `${environment.api}/purificadoraAdmin/clientes/`+idPurificadora
  //   );
  // }
  // obtenerCLientesDisponibles(): Observable<any> {
  //   return this.http.get(
  //     `${environment.api}/purificadoraAdmin/clientesDisponibles/`
  //   );
  // }
  // obtenerCLientesDisponiblesByColonia(colonia: any): Observable<any> {
  //   const url = `${environment.api}/purificadoraAdmin/clientesDisponiblesByColonia/`;
  //   return this.http.post(url, { colonia });
  // }

  detalleClienteById(id: string): Observable<any> {
    const url = `${environment.api}/usuarios/` + id;
    return this.http
      .get(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
  purificadora(id: string): Observable<any> {
    const url = `${environment.api}/purificadoraAdmin/purificadora/` + id;
    return this.http
      .get(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  updateUsuario(id: string, cliente: any): Observable<any> {
    const url = `${environment.api}/usuarios/actualiza/` + id;
    return this.http
      .put(url, cliente)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  eliminarPurificadora(id: string): Observable<any> {
    const url = `${environment.api}/purificadoraAdmin/deletePurificadora/` + id;
    return this.http
      .delete(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }

  eliminarCliente(id: string): Observable<any> {
    const url = `${environment.api}/usuarios/deleteCliente/` + id;
    return this.http
      .delete(url)
      .pipe(catchError((error) => this.errorHandler(error)));
  }
}
