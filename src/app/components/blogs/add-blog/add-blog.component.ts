import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';
import { PublicService } from '../../../Service/public.service';
import { BlogService } from '../../../Service/Blog/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {

  
  form!: FormGroup;
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
  constructor(
    public appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    public publicService: PublicService,
    public blogService: BlogService
  ) {}
  ngOnInit(): void {
  this.form = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    passport_scan: new FormControl(null),
    
  });

}


onFileSelected(event: Event, formControlName: string): void {
 
  const element = event.currentTarget as HTMLInputElement;
  let fileList: FileList | null = element.files;
  console.log(fileList)
  
  if (fileList) {
    this.blogService.blogImageObj=fileList[0]
    this.form.get(formControlName)?.setValue(fileList[0]);
  }
}
data: any;
onSubmit() {
  // this.data = {
  //   title: this.form.value.title,
  //   description: this.form.value.description,
  //   blog_image: this.form.value.passport_scan,

  // };

  this.blogService.AddBlog(this.form.value.title,this.form.value.description,this.blogService.blogImageObj).subscribe(
    (res: any) => {
      alert('created successfully');
      //  this.removeFormData()
    },
    (error) => {
      alert(error.error.detail);
    }
  );
}

removeForm(){
  this.form.reset()
}

}
