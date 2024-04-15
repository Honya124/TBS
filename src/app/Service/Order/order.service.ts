import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
  // private http:HttpClient = inject(HttpClient);

  orderDetail_id:any
constructor(
  private http: HttpClient,
  public publicService: PublicService,
) {}



//jare bakarm nahenawa
changeStatus(order_id:any){
  console.log(order_id);
  return this.http.put(this.apiUrl + '/change_order_status?order_id='+order_id, {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),

    }),
  });
}

// bakarm nahenawa
getOrderHistory(page: any) {
  return this.http.get(this.apiUrl + '/order_history?page='+page
, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  });
}

getOrderInfo(id: any) {
  return this.http.get(this.apiUrl + '/emp_order_info?order_id='+id
, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  });
}
getAllOrders(page:any){
  let url = this.apiUrl + '/get_all_orders?page=' + page;

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // Construct the headers, including the authorization token
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Add the token to the headers
  });

  return this.http.get(url, { headers });
}

getSortOrders(status:any,page:any){
  let url = this.apiUrl + '/sort_orders?status='+status
  +"&page=" + page;

  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // Construct the headers, including the authorization token
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Add the token to the headers
  });

  return this.http.get(url, { headers });
}
}
