import { Component } from '@angular/core';
import { ReviewService } from '../../Service/Review/review.service';
import { PublicService } from '../../Service/public.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  
  allShownReviewArray: any[] = [];
  allHiddenReviewArray: any[] = [];
  tempReviewArray: any[] = [];
  showReview:boolean=true;
  hideReview:boolean=false
  currentPage: number = 1;
  totalPages: any;
  searchValue:any;
  constructor(
    private reviewService: ReviewService,
    public publicService: PublicService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
      this.getShownReviewsFun(this.currentPage);
      this.getHiddenReviewsFun(this.currentPage);
  }
 
  shownReviewFun(){
    this.showReview=true;
    this.hideReview=false;
    // this.router.navigate(['/reviews/shown-reviews'])
  
    }
    hiddenReviewFun(){
      this.showReview=false;
    this.hideReview=true;
      // this.router.navigate(['/reviews/hide-reviews'])
    }

  getShownReviewsFun(page: any) {
    this.reviewService.getShownRevies(page).subscribe(
      (data: any) => {
        this.allShownReviewArray=data['reviews'];
        this.totalPages = data['total_pages'];
        console.log("shown Review",data['reviews'])
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  getHiddenReviewsFun(page: any) {
    this.reviewService.getHiddenRevies(page).subscribe(
      (data: any) => {
        this.allHiddenReviewArray=data['reviews'];
        this.totalPages = data['total_pages'];
        console.log("hidden Review",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  hideReviewFun(id:number){
    console.log(id)
    this.reviewService.hideReview(id).subscribe(
      (data: any) => {
        // this.allHiddenReviewArray=data['reviews'];
        // this.totalPages = data['total_pages'];
        console.log("data is hidden",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }

    )

  }
  showReviewFun(id:number){
    console.log(id)
    this.reviewService.showReview(id).subscribe(
      (data: any) => {
        // this.allHiddenReviewArray=data['reviews'];
        // this.totalPages = data['total_pages'];
        console.log("data is shown",data)
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }

    )

  }


   
  goToPage(page: number): void {
    this.currentPage = page;
    this.getShownReviewsFun(page);
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

  //testing
  shownProduct:boolean=true;
  hideProduct:boolean=false;
  showFun(){
  this.shownProduct=true;
  this.hideProduct=false;
  // this.router.navigate(['/reviews/shown-reviews'])

  }
  hideProductFun(){
    this.hideProduct=true;
    this.shownProduct=false;
    // this.router.navigate(['/reviews/hide-reviews'])
  }

}
