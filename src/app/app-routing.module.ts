import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [


  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'register', title: 'Signup', component: RegisterComponent},
  { path: 'login', title: 'Login', component: LoginComponent},
  { path: 'product', title: 'Product page', component: ProductComponent,canActivate:[authGuard]},
  { path: 'dashboard', title: 'Dashboard page', component: DashboardComponent},
  { path: 'post-category', title: 'Category Post', component: PostCategoryComponent,canActivate:[authGuard]},
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
