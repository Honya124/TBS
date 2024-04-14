import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Service/UserService/user.service';
import { PublicService } from '../../Service/public.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  allUsersArray: any[] = [];
  currentPage: number = 1;
  totalPages: any;
  element: any;
  // SliceQuantity : number = 8;
  // orderTableData : any;
  // numbers : any;
  // sourceData :any;

  constructor(
    private userService: UserService,
    public publicService: PublicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers(this.currentPage);
  }

  getAllUsers(page: any) {
    this.userService.getUsers(page).subscribe(
      (data: any) => {
        this.allUsersArray = data['employees'];
        this.totalPages = data['total_pages'];
        // this.sourceData = res;
        // this.orderTableData = res.slice(0,this.SliceQuantity);
        // this.numbers = Array(Math.ceil(this.sourceData.length/this.SliceQuantity)).fill(0).map((x,i)=>i);
        // this.slicedNumber = this.numbers.slice(0,this.paginationNumber);
        // this.numberLenght = this.numbers.length;
        console.log('getAllUsers', data);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  showEditUser = false;
  editUserFunc(data: any) {
    this.element = data;
    this.showEditUser = true;
  }
  removeEditView() {
    this.element = null;
    this.showEditUser = false;
  }

  //Pagination section
  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllUsers(page);
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

  ///Pagination Section///

  // indegater : number = 1;
  // slicedNumber : any;
  // paginationNumber : number = 11;
  // numberLenght : number = 0;
  // nextPageHandler(index : number){
  //   this.indegater = index;
  //   this.orderTableData = this.sourceData.slice((index-1) *this.SliceQuantity,index*this.SliceQuantity);
  //   if(this.numberLenght>11){
  //     if(index+6>this.numberLenght)this.slicedNumber = this.numbers.slice(this.numberLenght-11,this.numberLenght);
  //     else if(this.indegater*1-4<0)this.slicedNumber = this.numbers.slice(0,11);
  //     else this.slicedNumber = this.numbers.slice(index-4,index+7);
  //   }
  // }
  // plusPageHandler(){
  //   if(this.indegater<this.numbers.length){
  //     this.indegater = this.indegater + 1;
  //     const index = this.indegater;
  //     this.orderTableData = this.sourceData.slice((this.indegater*this.SliceQuantity)-this.SliceQuantity,this.indegater*this.SliceQuantity);
  //     if(this.numberLenght>11){
  //       if(index+6>this.numberLenght)this.slicedNumber = this.numbers.slice(this.numberLenght-11,this.numberLenght);
  //       else if(this.indegater*1-4<0)this.slicedNumber = this.numbers.slice(0,11);
  //       else this.slicedNumber = this.numbers.slice(index-4,index+7);
  //     }
  //   }
  //   else return;
  // }
  // minusPageHandler(){
  //   if(this.indegater>1){
  //     this.indegater = this.indegater - 1;
  //     const index = this.indegater;
  //     this.orderTableData = this.sourceData.slice((this.indegater*this.SliceQuantity)-this.SliceQuantity,this.indegater*this.SliceQuantity);
  //     if(this.numberLenght>11){
  //       if(index+6>this.numberLenght)this.slicedNumber = this.numbers.slice(this.numberLenght-11,this.numberLenght);
  //       else if(this.indegater*1-5<0)this.slicedNumber = this.numbers.slice(0,11);
  //       else this.slicedNumber = this.numbers.slice(index-5,index+6);
  //     }
  //   }
  // }

  // just an example
  usersList = signal([
    {
      id: 1,
      username: 'Olivia Rhye',
      email: 'olivia@untitledui.com',
      phoneNo: 'Monthly subscription',
      password: 'Monthly subscription',
      date: 'Jan 6, 2022',
      img: '../../../assets/img/profileImg.png',
    },
    {
      id: 2,
      username: 'Phoenix Baker',
      email: 'phoenix@untitledui.com',
      phoneNo: 'Monthly subscription',
      password: 'Monthly subscription',
      date: 'Jan 6, 2022',
      img: '../../../assets/img/profileImg.png',
    },
    {
      id: 3,
      username: 'Lana Steiner',
      email: 'lana@untitledui.com',
      phoneNo: 'Monthly subscription',
      password: 'Monthly subscription',
      date: 'Jan 6, 2022',
      img: '../../../assets/img/profileImg.png',
    },
    {
      id: 4,
      username: 'Andi Lane',
      email: 'andi@untitledui.com',
      phoneNo: 'Monthly subscription',
      password: 'Monthly subscription',
      date: 'Jan 6, 2022',
      img: '../../../assets/img/profileImg.png',
    },
  ]);
}
