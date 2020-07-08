import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassFeedtl } from '../models/clfeedtl';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClFeedtlService {

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
  CreateClassFeedtl(data): Observable<ClassFeedtl> {
    return this.http.post<ClassFeedtl>(this.baseurl + '/clfeedtl', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetClassFeedtl(id): Observable<ClassFeedtl> {
    return this.http.get<ClassFeedtl>(this.baseurl + '/clfeedtl/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetClassFeedtls(): Observable<ClassFeedtl> {
    return this.http.get<ClassFeedtl>(this.baseurl + '/clfeedtl')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateClassFeedtl(id, data): Observable<ClassFeedtl> {
    return this.http.put<ClassFeedtl>(this.baseurl + '/clfeedtl/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteClassFeedtl(id) {
    return this.http.delete<ClassFeedtl>(this.baseurl + '/clfeedtl/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteClassFeedtl(id: number): Observable<any> {
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
