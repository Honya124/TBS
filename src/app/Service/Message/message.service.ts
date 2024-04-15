import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {


  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
  // private http:HttpClient = inject(HttpClient);
  ShipmentObject:any

constructor(
  private http: HttpClient,
  public publicService: PublicService,
) {}

 addShipment(data: any) {
    console.log(data);
    return this.http.post(this.apiUrl + '/set_shipping_payment', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }


  updateShipment(data:any){
    console.log("shipping service update",data);
    return this.http.put(this.apiUrl + '/update_shipping_payment', data,
     {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getContactUsList(page:any){
    let url = this.apiUrl + '/contact_us_list?page=' + page;
  
    // Construct the headers, including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
  
    return this.http.get(url, { headers });
  }
}
