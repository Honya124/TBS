import { Component, signal } from '@angular/core';
import { OrderService } from '../../Service/Order/order.service';
import { PublicService } from '../../Service/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  allOrderArray: any[] = [];
  allOrderTemp: any[] = [];
  currentPage: number = 1;
  totalPages: any;
  activeStatus: string = '';
  allOrdersToggle:boolean=true
  statusToggle:boolean=false
  constructor(
    private orderService: OrderService,
    public publicService: PublicService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllOrders(this.currentPage);
  }

  // goToOrderDetails(id:any){
  //   this.orderService.orderDetail_id=id
  //   }
  // changeStatusFunc(order_id:any){
  //   this.orderService.changeStatus(order_id).subscribe(
  //    (data: any) => {
  //      console.log("change status",data)
  //    },
  //    (error) => {
  //      console.error('Error fetching data: ', error);
  //    }
 
  //   )
  //  }
  statusList=signal([
    'Processing','Delivered','Shipped','Canceled'
  ])

  goToBlogDetails(id:any){
    this.orderService.orderDetail_id=id
    }
  
  //   goToBlogDetails(){
  //   this.allOrderArray=this.allOrderTemp
  //   this.allOrdersToggle=true
  //   this.statusToggle=false
  // }

  isActiveStatus(status: string): boolean {
    return this.activeStatus === status && this.statusToggle;
  }
  getSortOrderStatusFunc(status:any){
    this.activeStatus = status; // Set the active status
    this.orderService.getSortOrders(status,this.currentPage).subscribe(
      (data: any) => {
        this.allOrderArray=data['orders'];
        this.totalPages = data['total_pages'];
        this.statusToggle = this.statusList().some(sta => sta === status);
        this.allOrdersToggle=false
        console.log("get sort order",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );

  }

  getAllOrders(page: any) {
    this.orderService.getAllOrders(page).subscribe(
      (data: any) => {
        this.allOrderArray=data['orders'];
        this.totalPages = data['total_pages'];
        this.allOrderTemp=data['orders'];
        // this.sourceData = res;
        // this.orderTableData = res.slice(0,this.SliceQuantity);
        // this.numbers = Array(Math.ceil(this.sourceData.length/this.SliceQuantity)).fill(0).map((x,i)=>i);
        // this.slicedNumber = this.numbers.slice(0,this.paginationNumber);
        // this.numberLenght = this.numbers.length;
        console.log("getAllOrders",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  
  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllOrders(page);
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
 

    // for testt=ing
    allBlogsArray: any[] = [];
    // currentPage: number = 1;
    // totalPages: any;
    showOrderItem:boolean=false;
    showDashBoard:boolean=false;
    showUsers:boolean=false;
    showCustomers:boolean=false;
    showProducts:boolean=false;
    showOrders:boolean=false;
    showShipments:boolean=false;
    showBlogs:boolean=false;
    showReviews:boolean=false;
    showMessages:boolean=false;
  
    showOrderItemFun(){
      this.showOrderItem=!this.showOrderItem;
      
    }
  
    showAllOrdersFunc(){
      this.allOrderArray=this.allOrderTemp
      this.allOrdersToggle=true
      this.statusToggle=false
    }

}
