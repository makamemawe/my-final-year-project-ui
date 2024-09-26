import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { ConfirmMessageComponent } from './components/confirm-message/confirm-message.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductComponent } from './components/product/product.component';
import { ProductionMemberComponent } from './components/production-member/production-member.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportComponent } from './components/report/sales-report.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';
import { ProductResolveService } from './services/product-resolve.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  {
    path: 'product',
    component: ProductComponent,
    // canActivate: [AuthGuard],
    // data: { role: ['Admin'] },
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
    // canActivate: [AuthGuard],
    // data: { role: ['Admin'] },
  },
  {
    path: 'product-view',
    component: ProductViewComponent,
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'member',
    component: ProductionMemberComponent,
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
  },
  {
    path: 'buy-product',
    component: BuyProductComponent,
    // canActivate: [AuthGuard],
    // data: { role: ['User'] },
    resolve: {
      productDetails: BuyProductResolverService,
    },
  },
  {
    path: 'cart',
    component: CartComponent,
    // canActivate: [AuthGuard],
    // data: { role: ['User'] },
  },
{
    path: 'orders',
    component: OrdersComponent,
    // canActivate: [AuthGuard],
    // data: { role: ['User'] },
  },
{
    path: 'order-details',
    component: OrderDetailsComponent,
    // canActivate: [AuthGuard],
    // data: { role: ['User'] },
  },

  {
    path: 'confirm-message',
    component: ConfirmMessageComponent,
    // canActivate: [AuthGuard],
    // data: { role: ['User'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
