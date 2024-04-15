import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
    // private http:HttpClient = inject(HttpClient);

    customerDetail_id:any
  constructor(
    private http: HttpClient,
    public publicService: PublicService,
  ) {}

  
  updateUser(id:string,data:any){
    console.log(data);
    return this.http.put(this.apiUrl + `/update_employee/${id}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getCustomerDetail(id: any) {
    return this.http.get(this.apiUrl + '/customer_info?cust_id=' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getCustomerOrderHistory(page: any) {
    return this.http.get(this.apiUrl + '/emp_order_history?page='+page
    +"&cust_id="+this.customerDetail_id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
  //getting customer code
  getCustomerHistoryCode(page: any) {
    return this.http.get(this.apiUrl + '/customer_history_codes?cust_id='+this.customerDetail_id
    +"&page="+page, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

    // admin add user(employee)
  addUser(data: any) {
    console.log(data);
    return this.http.post(this.apiUrl + '/new_employee', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + localStorage.getItem('token'),
        
      }),
    });
  }

  deleteUser(emp_id:any){
    console.log(emp_id);
    return this.http.put(this.apiUrl + ' /delete_employee?emp_id='+emp_id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getCustomers(page:any){
    let url = this.apiUrl + '/customer_list?page=' + page;
  
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
