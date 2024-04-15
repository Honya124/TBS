import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hide-reviews',
  templateUrl: './hide-reviews.component.html',
  styleUrl: './hide-reviews.component.css'
})
export class HideReviewsComponent {

  hideReviewLists=signal([
    {
      id:1,
      username:"Olivia Rhye",
      title:"#242332228",
      product:"Lipstick",
      rating:"4",
      date:"Jan 6, 2022",
      img:"../../../assets/img/profileImg.png"
    },
    {
      id:2,
      username:"Phoenix Baker",
      title:"#242332228",
      product:"Powder",
      rating:"4",
      date:"Jan 6, 2022",
      img:"../../../assets/img/profileImg.png"
    },
  
  ])

}
