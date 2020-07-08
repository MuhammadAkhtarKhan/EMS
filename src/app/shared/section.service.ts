import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sections } from '../models/sections';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Secdtl } from '../models/secdtl';

@Injectable({
  providedIn: 'root'
})

export class SectionsService {

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
  CreateSections(data): Observable<Sections> {
    return this.http.post<Sections>(this.baseurl + '/sections', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetSection(id): Observable<Sections> {
    return this.http.get<Sections>(this.baseurl + '/sections/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetSections(): Observable<Sections> {
    return this.http.get<Sections>(this.baseurl + '/sections')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  GetSectionsDetail(): Observable<Secdtl> {
    return this.http.get<Secdtl>(this.baseurl + '/sections/details')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateSection(id, data): Observable<Sections> {
    return this.http.put<Sections>(this.baseurl + '/sections/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteSection(id) {
    return this.http.delete<Sections>(this.baseurl + '/sections/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteSection(id: number): Observable<any> {
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
