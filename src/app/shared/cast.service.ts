import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cast } from '../models/cast';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CastService {

  // Base url
  baseurl = 'http://localhost:53084/api';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // POST
  CreateCast(data): Observable<Cast> {
    return this.http.post<Cast>(this.baseurl + '/cast', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetCast(id): Observable<Cast> {
    return this.http.get<Cast>(this.baseurl + '/cast/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetCasts(): Observable<Cast> {
    return this.http.get<Cast>(this.baseurl + '/cast')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateCast(id, data): Observable<Cast> {
    return this.http.put<Cast>(this.baseurl + '/cast/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteCast(id) {
    return this.http.delete<Cast>(this.baseurl + '/cast/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteCast(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseurl}/${id}`, { responseType: 'text' });
  // }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}
