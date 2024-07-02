import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';
import { ProductResolveService } from './services/product-resolve.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'register', title: 'Register', component: RegisterComponent },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN'] },
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: 'product-details',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
    data: { role: ['ADMIN'] },
  },
  {
    path: 'product-view',
    component: ProductViewComponent,
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: 'buy-product',
    component: BuyProductComponent,
    canActivate: [authGuard],
    data: { role: ['USER'] },
    resolve: {
      productDetails: BuyProductResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
