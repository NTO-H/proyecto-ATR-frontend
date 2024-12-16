import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/Producto.model';
import { environment } from '../../../environments/environment';
import { manejoDeErroresHTTP } from './manejoDeErroresHttp.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService extends manejoDeErroresHTTP {
  // private apiUrl = 'http://localhost:3000/api/productos'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {
    super();
  }

  crearProducto(producto: FormData): Observable<Producto> {
    // const fd = new FormData();
    //  fd.append('title', title);
    // fd.append('description', description);
    // fd.append('image', photo);
    // fd.append('image', producto);
    return this.http.post<Producto>(`${environment.api}/producto/`, producto).pipe(
      catchError((error) => this.errorHandler(error))
    );
  }

  editarProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(
      `${environment.api}/producto/editarProducto/${id}`,
      producto
    ).pipe(
      catchError((error) => this.errorHandler(error))
    );
  }

  eliminarProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/producto/${id}`).pipe(
      catchError((error) => this.errorHandler(error))
    );
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.api}/producto/`).pipe(
      catchError((error) => this.errorHandler(error))
    );
  }
}
