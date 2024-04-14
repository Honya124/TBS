import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../Service/product.service';
import { AppComponent } from '../../../app.component';
import { PublicService } from '../../../Service/public.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  form!: FormGroup;
  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
  constructor(
    public appComponent: AppComponent,
    private fb: FormBuilder,
    private router: Router,
    public service: PublicService,
    public productService: ProductService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      shade: [''],
      color: [''],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
      stock_quantity: [0, [Validators.required]],
      p_type: ['', [Validators.required]],
      category: ['', [Validators.required]],
      discount: ['', [Validators.required]],
    });

    this.getTypeList();
  }

  files: File[] = [];

  handleFileInputChange(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      this.files = Array.from(selectedFiles);
      const filenames: string[] = [];
      for (let i = 0; i < this.files.length; i++) {
        filenames.push(this.files[i].name);
      }
      const filenamesString = filenames.join(', ');
      this.form.patchValue({ fileInput: filenamesString });

      // Assuming you have a product object where you want to store images
      const product = {
        product_image1: this.files[0],
        product_image2: this.files[1],
        product_image3: this.files[2],
        product_image4: this.files[3],
        product_image5: this.files[4],
      };

      // Now you can use the product object to store or process the images
      console.log('product image', product);
    }
  }

  data: any;
  onSubmit() {
    const formData = new FormData();

    // Append string fields
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('price', this.form.value.price.toString());
    formData.append(
      'stock_quantity',
      this.form.value.stock_quantity.toString()
    );
    formData.append('p_type', this.form.value.p_type);
    formData.append('category', this.form.value.category);
    formData.append('discount', this.form.value.discount.toString());

    // Append optional string fields only if they have values
    if (this.form.value.shade) {
      formData.append('shade', this.form.value.shade);
    }
    if (this.form.value.color) {
      formData.append('color', this.form.value.color);
    }

    // Append file fields
    this.files.forEach((file, index) => {
      if (file) {
        formData.append(`product_image${index + 1}`, file);
      }
    });

    // Use your service to send formData to your backend
    this.productService.addProduct(formData).subscribe(
      (res: any) => {
        alert('Product created successfully');
        this.form.reset();
        this.files = []; // Clear the file array
      },
      (error) => {
        alert('Error creating product: ' + error.error.detail);
      }
    );
  }

  selectedCategory: string = ''; //amma kam type halbzhard aixata naw selecedCategory
  selectCategory(category: any) {
    this.selectedCategory = category.target.value;
    // Reset submenu selection when a new category is chosen
    // this.selectedSubCategory = 'Choose Option';
    this.getCategoryList(category.target.value);
    console.log('selected category', category.target.value);
  }

  // Define function to select subcategory
  selectedSubCategory: string = '';
  selectSubCategory(subCategory: string) {
    this.selectedSubCategory = subCategory;
    // this.getCategoryProducts(this.currentPage, subCategory, this.selectedCategory);
  }

  typeList: any;
  getTypeList() {
    this.productService.getypes().subscribe(
      (data: any) => {
        console.log(data);
        // {"types":["skin care","makeup"]}
        this.typeList = data['types'];
        console.log('type', this.typeList);
      },
      (error) => {
        console.error('Error fetching data: ', error);
        // alert(error.error.detail);
      }
    );
  }
  categoryList: any;
  getCategoryList(type: any) {
    console.log(type);
    this.productService.getCategories(type).subscribe(
      (data: any) => {
        console.log(data);
        this.categoryList = data['categories'];
        console.log('sub category', this.categoryList);
        // {"types":["skin care","makeup"]}
      },
      (error) => {
        console.error('Error fetching data: ', error);
        // alert(error.error.detail);
      }
    );
  }

  cancelNewProduct() {
    this.form.reset();
  }

  // files:any;
  // handleFileInputChange(event: any) {
  //   this.files = event.target.files;
  //   const filenames: string[] = [];

  //   for (let i = 0; i < this.files.length; i++) {
  //     filenames.push(this.files[i].name);
  //   }

  //   const filenamesString = filenames.join(', ');
  //   this.form.patchValue({ fileInput: filenamesString });
  // }
  // "first_name": "string",
  //   "last_name": "string",
  //   "country_code": "string",
  //   "phone": "string",
  //   "email": "",
  //   "password": "string",
  //   "confirm_password": "string"
}
