import { Component } from '@angular/core';
import { CustomerService } from '../../../Service/Customer/customer.service';
import { PublicService } from '../../../Service/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  customerDetails: any = [];
  allCustomerOrderHistoryArray: any[] = [];
  customerOrderHistory: any[] = [];
  currentPage: number = 1;
  totalPages: any;
  showAllOrdersLength:number=0
  showDeliveredLength:number=0
  showShippedLength:number=0
  showCanceledLength:number=0
  showProcessingLength:number=0


  
  constructor(
    public customerService: CustomerService,
    public publicService: PublicService,
    private router:Router
  ) {}

  ngOnInit(): void {
    console.log("customer_id ",this.customerService.customerDetail_id)
    this.customerService
      .getCustomerDetail(this.customerService.customerDetail_id)
      .subscribe(
        (data: any) => {
          console.log("customer details",data)
          this.customerDetails=data.Customer
          // this.product = data.product;
          // this.images = data.product.image_url.filter(
          //   (url: string) => url.trim() !== ''
          // );
          // this.selectedImage = this.images[0];
          // this.shades = data.shades;
        },
        (error) => {
          console.error('Error fetching data: ', error);
        }
      );

      this.getCustomerOrderHistoryFun(this.currentPage)
      // this.getCustomerHistoryCodeFun()
  }

  getCustomerOrderHistoryFun(page:number){
    this.customerService.getCustomerOrderHistory(page).subscribe(
      (data: any) => {
        console.log("customer order history",data)
        this.totalPages = data['total_pages'];
        this.allCustomerOrderHistoryArray=data['orders']
this.customerOrderHistory=data['orders']
         this.showAllOrdersLength=this.allCustomerOrderHistoryArray.length
         this.showProcessingLength=this.allCustomerOrderHistoryArray.filter(custHistory=>custHistory.status ==="Processing").length
        this.showDeliveredLength=this.allCustomerOrderHistoryArray.filter(custHistory=>custHistory.status ==="Delivered").length
        this.showCanceledLength=this.allCustomerOrderHistoryArray.filter(custHistory=>custHistory.status ==="Canceled").length
        this.showShippedLength=this.allCustomerOrderHistoryArray.filter(custHistory=>custHistory.status ==="Shipped").length
        // this.product = data.product;
        // this.images = data.product.image_url.filter(
        //   (url: string) => url.trim() !== ''
        // );
        // this.selectedImage = this.images[0];
        // this.shades = data.shades;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    )

  }
  // jare eshi pe nakain
  getCustomerHistoryCodeFun(){
    this.customerService.getCustomerHistoryCode(1).subscribe(
      (data: any) => {
        console.log("getCustomerHistoryCode",data)
        this.allCustomerOrderHistoryArray=data.orders
        // this.product = data.product;
        // this.images = data.product.image_url.filter(
        //   (url: string) => url.trim() !== ''
        // );
        // this.selectedImage = this.images[0];
        // this.shades = data.shades;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    )

  }

  showOrderItem:boolean=false
//for testting
  showOrderItemFun(){
    this.showOrderItem=!this.showOrderItem;
  }

  
  showAllOrdersFunc(){
    this.allCustomerOrderHistoryArray=this.customerOrderHistory
  
  }
  showDeliveredFunc(){
    this.allCustomerOrderHistoryArray=this.customerOrderHistory.filter(custHistory=>custHistory.status ==="Delivered")
  }
  showShippedFunc(){
    this.allCustomerOrderHistoryArray=this.customerOrderHistory.filter(custHistory=>custHistory.status ==="Shipped")
  }
  showCanceledFunc(){
    this.allCustomerOrderHistoryArray=this.customerOrderHistory.filter(custHistory=>custHistory.status ==="Canceled")
  }
  showProcessingFunc(){
    this.allCustomerOrderHistoryArray=this.customerOrderHistory.filter(custHistory=>custHistory.status ==="Processing")
  }
  


  goToPage(page: number): void {
    this.currentPage = page;
    this.getCustomerOrderHistoryFun(page);
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
