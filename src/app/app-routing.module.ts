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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule],
})
export class AppRoutingModule {}
