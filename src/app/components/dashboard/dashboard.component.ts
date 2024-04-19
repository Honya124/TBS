import { Component, Input } from '@angular/core';
import { DataService } from '../../Service/Data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 // Define an array to hold the list of data
 dataList: string[] = [];
 // Define an array to hold the list of buttons with their data
 buttonData: string[][] = [[]];
 currentButtonIndex: number = 0;

 constructor() { 
   // Generate some dummy data for demonstration
   for(let i = 0; i < 150; i++) {
     this.dataList.push(`Data ${i+1}`);
   }
   // Fill each button with 3 data points
   for(let i = 0; i < this.dataList.length; i++) {
     if(this.buttonData[this.currentButtonIndex].length < 3) {
       this.buttonData[this.currentButtonIndex].push(this.dataList[i]);
     } else {
       this.buttonData.push([this.dataList[i]]);
       this.currentButtonIndex++;
     }
   }
 }
}
