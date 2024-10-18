import { HttpClient } from '@angular/common/http';
// Es el módulo de Angular utilizado para realizar solicitudes HTTP.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';


// src/app/services/:

// Propósito: Contiene los servicios utilizados en la aplicación.
// Funcionalidad: Los servicios son utilizados para encapsular la
//  lógica de negocio, la interacción con APIs, y otras operaciones 
//  que no pertenecen directamente a un componente. Al organizar los
//   servicios en esta carpeta, se mejora la modularidad y la reutilización del código.

@Injectable({
    providedIn: 'root',
})
export class UsuarioService {

    url = 'https://servidortropicalworld-1.onrender.com/usuarios/';

    constructor(private http: HttpClient) { }
    
    
    
    enviarCorreo(correo: string): Observable<any> {
        return this.http.post<boolean>(this.url+'correo' , {correo});
    }
    



    
    getUsuarios(): Observable<any> {
        return this.http.get(this.url +'getUsuarios');
    }

    register(usuario: Usuario): Observable<any> {
        return this.http.post<any>(this.url + 'singUp', usuario, { withCredentials: true });
    }


   
    enviarToken(correo :string,token:string):Observable<any> {
        return this.http.post<boolean>(this.url + 'token', {correo,token});
    }
    
    enviarDatos(pregunta :string,respuesta:string):Observable<any> {
        return this.http.post<boolean>(this.url + 'respuesta', {pregunta,respuesta});
    }


    actualizaPasswordxCorreo(token: string, correo: string,nueva:string):Observable<any> {
        return this.http.put<boolean>(this.url + 'actualizaxCorreo', {token,correo,nueva});
    }

    actualizaPasswordxPregunta(pregunta: string, respuesta: string, nueva: string): Observable<any> {
        return this.http.put<boolean>(this.url + 'actualizaxPregunta', { pregunta, respuesta,nueva});
    }
    actualizarRol(id: string, rol: string): Observable<any> {
        return this.http.put<any>(`${this.url}/actualizaRol/${id}/`, { rol });
    }


   

    eliminarUsuario(id: string): Observable<any> {
        return this.http.delete(this.url + id);
    }
    // eliminarProducto(id: string): Observable<any> {
    //     return this.http.delete(this.url + id);
    // }



    // obtenerProducto(id: string): Observable<any> {

    //     return this.http.get(this.url + id);

    // }



    // editarProducto(id: string, producto: Producto): Observable<any> {
    //     return this.http.put(this.url + id, producto);

    // }


    getPreguntas(): Observable<any> {
        return this.http.get<any>(`${this.url}getPreguntasSecretas`);
    }


    detalleUsuarioById(id: string): Observable<any> {
        //return this.http.get(`${this.apiUrl}/${id}`);
        return this.http.get(this.url + id);
    }


    
    buscaUsuarioByCorreo(correo: string): Observable<any> {
        return this.http.get(`${this.url}buscaUsuarioByCorreo/${correo}`);
     // http://localhost:4000/usuarios/buscaUsuarioByCorreo/gabo@gmail.com
    }








}
