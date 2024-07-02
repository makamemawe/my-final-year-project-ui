import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';

const BASIC_URL = environment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private payload: any;


  constructor(
    private http: HttpClient
  ) {
    this.payload = this.decodeToken();
  }
  register(request: any): Observable<any>{
    return this.http.post(BASIC_URL + "register", request);
  }

  login(request: any): Observable<any>{
    return this.http.post(BASIC_URL + "authenticate", request);
  }

  addNewProduct(product: FormData){
    return this.http.post<Product>(BASIC_URL + "addNewProduct", product);
  }

  getAllProducts(){
    return this.http.get<Product[]>(BASIC_URL + `getAllProducts`);
  }

  getProductById(id: any){
    return this.http.get<Product>(BASIC_URL + `getProductById/${id}`);
  }

  deleteProduct(id: number){
    return this.http.delete(BASIC_URL + "deleteProduct/" + id);
  }

  getProductDetails(isSingleProductCheckout: any, id: any): Observable<Product[]> {
    const params = new HttpParams()
      .set('isSingleProductCheckout', isSingleProductCheckout.toString())
      .set('productId', id);

    return this.http.get<Product[]>(`${BASIC_URL}getProductDetails/${isSingleProductCheckout}/${id}`, { params });
  }

  placeOrder(isSingleProductCheckout: boolean, orderInput: any): Observable<any> {
    const body = {
      isSingleProductCheckout,
      ...orderInput
    };
    return this.http.post(`${BASIC_URL}placeOrders`, body, { headers: this.createAuthorizationHeader() });
  }

  // placeOrder(isSingleProductCheckout: any, orderInput: any){
  //   const body = isSingleProductCheckout + orderInput;
  //   return this.http.post(`${BASIC_URL}placeOrders`, body, {headers: this.createAuthorizationHeader()});
  // }
  // placeOrder(orderDetails: OrderDetails): Observable<any> {
  //   const token = localStorage.getItem('jwtToken');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post(`${BASIC_URL}placeOrders`, orderDetails, { headers });
  // }


  createAuthorizationHeader(): HttpHeaders{
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
      `Authorization`,
      `Bearer ` + this.getToken()
    )
  }

storeToken(tokenValue: any){
  localStorage.setItem('token', tokenValue);
}

isLogin(): boolean{
  return !! localStorage.getItem('token');
}

clearToken(){
  localStorage.removeItem('token');

}

getToken(){
 return localStorage.getItem('token');
}

decodeToken(){
  const jwtHelper = new JwtHelperService();
  const token = this.getToken()!;
  console.log(jwtHelper.decodeToken(token))
  return jwtHelper.decodeToken(token);
}

getUserId(){
  if(this.payload)
    return this.payload.id;
}

getRoleFromToken(){
if(this.payload)
  return this.payload.role;
}

clear(){
localStorage.clear();
}

isLoggedIn(){
  return this.getRoleFromToken() && this.getToken();
}
}
