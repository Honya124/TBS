import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Define ButtonData interface
export interface ButtonData {
  p1: string;
  p2: string;
  p3: string;
}

@Injectable({
  providedIn: 'root'
})




export class ButtonDataService {


  private buttonDataSubject = new BehaviorSubject<ButtonData[]>([]);
  buttonData$ = this.buttonDataSubject.asObservable();

  
  constructor() { }

  setButtonData(buttonData: ButtonData[]) {
    this.buttonDataSubject.next(buttonData);
  }

  getButtonData() {
    return this.buttonDataSubject.getValue();
  }
}
