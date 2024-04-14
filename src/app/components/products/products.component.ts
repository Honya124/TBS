import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { PublicService } from '../../Service/public.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  allBlogsArray: any[] = [];
  currentPage: number = 1;
  totalPages: any;

  allProductsArray: any[] = [];
  element: any;
  searchValue: any;
  // SliceQuantity : number = 8;
  // orderTableData : any;
  // numbers : any;
  // sourceData :any;

  constructor(
    private productService: ProductService,
    public publicService: PublicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts(this.currentPage);
  }

  goToProductDetails(id: any) {
    this.productService.productDetail_id = id;
  }

  getAllProducts(page: number) {
    this.productService.getProducts(page).subscribe(
      (data: any) => {
        this.totalPages = data['total_pages'];
        this.flattenProducts(data['all_products']);
        console.log(data);
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }
  // .price}}
  // </td>
  // <td class="px-6 py-3 ">
  //     {{product.discount}}
  // </td>
  // <td class="px-6 py-3 ">
  //     {{product.new_price}}

  private flattenProducts(allProducts: any) {
    this.allProductsArray = [];
    console.log('allProductsArray', this.allProductsArray);
    let aggregatedProducts: { [key: string]: any } = {};

    for (let category in allProducts) {
      const products = allProducts[category];
      if (!aggregatedProducts[category]) {
        aggregatedProducts[category] = {
          colors: [],
          productName: category,
          image: '',
          availability: false,
          price: '',
          discount: '',
          new_price: '',
          type: '',
          product_id: '',
        };
      }

      products.forEach((product: any) => {
        // Select an image for the product type, if not already selected
        if (!aggregatedProducts[category].image) {
          aggregatedProducts[category].image = product.image;
        }
        if (!aggregatedProducts[category].product_id) {
          aggregatedProducts[category].product_id = product.product_id;
        }
        if (!aggregatedProducts[category].availability) {
          aggregatedProducts[category].availability = product.availability;
        }
        if (!aggregatedProducts[category].type) {
          aggregatedProducts[category].type = product.type;
        }
        if (!aggregatedProducts[category].price) {
          aggregatedProducts[category].price = product.price;
        }
        if (!aggregatedProducts[category].discount) {
          aggregatedProducts[category].discount = product.discount;
        }
        if (!aggregatedProducts[category].new_price) {
          aggregatedProducts[category].new_price = product.new_price;
        }
        // Aggregate colors for each product type
        if (
          product.color &&
          !aggregatedProducts[category].colors.includes(product.color)
        ) {
          aggregatedProducts[category].colors.push(product.color);
        }
      });
    }

    // Convert the aggregatedProducts object back to an array format for the template
    for (let key in aggregatedProducts) {
      this.allProductsArray.push(aggregatedProducts[key]);
    }
  }

  //  search by products
  searchAllProduct(keyword: any) {
    this.productService.searchByProduct(keyword, this.currentPage).subscribe(
      (data: any) => {
        this.totalPages = data['total_pages'];
        this.flattenProducts(data['all_products']);
        console.log('====================================');
        console.log('searchByProduct', data);
        console.log('====================================');
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllProducts(page);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }
  getPaginationRange(): number[] {
    let start: number;
    let end: number;

    if (this.totalPages <= 9) {
      // If total pages is 9 or less, show all page numbers
      start = 1;
      end = this.totalPages;
    } else {
      // If more than 9 pages, calculate start and end based on current page
      if (this.currentPage <= 6) {
        // If current page is 6 or less, start from 1
        start = 1;
        end = 9;
      } else if (this.currentPage + 4 >= this.totalPages) {
        // If current page is near the end, show the last 9 pages
        start = this.totalPages - 8;
        end = this.totalPages;
      } else {
        // Otherwise, show 4 pages before and 4 pages after the current page
        start = this.currentPage - 4;
        end = this.currentPage + 4;
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // for testing
  usersList = signal([
    {
      id: 1,
      img: '../../../assets/img/lipstic.jpg',
      productName: 'Men Grey Hoodie',
      productType: 'Hoodies',
      inventory: '96',
      color: 'Black',
      price: '49.00',
      rating: '5',
      votes: '32',
    },
    {
      id: 2,
      img: '../../../assets/img/lipstic.jpg',
      productName: 'Women Striped T-Shirt',
      productType: 'T-Shirt',
      inventory: '23',
      color: 'red',
      price: '12.00',
      rating: '4',
      votes: '12',
    },
    {
      id: 3,
      img: '../../../assets/img/lipstic.jpg',
      productName: 'Women White T-Shirt',
      productType: 'T-Shirt',
      inventory: '12',
      color: 'white',
      price: '17.00',
      rating: '3',
      votes: '23',
    },
  ]);
}
