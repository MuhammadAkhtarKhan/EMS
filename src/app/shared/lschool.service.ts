import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LSchool } from '../models/lschool';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { LSchoolDtl } from '../models/lschooldtl';

@Injectable({
  providedIn: 'root'
})

export class LSchoolService {

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
  CreateLSchool(data): Observable<LSchool> {
    return this.http.post<LSchool>(this.baseurl + '/lschool', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetLSchool(id): Observable<LSchool> {
    return this.http.get<LSchool>(this.baseurl + '/lschool/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetLSchools(): Observable<LSchool> {
    return this.http.get<LSchool>(this.baseurl + '/lschool')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  GetLSchoolsDtl(): Observable<LSchoolDtl> {
    return this.http.get<LSchoolDtl>(this.baseurl + '/lschool/detail')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateLSchool(id, data): Observable<LSchool> {
    return this.http.put<LSchool>(this.baseurl + '/lschool/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteLSchool(id) {
    return this.http.delete<LSchool>(this.baseurl + '/lschool/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteLSchool(id: number): Observable<any> {
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
