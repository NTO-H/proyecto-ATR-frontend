import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosEmpresaService {
  constructor(private http: HttpClient) {}

  updateUsuario(data: any): Observable<any> {
    const url = `${environment.api}/Empresa/editarPerfilEmpresa/`;
    return this.http.put(url, data);
  }
  eliminarRedSocial(id: any): Observable<any> {
    const url = `${environment.api}/Empresa/eliminarRedSocial/`+id;
    return this.http.delete(url);
  }
  traerDatosEmpresa(): Observable<any> {
    const url = `${environment.api}/Empresa/obtenerPerfilesEmpresa/`;
    return this.http.get(url);
  }
}
