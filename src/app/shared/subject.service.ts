import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from '../models/subject';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {

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
  CreateSubject(data): Observable<Subject> {
    return this.http.post<Subject>(this.baseurl + '/subject', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetSubject(id): Observable<Subject> {
    return this.http.get<Subject>(this.baseurl + '/subject/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetSubjects(): Observable<Subject> {
    return this.http.get<Subject>(this.baseurl + '/subject')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateSubject(id, data): Observable<Subject> {
    return this.http.put<Subject>(this.baseurl + '/subject/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteSubject(id) {
    return this.http.delete<Subject>(this.baseurl + '/subject/' + id, this.httpOptions)
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

