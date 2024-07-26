// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { OrderDetails } from '../models/order-details.model';
// import { Product } from '../models/product.model';

// const BASIC_URL = environment["BASIC_URL"]

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//  private payload: any;
//   requestHeader: HttpHeaders | { [header: string]: string | string[]; } | undefined;


//   constructor(
//     private http: HttpClient
//   ) {
//     this.payload = this.decodeToken();
//   }
//   //


//   // login(request: any): Observable<any>{
//   //   return this.http.post(BASIC_URL + "authenticate", request);
//   // }
//   // login(loginData: any) {
//   //   return this.http.post(BASIC_URL + 'authenticate', loginData, {
//   //     headers: this.requestHeader,
//   //   });
//   // }

//   addNewProduct(product: FormData){
//     return this.http.post<Product>(BASIC_URL + "addNewProduct", product);
//   }

//   getAllProducts(pageNumber:any, searchKey: string = ""){
//     return this.http.get<Product[]>(BASIC_URL + `getAllProducts?pageNumber=${pageNumber}&searchKey=${searchKey}`);
//   }

//   getProductById(id: any){
//     return this.http.get<Product>(BASIC_URL + `getProductById/${id}`);
//   }

//   deleteProduct(id: number){
//     return this.http.delete(BASIC_URL + "deleteProduct/" + id);
//   }

//   getProductDetails(isSingleProductCheckout: any, id: any): Observable<Product[]> {
//     const baseUrl = `${BASIC_URL}getProductDetails/${isSingleProductCheckout}/${id}`;
//     return this.http.get<Product[]>(baseUrl);
//   }

//   placeOrder(orderDetails: OrderDetails): Observable<any> {

//     return this.http.post(BASIC_URL + 'placeOrder', orderDetails);
//   }


//   createAuthorizationHeader(): HttpHeaders{
//     let authHeader: HttpHeaders = new HttpHeaders();
//     return authHeader.set(
//       `Authorization`,
//       `Bearer ` + this.getToken()
//     )
//   }

// storeToken(tokenValue: any){
//   localStorage.setItem('token', tokenValue);
// }

// isLogin(): boolean{
//   return !! localStorage.getItem('token');
// }

// clearToken(){
//   localStorage.removeItem('token');

// }

// getToken(){
//  return localStorage.getItem('token');
// }

// decodeToken(){
//   const jwtHelper = new JwtHelperService();
//   const token = this.getToken()!;
//   console.log(jwtHelper.decodeToken(token))
//   return jwtHelper.decodeToken(token);
// }

// getUserId(){
//   if(this.payload)
//     return this.payload.id;
// }

// getRoleFromToken(){
// if(this.payload)
//   return this.payload.role;
// }

// clear(){
// localStorage.clear();
// }

// isLoggedIn(){
//   return this.getRoleFromToken() && this.getToken();
// }
// }
