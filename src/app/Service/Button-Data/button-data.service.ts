import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ButtonData {
  data: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ButtonDataService {
  private buttonDataSubject = new BehaviorSubject<ButtonData[]>(
    this.initializeButtons()
  );
  buttonData$ = this.buttonDataSubject.asObservable();

  constructor() {}

  private initializeButtons(): ButtonData[] {
    // Create an array with 50 buttons, each initialized with an empty data array
    return Array.from({ length: 50 }, () => ({ data: [] }));
  }

  addButtonData(newData: string) {
    let currentData = this.buttonDataSubject.getValue();
    // Find the first button with less than 3 data entries
    const targetButton = currentData.find((button) => button.data.length < 3);
    if (targetButton) {
      targetButton.data.push(newData);
    } else {
      // If all buttons already have 3 data entries, no further action is taken
      console.error('All buttons are full.');
    }
    this.buttonDataSubject.next(currentData);
  }

  getButtonData() {
    return this.buttonDataSubject.getValue();
  }
}
