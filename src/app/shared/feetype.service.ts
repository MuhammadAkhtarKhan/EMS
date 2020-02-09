import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FeeType } from '../models/feetype';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FeeTypeService {

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
  CreateFeeType(data): Observable<FeeType> {
    return this.http.post<FeeType>(this.baseurl + '/feetype', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetFeeType(id): Observable<FeeType> {
    return this.http.get<FeeType>(this.baseurl + '/feetype/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetFeeTypes(): Observable<FeeType> {
    return this.http.get<FeeType>(this.baseurl + '/feetype')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateFeeType(id, data): Observable<FeeType> {
    return this.http.put<FeeType>(this.baseurl + '/feetype/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteFeeType(id) {
    return this.http.delete<FeeType>(this.baseurl + '/feetype/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteFeeType(id: number): Observable<any> {
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

