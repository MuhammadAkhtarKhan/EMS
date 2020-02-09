import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Edu } from '../models/edu';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EduService {

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
  CreateEdu(data): Observable<Edu> {
    return this.http.post<Edu>(this.baseurl + '/edu', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetEdu(id): Observable<Edu> {
    return this.http.get<Edu>(this.baseurl + '/edu/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetEdus(): Observable<Edu> {
    return this.http.get<Edu>(this.baseurl + '/edu')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateEdu(id, data): Observable<Edu> {
    return this.http.put<Edu>(this.baseurl + '/edu/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteEdu(id) {
    return this.http.delete<Edu>(this.baseurl + '/edu/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteEdu(id: number): Observable<any> {
  //   return this.http.delete(`${this.baseurl}/${id}`, { responseType: 'text' });
  // }

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
