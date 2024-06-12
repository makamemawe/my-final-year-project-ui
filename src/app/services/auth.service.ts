import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  postCategory(categoryDto: any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + "api/admin/category", categoryDto, {
      headers: this.createAuthorizationHeader()})
  }

  getAllCategory(): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/categories", {
      headers: this.createAuthorizationHeader()})
  }

  postProduct(categoryId: number, productDto: any): Observable<any>{
    const url = `${BASIC_URL}api/admin/product/${categoryId}`;
    return this.http.post<any>(url, productDto, {
      headers: this.createAuthorizationHeader()})
    }

     getAllProduct(): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/products", {
      headers: this.createAuthorizationHeader()})
  }

  getAllProductByName(name: any): Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader()})
  }

  deleteProduct(productId: any): Observable<any>{
    return this.http.delete(BASIC_URL + `api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader()})
  }


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

getRoleFromToken(){
if(this.payload)
  return this.payload.role;
}



}
