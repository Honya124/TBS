import { Component } from '@angular/core';
import { ShippingService } from '../../Service/Shipping/shipping.service';
import { PublicService } from '../../Service/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.css'
})
export class ShipmentsComponent {
  
  allShipmentArray: any[] = [];
  allOrderTemp: any[] = [];
  currentPage: number = 1;
  totalPages: any;
  searchValue:any;
  constructor(
    private shippingService: ShippingService,
    public publicService: PublicService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllShipments(this.currentPage);
  }
 
  goToUpdateShipment(data:any){
    console.log("go to update shipment",data)
    this.shippingService.ShipmentObject=data
  }

  getAllShipments(page: any) {
    this.shippingService.getAllShipping(page).subscribe(
      (data: any) => {
        this.allShipmentArray=data['shipping_places'];
        this.totalPages = data['total_pages'];
        console.log("get All Shipments",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

    //  search by shipment place
    searchShipmentPlace(keyword:any){
      this.allShipmentArray=this.allOrderTemp.filter(shipment=>shipment.shipping_place.toLowerCase() === keyword.toLowerCase())
     
  }


   
  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllShipments(page);
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
