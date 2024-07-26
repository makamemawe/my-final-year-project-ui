import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderDetails } from '../models/order-details.model';
import { MyOrderDetails } from '../models/order.model';
import { Product } from '../models/product.model';

const BASIC_URL = environment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  requestHeader: HttpHeaders | { [header: string]: string | string[]; } | undefined;



  constructor(
    private http: HttpClient
  ) { }

//  getProductDetailsById(productId: any) {
//     return this.http.get<Product>(`${BASIC_URL}${productId}`);
//   }
  addNewProduct(product: FormData){
    return this.http.post<Product>(BASIC_URL + "addNewProduct", product);
  }

  getAllProducts(pageNumber:any, searchKey: string = ""){
    return this.http.get<Product[]>(BASIC_URL + `getAllProducts?pageNumber=${pageNumber}&searchKey=${searchKey}`);
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

  markAsDelivered(orderId: any) {
      return this.http.get(`${BASIC_URL}markOrderAsDelivered/${orderId}`)
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



}
