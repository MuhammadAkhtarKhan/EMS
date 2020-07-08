import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Promotion } from '../models/promotion';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PromotionDtl } from '../models/promotiondtl';

@Injectable({
  providedIn: 'root'
})

export class PromotionService {

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
  CreatePromotion(data): Observable<Promotion> {
    return this.http.post<Promotion>(this.baseurl + '/promotion', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // GET
  GetPromotion(id): Observable<Promotion> {
    return this.http.get<Promotion>(this.baseurl + '/promotion/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetPromotions(): Observable<Promotion> {
    return this.http.get<Promotion>(this.baseurl + '/promotion')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
  GetPromotionsDtl(): Observable<PromotionDtl> {
    return this.http.get<PromotionDtl>(this.baseurl + '/promotion/detail')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdatePromotion(id, data): Observable<Promotion> {
    return this.http.put<Promotion>(this.baseurl + '/promotion/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // DELETE
  deletePromotion(id) {
    return this.http.delete<Promotion>(this.baseurl + '/promotion/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }
  
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
