import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

 
  private apiUrl = 'https://belita-backend-ece2qdboea-uc.a.run.app';
  // private http:HttpClient = inject(HttpClient);
  blogImageObj:any

constructor(
  private http: HttpClient,
  public publicService: PublicService,
) {}
data:any
 AddBlog(title:string,description:string,blogImage:any) {
  console.log("blog image",blogImage)
  this.data = {
    title:title,
    description:description,
    blog_image:blogImage,

  };
    console.log(this.data);
    return this.http.post(this.apiUrl + '/new_blog', this.data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }


  updateBlog(data:any){
    console.log("blog update",data);
    return this.http.put(this.apiUrl + '/update_blog', data,
     {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }

  getAllBlogs(page:any){
    let url = this.apiUrl + '/get_blogs?page=' + page;
  
    // Construct the headers, including the authorization token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.get(url, { headers });
  }

  deleteBlog(id:any){
    console.log(id);
    return this.http.put(this.apiUrl + ' /delete_blog?blog_id='+id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    });
  }
}
