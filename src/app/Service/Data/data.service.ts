import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<string>(''); // Change string to your data type
  public data$ = this.dataSubject.asObservable();
  dataBlock:any

  constructor() { }

  setData(data: string) { // Change string to your data type
    this.dataSubject.next(data);
  }
}
