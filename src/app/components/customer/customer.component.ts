import { Component } from '@angular/core';
import { PublicService } from '../../Service/public.service';
import { CustomerService } from '../../Service/Customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  allCustomersArray: any[] = [];
  currentPage: number = 1;
  totalPages: any;
  constructor(
    private customerService: CustomerService,
    public publicService: PublicService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllCustomers(this.currentPage);
  }

  goToCustomerDetails(id:any){
    this.customerService.customerDetail_id=id
    }

  getAllCustomers(page: any) {
    this.customerService.getCustomers(page).subscribe(
      (data: any) => {
        this.allCustomersArray=data['customers'];
        this.totalPages = data['total_pages'];
        // this.sourceData = res;
        // this.orderTableData = res.slice(0,this.SliceQuantity);
        // this.numbers = Array(Math.ceil(this.sourceData.length/this.SliceQuantity)).fill(0).map((x,i)=>i);
        // this.slicedNumber = this.numbers.slice(0,this.paginationNumber);
        // this.numberLenght = this.numbers.length;
        console.log("getAllCustomers",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }


}
