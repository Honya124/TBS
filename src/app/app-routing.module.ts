import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ProductsComponent } from './components/products/products.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailComponent } from './components/customer/customer-detail/customer-detail.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { AddShipmentComponent } from './components/shipments/add-shipment/add-shipment.component';
import { UpdateShipmentComponent } from './components/shipments/update-shipment/update-shipment.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AddBlogComponent } from './components/blogs/add-blog/add-blog.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SendOfferComponent } from './components/messages/send-offer/send-offer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UsersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product', component: UpdateProductComponent },
  { path: 'product-detail', component: ProductDetailsComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'customer-details', component: CustomerDetailComponent },
  { path: 'orders', component: CustomerDetailComponent },
  {path:'shipments',component:ShipmentsComponent},  
  {path:'new-shipment',component:AddShipmentComponent},  
  {path:'update-shipment',component:UpdateShipmentComponent},  
  {path:'blogs',component:BlogsComponent},  
  {path:'new-blog',component:AddBlogComponent}, 
  {path:'reviews',component:ReviewsComponent},  
  {path:'messages',component:MessagesComponent},  
  {path:'send-message',component:SendOfferComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
