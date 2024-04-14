import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../Service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  // @Input() productDetail! : any;
  // @Output() removeEditViewComp = new EventEmitter<void>();

  formVailde: boolean = true;
  projectForm!: FormGroup;
  pType: any;
  getControl(name: string): FormControl {
    return this.projectForm.get(name) as FormControl;
  }

  constructor(
    protected productService: ProductService,
    private router: Router
  ) {}
  ngOnInit() {
    console.log(this.productService.productObject.category);
    this.projectForm = new FormGroup({
      name: new FormControl(this.productService.productObject.name, [
        Validators.required,
      ]),
      shade: new FormControl(this.productService.productObject.shade),
      color: new FormControl(this.productService.productObject.base_color),
      description: new FormControl(
        this.productService.productObject.description,
        [Validators.required]
      ),
      price: new FormControl(this.productService.productObject.price, [
        Validators.required,
      ]),
      stock_quantity: new FormControl(
        this.productService.productObject.stock_quantity,
        [Validators.required]
      ),
      p_type: new FormControl(this.productService.productObject.p_type, [
        Validators.required,
      ]),
      category: new FormControl(this.productService.productObject.category, [
        Validators.required,
      ]),
      discount: new FormControl(
        this.productService.productObject.product_discount,
        [Validators.required]
      ),
      p_id: new FormControl(this.productService.productObject.product_id, [
        Validators.required,
      ]),
    });
    this.getTypeList();
    this.getCategoryList(this.pType);
  }
  files: any[] = [];
  handleFileInputChange(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      this.files = Array.from(selectedFiles);
      const filenames: string[] = [];
      for (let i = 0; i < this.files.length; i++) {
        filenames.push(this.files[i].name);
      }
      const filenamesString = filenames.join(', ');
      this.projectForm.patchValue({ fileInput: filenamesString });

      // Assuming you have a product object where you want to store images
      const product = {
        product_image1: this.files[0], // Assign the first file to product_image1
        product_image2: this.files[1], // Assign the second file to product_image2
        product_image3: this.files[2], // Assign the third file to product_image3
        product_image4: this.files[3], // Assign the fourth file to product_image4
        product_image5: this.files[4], // Assign the fifth file to product_image5
      };

      // Now you can use the product object to store or process the images
      console.log('product image', product);
    }
  }

  onSaveProject() {
    console.log(this.projectForm.value);

    if (this.projectForm.valid) {
      const formData = new FormData();

      // Append form fields to formData
      formData.append('name', this.projectForm.value.name);
      formData.append('shade', this.projectForm.value.shade || '');
      formData.append('color', this.projectForm.value.color || '');
      formData.append('description', this.projectForm.value.description);
      formData.append('price', this.projectForm.value.price.toString());
      formData.append(
        'stock_quantity',
        this.projectForm.value.stock_quantity.toString()
      );
      formData.append('p_type', this.projectForm.value.p_type);
      formData.append('category', this.projectForm.value.category);
      formData.append('discount', this.projectForm.value.discount.toString());
      formData.append('p_id', this.projectForm.value.p_id);

      // Append file inputs if they exist
      this.files.forEach((file, index) => {
        if (file) {
          formData.append(`product_image${index + 1}`, file);
        }
      });

      console.log(formData);
      this.formVailde = true;
      this.productService.updateProduct(formData).subscribe(
        (res: any) => {
          console.log(res);
          this.projectForm.reset();
          this.files = []; // Clear the files array
        },
        (error: any) => {
          console.log(error.error.error);
        }
      );
    } else {
      this.formVailde = false;
    }
  }

  selectedCategory: string = ''; //amma kam type halbzhard aixata naw selecedCategory
  selectCategory(category: any) {
    this.selectedCategory = category.target.value;
    // Reset submenu selection when a new category is chosen
    // this.selectedSubCategory = 'Choose Option';
    this.getCategoryList(category.target.value);
    console.log(
      'selected category',
      this.productService.productObject.category
    );
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
  onDestroyForm() {
    this.projectForm.reset();
    this.router.navigate(['/product-details']);
  }
}
