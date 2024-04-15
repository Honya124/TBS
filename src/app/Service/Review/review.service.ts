import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {


  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
  // private http:HttpClient = inject(HttpClient);
  ShipmentObject:any

constructor(
  private http: HttpClient,
  public publicService: PublicService,
) {}



  getShownRevies(page:any){
    let url = this.apiUrl + '/shown_reviews?page=' + page;
    // Construct the headers, including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  
    return this.http.get(url, { headers });
  }

  getHiddenRevies(page:any){
    let url = this.apiUrl + '/hidden_reviews?page=' + page;
    // Construct the headers, including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  
    return this.http.get(url, { headers });
  }


  hideReview(id:number){
    console.log("hide review service",id)
    
    return this.http.patch(this.apiUrl + '/hide_review?review_id='+id,
     {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
  showReview(id:any){
    return this.http.patch(this.apiUrl + '/show_review?review_id=', id,
     {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
