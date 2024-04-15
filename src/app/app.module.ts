import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgxPrintModule } from 'ngx-print';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginComponent } from './components/login/login.component';
import { ButtonComponent } from './components/button/button.component';
import { PasswordComponent } from './components/password/password.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailComponent } from './components/customer/customer-detail/customer-detail.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { AddShipmentComponent } from './components/shipments/add-shipment/add-shipment.component';
import { UpdateShipmentComponent } from './components/shipments/update-shipment/update-shipment.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AddBlogComponent } from './components/blogs/add-blog/add-blog.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ShownReviewsComponent } from './components/reviews/shown-reviews/shown-reviews.component';
import { HideReviewsComponent } from './components/reviews/hide-reviews/hide-reviews.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SendOfferComponent } from './components/messages/send-offer/send-offer.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent, LoginComponent, ButtonComponent,
     PasswordComponent, TextInputComponent, SidebarComponent, DashboardComponent,
      UsersComponent, EditUserComponent, AddUserComponent, ProductsComponent, AddProductComponent, 
      UpdateProductComponent, ProductDetailsComponent, CustomerComponent, CustomerDetailComponent, OrdersComponent, OrderDetailsComponent, ShipmentsComponent, AddShipmentComponent, UpdateShipmentComponent, BlogsComponent, AddBlogComponent, ReviewsComponent, ShownReviewsComponent, HideReviewsComponent, MessagesComponent, SendOfferComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartModule,
    NgxPrintModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
