import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LeaveType } from '../models/leavetype';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LeaveTypeService {

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
  CreateLeaveType(data): Observable<LeaveType> {
    return this.http.post<LeaveType>(this.baseurl + '/leavetype', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetLeaveType(id): Observable<LeaveType> {
    return this.http.get<LeaveType>(this.baseurl + '/leavetype/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetLeaveTypes(): Observable<LeaveType> {
    return this.http.get<LeaveType>(this.baseurl + '/leavetype')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateLeaveType(id, data): Observable<LeaveType> {
    return this.http.put<LeaveType>(this.baseurl + '/leavetype/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deleteLeaveType(id) {
    return this.http.delete<LeaveType>(this.baseurl + '/leavetype/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  // deleteLeaveType(id: number): Observable<any> {
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
