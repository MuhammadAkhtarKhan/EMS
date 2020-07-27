import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Marks } from '../models/marks';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MarksDtl } from '../models/marksdtl';
import { MarksDtl1 } from '../models/marksdtl1';

@Injectable({
  providedIn: 'root'
})

export class MarksService {

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
  CreateMarks(data): Observable<Marks> {
    return this.http.post<Marks>(this.baseurl + '/marks', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetMarks(id): Observable<Marks> {
    return this.http.get<Marks>(this.baseurl + '/marks/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetMarkss(): Observable<Marks> {
    return this.http.get<Marks>(this.baseurl + '/marksmst')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  GetMarksdtl(): Observable<any> {
    return this.http.get<MarksDtl>(this.baseurl + '/marksdtl')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  GetMarksdtl1(): Observable<MarksDtl1> {
    return this.http.get<MarksDtl1>(this.baseurl + '/marksdtl1')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateMarks(id, data): Observable<Marks> {
    return this.http.put<Marks>(this.baseurl + '/marks/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteMarks(id) {
    return this.http.delete<Marks>(this.baseurl + '/marks/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteMarks(id: number): Observable<any> {
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
