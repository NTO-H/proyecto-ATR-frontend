import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError as ObservableThrowError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class manejoDeErroresHTTP {

  errorHandler(error: HttpErrorResponse) {
    return ObservableThrowError(error.message);
  }
}
