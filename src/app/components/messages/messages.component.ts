import { Component } from '@angular/core';
import { MessageService } from '../../Service/Message/message.service';
import { PublicService } from '../../Service/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  allContactUsArray: any[] = [];
  allOrderTemp: any[] = [];
  currentPage: number = 1;
  totalPages: any;
  searchValue:any;
  constructor(
    private messageService: MessageService,
    public publicService: PublicService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllContactUS(this.currentPage);
  }
 
  sendRespond(){
    
  }
  // goToUpdateShipment(data:any){
  //   console.log("go to update shipment",data)
  //   this.shippingService.ShipmentObject=data
  // }

  getAllContactUS(page: any) {
    this.messageService.getContactUsList(page).subscribe(
      (data: any) => {
        this.allContactUsArray=data['messages'];
        this.totalPages = data['total_pages'];
        console.log("get All Message",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

    //  search by shipment place
  //   searchShipmentPlace(keyword:any){
  //     this.allShipmentArray=this.allOrderTemp.filter(shipment=>shipment.shipping_place.toLowerCase() === keyword.toLowerCase())
     
  // }
  showMessage:boolean=false
  showTheMessage(){
    this.showMessage=!this.showMessage
  }
   
  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllContactUS(page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }
  getPaginationRange(): number[] {
    let start: number;
    let end: number;

    if (this.totalPages <= 9) {
      // If total pages is 9 or less, show all page numbers
      start = 1;
      end = this.totalPages;
    } else {
      // If more than 9 pages, calculate start and end based on current page
      if (this.currentPage <= 6) {
        // If current page is 6 or less, start from 1
        start = 1;
        end = 9;
      } else if (this.currentPage + 4 >= this.totalPages) {
        // If current page is near the end, show the last 9 pages
        start = this.totalPages - 8;
        end = this.totalPages;
      } else {
        // Otherwise, show 4 pages before and 4 pages after the current page
        start = this.currentPage - 4;
        end = this.currentPage + 4;
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
 

}
