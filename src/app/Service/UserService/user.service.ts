import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicService } from '../public.service';
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
  // private http:HttpClient = inject(HttpClient);
  constructor(private http: HttpClient, public publicService: PublicService) {}

  updateUser(id: string, data: any) {
    console.log(data);
    return this.http.put(this.apiUrl + `/update_employee/${id}`, data, {
      headers: new HttpHeaders({
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

  loginUser(phone: string, password: string, country_code: string) {
    const body = { phone, password, country_code };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  deleteUser(emp_id: any) {
    console.log(emp_id);
    return this.http.put(this.apiUrl + ' /delete_employee?emp_id=' + emp_id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getUsers(page: any) {
    let url = this.apiUrl + '/employee_list?page=' + page;

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
