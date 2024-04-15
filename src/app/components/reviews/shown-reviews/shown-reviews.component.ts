import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-shown-reviews',
  templateUrl: './shown-reviews.component.html',
  styleUrl: './shown-reviews.component.css'
})
export class ShownReviewsComponent {

  shownReviewLists=signal([
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
    {
      id:3,
      username:"Lana Steiner",
      title:"#242332228",
      product:"Lipstick",
      rating:"4",
      date:"Jan 6, 2022",
      img:"../../../assets/img/profileImg.png"
    },
    {
      id:4,
      username:"Andi Lane",
      title:"#242332228",
      product:"Lipstick",
      rating:"4",
      date:"Jan 6, 2022",
      img:"../../../assets/img/profileImg.png"
    },
  ])


}
