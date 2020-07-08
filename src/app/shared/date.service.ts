import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  formatDate(date: Date) :string{
 const day=date.getDate();
 const month=date.getMonth()+1;
 const year= date.getFullYear();
 return `${day}-${month}-${year}`;
  }
}
