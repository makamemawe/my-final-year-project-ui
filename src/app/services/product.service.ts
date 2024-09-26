import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Member } from '../models/member.model';
import { OrderDetails } from '../models/order-details.model';
import { MyOrderDetails } from '../models/order.model';
import { Product } from '../models/product.model';
import { SalesReport } from '../models/sales-report.model';

const BASIC_URL = environment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  requestHeader: HttpHeaders | { [header: string]: string | string[]; } | undefined;



  constructor(
    private http: HttpClient
  ) { }

  createProductionMember(member: FormData): Observable<Member> {
    return this.http.post<Member>(BASIC_URL + "addNewMember", member);
  }

  addNewProduct(product: FormData, categoryId: any): Observable<Product>{
    return this.http.post<Product>(BASIC_URL + "addNewProduct/category/" + categoryId, product);
  }

  addNewCategory(category: any){
    return this.http.post(BASIC_URL + "addNewCategory", category);
  }

  getAllProducts(pageNumber:any, searchKeyWord: string = ""){
    return this.http.get<Product[]>(BASIC_URL + `getAllProducts?pageNumber=${pageNumber}&searchKey=${searchKeyWord}`);
  }

  getAllCategory(){
    return this.http.get<Product[]>(BASIC_URL + "getAllCategory");
  }


  getProductById(productId: any){
    return this.http.get<Product>(BASIC_URL + `getProductDetailsById/${productId}`);
  }

  deleteProduct(productId: number){
    return this.http.delete(`${BASIC_URL}deleteProduct/${productId}`);
  }

  getProductDetails(isSingleProductCheckout: any, productId: any) {
    const baseUrl = `${BASIC_URL}getProductDetails/${isSingleProductCheckout}/${productId}`;
    return this.http.get<Product[]>(baseUrl);
  }

  placeOrder(orderDetails: OrderDetails, isSingleProductCheckout: any) {

    return this.http.post(`${BASIC_URL}placeOrder/${isSingleProductCheckout}`, orderDetails);
  }

  addToCart(productId: any){
    return this.http.get(`${BASIC_URL}addToCart/${productId}`);
  }

  getCartDetails(){
    return this.http.get(`${BASIC_URL}getCartDetails`);
  }

  createTransaction(amount: any) {
    return this.http.get(`${BASIC_URL}createTransaction/${amount}`);
  }

  updateDelivery(orderId: any) {
    return this.http.get(`${BASIC_URL}updateDelivery/${orderId}`)
}
  markAsDelivered(orderId: any) {
    return this.http.get(`${BASIC_URL}markOrderAsDelivered/${orderId}`)
}

deleteOrder(orderId: string): Observable<void> {
  return this.http.delete<void>(`${BASIC_URL}deleteOrder/${orderId}`);
}

   getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]> {
    return this.http.get<MyOrderDetails[]>(`${BASIC_URL}getAllOrderDetails/${status}`);
  }

   getMyOrders(): Observable<MyOrderDetails[]> {
    return this.http.get<MyOrderDetails[]>(`${BASIC_URL}getOrderDetails`);
  }

   deleteCartItem(cartId: any) {
    return this.http.delete(`${BASIC_URL}deleteCartItem/${cartId}`);
  }

  getSalesReport(): Observable<SalesReport[]> {
    return this.http.get<SalesReport[]>(`${BASIC_URL}sales-report`);
  }

}
