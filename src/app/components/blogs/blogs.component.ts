import { Component } from '@angular/core';
import { BlogService } from '../../Service/Blog/blog.service';
import { PublicService } from '../../Service/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  
  
  allBlogArray: any[] = [];
  allBlogTemp: any[] = [];
  currentPage: number = 1;
  totalPages: any;
  constructor(
    private blogService: BlogService,
    public publicService: PublicService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllBlogs(this.currentPage);
  }

  toggleDescription(item: any): void {
    item.showFullDescription = !item.showFullDescription;
  }
 
  goToUpdateShipment(data:any){
    console.log("go to update shipment",data)
    // this.blogService.ShipmentObject=data
  }

  getAllBlogs(page: any) {
    this.blogService.getAllBlogs(page).subscribe(
      (data: any) => {
        this.allBlogArray=data['blogs'];
        this.totalPages = data['total_pages'];
        console.log("get All blogs",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

 deleteBlog(blog_id:any){

  this.blogService.deleteBlog(blog_id).subscribe(
    (data: any) => {
      // this.allShipmentArray=data['shipping_places'];
      // this.totalPages = data['total_pages'];
      console.log("delete blog",data)
    },
    (error) => {
      console.error('Error fetching data: ', error);
    }
  );

 }
   
  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllBlogs(page);
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
