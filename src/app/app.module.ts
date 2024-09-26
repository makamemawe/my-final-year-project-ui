import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterLink, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { ConfirmMessageComponent } from './components/confirm-message/confirm-message.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportComponent } from './components/report/sales-report.component';
import { DragDirective } from './drag.directive';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { UserService } from './services/user.service';
import { ProductionMemberComponent } from './components/production-member/production-member.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    DragDirective,
    ProductDetailsComponent,
    ImageDialogComponent,
    ProductViewComponent,
    BuyProductComponent,
    ConfirmMessageComponent,
    RegisterComponent,
    CartComponent,
    OrdersComponent,
    OrderDetailsComponent,
    CategoryComponent,
    ReportComponent,
    DeliveryComponent,
    ProductionMemberComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
   MatFormFieldModule,
   MatCardModule,
   MatIconModule,
   MatToolbarModule,
   MatOptionModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatGridListModule,
    MatTableModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatPaginator

  ],
  providers: [
    provideAnimationsAsync(),

      {
        provide: HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
      },
      UserService,
      AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
