import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDetails } from '../../models/order-details.model';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent {

  isSingleProductCheckout: any;
  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    productQuantityList: []
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

this.productDetails.forEach(
  x => this.orderDetails.productQuantityList.push(
    {id: x.id, quantity: 1}
  )
);

  console.log(this.productDetails);
  console.log(this.orderDetails);


  }

  placeOrder(orderForm: NgForm) {
    if (orderForm.valid) {
      const orderDetails = orderForm.value;
    this.authService.placeOrder(this.isSingleProductCheckout, orderDetails).subscribe(
      (res) => {
        console.log(res);
        orderForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

  // placeOrder(orderForm: NgForm){
  //   return this.authService.placeOrder(this.orderDetails).subscribe(
  //     (res) => {
  //       console.log(res);
  //       orderForm.reset();
  //     },
  //     (err) => {
  //       console.log(err);

  //     }
  //   );
  // }

}
