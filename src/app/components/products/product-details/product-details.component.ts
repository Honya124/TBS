import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../Service/product.service';
import { PublicService } from '../../../Service/public.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  showIngredient = false;
  showHowToUse = false;
  whatMakesImportant = false;
  selectedImage: string = '';
  product: any = {};
  images: string[] = [];
  shades: any[] = [];

  constructor(
    public productService: ProductService,
    public publicService: PublicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('prodcut_id ', this.productService.productDetail_id);
    this.productService
      .getProductDetail(this.productService.productDetail_id)
      .subscribe(
        (data: any) => {
          console.log('Product details', data);
          this.product = data.product;
          this.images = data.product.image_url.filter(
            (url: string) => url.trim() !== ''
          );
          this.selectedImage = this.images[0];
          this.shades = data.shades;
        },
        (error) => {
          console.error('Error fetching data: ', error);
        }
      );
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }
  new(id: any) {
    // this.publicService.productDetail_id = id;
    this.productService.getProductDetail(id).subscribe(
      (data: any) => {
        this.product = data.product;
        console.log(this.product);
        this.images = data.product.image_url.filter(
          (url: string) => url.trim() !== ''
        );
        this.selectedImage = this.images[0];
        this.shades = data.shades;
      },
      (error) => {
        console.error('Error fetching data: ', error);
      }
    );
  }

  goToUpdateProduct(data: any) {
    this.productService.productObject = data;
  }

  //testing
  showAllOrders: boolean = true;
  showCompleted: boolean = false;
  showCanceled: boolean = false;
  showOrderItem: boolean = false;

  showOrderItemFun() {
    this.showOrderItem = !this.showOrderItem;
  }
  showAllOrdersFunc() {
    this.showAllOrders = !this.showAllOrders;
    this.showCanceled = false;
    this.showCompleted = false;
  }
  showCompletedfunc() {
    this.showCompleted = !this.showCompleted;
    this.showAllOrders = false;
    this.showCanceled = false;
  }
  showCanceledFunc() {
    this.showCanceled = !this.showCanceled;
    this.showAllOrders = false;
    this.showCompleted = false;
  }

  userDetail = {
    id: 1,
    username: 'Olivia Rhye',
    email: 'olivia@untitledui.com',
    phoneNo: '(201) 555-0124',
    date: '3 March, 2022',
    img: '../../../assets/img/profileImg.png',
    shippingAddres: '3517 W. Gray St. Utica, Pennsylvania 57867',
    totalOrder: 150,
    completedOrder: 140,
    canceledOrder: 10,
  };

  UserAllOrderList = signal([
    {
      id: 1,
      orderId: '#6548',
      created: '2 min ago',
      total: '654',
      payment: 'CC',
      status: 'Completed',
      subTotal: '2,847.96',
      shipping: '5.50',
      discount: '150.32',
      totalOrder: '2647.32',
      orderIdList: [
        {
          oId: 1,
          orderName: 'Lipstick',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
        {
          oId: 2,
          orderName: 'Powder',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
      ],
    },
    {
      id: 2,
      orderId: '#6548',
      created: '2 min ago',
      total: '654',
      payment: 'CC',
      status: 'Pending',
      subTotal: '2,847.96',
      shipping: '5.50',
      discount: '150.32',
      totalOrder: '2647.32',
      orderIdList: [
        {
          oId: 1,
          orderName: 'Lipstick',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
        {
          oId: 2,
          orderName: 'Powder',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
      ],
    },
  ]);

  UserCompletedOrderList = signal([
    {
      id: 1,
      orderId: '#6549',
      created: '2 min ago',
      total: '654',
      payment: 'CC',
      status: 'Completed',
      subTotal: '2,847.96',
      shipping: '5.50',
      discount: '150.32',
      totalOrder: '2647.32',
      orderIdList: [
        {
          oId: 1,
          orderName: 'Lipstick',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
        {
          oId: 2,
          orderName: 'Powder',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
      ],
    },
    {
      id: 2,
      orderId: '#6549',
      created: '2 min ago',
      total: '654',
      payment: 'CC',
      status: 'Completed',
      subTotal: '2,847.96',
      shipping: '5.50',
      discount: '150.32',
      totalOrder: '2647.32',
      orderIdList: [
        {
          oId: 1,
          orderName: 'Lipstick',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
        {
          oId: 2,
          orderName: 'Powder',
          orderPrice: '999.29',
          orderQty: '1',
          orderDisc: '5',
          total: '949.32',
        },
      ],
    },
  ]);
}
