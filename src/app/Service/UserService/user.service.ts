import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicService } from '../public.service';
@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
  lang = localStorage.getItem('selectedLanguage');
  // private http:HttpClient = inject(HttpClient);
  constructor(private http: HttpClient, public publicService: PublicService) {}

  

  updateUser(data: any) {
    console.log(data);
    return this.http.put(this.apiUrl + `/update_employee?lang=${this.lang}`, data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  // admin add user(employee)
  addUser(data: any) {
    console.log(data);
    return this.http.post(this.apiUrl + '/new_employee?lang='+this.lang, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

 

  loginUser(phone: string, password: string, country_code: string) {
    const body = { phone, password, country_code };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  // deleteUser(emp_id: any) {
  //   console.log(emp_id);
  //   return this.http.delete(this.apiUrl + ' /delete_employee?lang='+this.lang+
  //   "&emp_id="+ emp_id, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),
  //     }),
  //   });
  // }
  deleteUser(emp_id: number) {
    console.log(emp_id);
    return this.http.delete(this.apiUrl + '/delete_employee?emp_id='+emp_id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getUsers(page: any) {
    let url = this.apiUrl + '/employee_list?lang='+this.lang +
    "&page="+ page;

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Construct the headers, including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add the token to the headers
    });

    return this.http.get(url, { headers });
  }


  // searchUser(keyword:any,page: any) {
  //   return this.http.get(
  //     this.apiUrl +
  //       '/search_employees?lang='+this.lang+
  //      "&keyword="+ keyword +
  //       '&page='+page,
  //     {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the token to the headers
  //       }),
  //     }
  //   );
  // }
  searchUser(keyword:any,page: any) {
    return this.http.post(
      this.apiUrl +
        '/search_employees?lang='+this.lang,{
          "keyword":keyword,
          "page":page
        },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
      }
    );
  }

}
