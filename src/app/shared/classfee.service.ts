import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClassFee } from '../models/classfee';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassfeeService {

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
   CreateClassFee(data): Observable<ClassFee> {
     return this.http.post<ClassFee>(this.baseurl + '/classfee', JSON.stringify(data), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.errorHandl)
     );
   }
 
   // GET
   GetClassFee(id): Observable<ClassFee> {
     return this.http.get<ClassFee>(this.baseurl + '/classfee/' + id)
     .pipe(
       retry(1),
       catchError(this.errorHandl)
     )
   }
 
   // GET
   GetClassFees(): Observable<ClassFee> {
     return this.http.get<ClassFee>(this.baseurl + '/classfee')
     .pipe(
       retry(1),
       catchError(this.errorHandl)
     )
   }
 
   // PUT
   UpdateClassFee(id, data): Observable<ClassFee> {
     return this.http.put<ClassFee>(this.baseurl + '/classfee/' + id, JSON.stringify(data), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.errorHandl)
     );
   }
 
   // DELETE
   deleteClassFee(id) {
     return this.http.delete<ClassFee>(this.baseurl + '/classfee/' + id, this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.errorHandl)
     );
   }
   // deleteClassFee(id: number): Observable<any> {
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
