import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TotalMarksDtls } from '../models/totalmarksdtl';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TotalMarksDtlSubjects } from '../models/totalmarkdtlsubject';

@Injectable({
  providedIn: 'any'
})

export class TotalmarksdtlService {

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
  CreateTotalMarksDtls(data): Observable<TotalMarksDtlSubjects> {
    return this.http.post<TotalMarksDtlSubjects>(this.baseurl + '/totalmarkdtl', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetTotalMarksDtls(id): Observable<TotalMarksDtlSubjects> {    
    return this.http.get<TotalMarksDtlSubjects>(this.baseurl + '/totalmarkdtl/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetTotalMarksDtlss(): Observable<TotalMarksDtlSubjects> {
    return this.http.get<TotalMarksDtlSubjects>(this.baseurl + '/totalmarkdtl')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateTotalMarksDtls(id, data): Observable<TotalMarksDtlSubjects> {
    return this.http.put<TotalMarksDtlSubjects>(this.baseurl + '/totalmarkdtl/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteTotalMarksDtls(id) {
    return this.http.delete<TotalMarksDtlSubjects>(this.baseurl + '/totalmarkdtl/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteSubject(id: number): Observable<any> {
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

