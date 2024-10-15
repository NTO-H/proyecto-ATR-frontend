import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }
  


  signUp(data: any): Observable<any> {
    const url = `${environment.api}/usuarios/singUp`;
    return this.http.post(url, data);
  }




}
