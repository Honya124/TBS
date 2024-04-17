import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
  productDetail_id: any;
  productObject: any;

  // private http:HttpClient = inject(HttpClient);
  constructor(private http: HttpClient, public publicService: PublicService) {}

  addProduct(data: any) {
    console.log(data);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post(this.apiUrl + '/new_product', data, { headers });
  }

  // addCategory(data: any) {
  //   console.log(data);
  //   return this.http.post(this.apiUrl + '/new_product', data, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),

  //     }),
  //   });
  // }
  // addType(data: any) {
  //   console.log(data);
  //   return this.http.post(this.apiUrl + '/new_product', data, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),

  //     }),
  //   });
  // }

  // deleteProduct(id:any){
  //   console.log(id);
  //   return this.http.put(this.apiUrl + ' /delete_employee?emp_id='+id,{
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + localStorage.getItem('token'),
  //     }),
  //   });
  // }

  getProductDetail(id: any) {
    return this.http.get(this.apiUrl + '/product_details?product_id=' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  getProducts(data:any) {
    return this.http.post(this.apiUrl + '/list_filter_products',data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });

  }

  
  getCategories(type: any) {
    let url = this.apiUrl + '/get_categories?type=' + type;
    // Construct the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }
  getypes() {
    let url = this.apiUrl + '/get_types';
    // Construct the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(url, { headers });
  }

  searchByCategory(type: any, category: any, keyword: any, page: any) {
    return this.http.post(
      this.apiUrl + '/search_cat_products',
      {
        p_type: type,
        category: category,
        keyword: keyword,
        page: page,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  searchByProduct(keyword: any, page: any) {
    return this.http.post(
      this.apiUrl + '/search_all_products',
      {
        keyword: keyword,
        page: page,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
  updateProduct(data: any) {
    console.log(data);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.put(this.apiUrl + '/update_product', data, { headers });
  }
}
