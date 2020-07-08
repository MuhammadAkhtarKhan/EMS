import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TotalMarks } from '../models/totalmark';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TotalMarksDtlSubjects } from '../models/totalmarkdtlsubject';

@Injectable({
  providedIn: 'root'
})

export class TotalmarkService {

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
  CreateTotalMarks(data): Observable<TotalMarks> {
    return this.http.post<TotalMarks>(this.baseurl + '/marktotal', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetTotalMarks(id): Observable<TotalMarks> {
    return this.http.get<TotalMarks>(this.baseurl + '/marktotal/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetTotalMarkss(): Observable<TotalMarks> {
    return this.http.get<TotalMarks>(this.baseurl + '/marktotal/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateTotalMarks(id, data): Observable<TotalMarksDtlSubjects> {
    return this.http.put<TotalMarksDtlSubjects>(this.baseurl + '/marktotal/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteTotalMarks(id) {
    return this.http.delete<TotalMarks>(this.baseurl + '/marktotal/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteTotalMarks(id: number): Observable<any> {
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
