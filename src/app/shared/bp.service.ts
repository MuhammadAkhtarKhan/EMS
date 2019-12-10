import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bp } from '../models/bp';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BpService {

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
  CreateBp(data): Observable<Bp> {
    return this.http.post<Bp>(this.baseurl + '/bp/', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetBp(id): Observable<Bp> {
    return this.http.get<Bp>(this.baseurl + '/bp/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetBps(): Observable<Bp> {
    return this.http.get<Bp>(this.baseurl + '/bp/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateBp(id, data): Observable<Bp> {
    return this.http.put<Bp>(this.baseurl + '/bp/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  DeleteBp(id){
    return this.http.delete<Bp>(this.baseurl + '/bp/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
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
