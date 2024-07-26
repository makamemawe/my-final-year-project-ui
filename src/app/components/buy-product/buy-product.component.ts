import { Component, Injector } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../../models/order-details.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

declare var Razorpay: any;

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
    orderProductQuantityList: []
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector
  ){}

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

this.productDetails.forEach(
  x => this.orderDetails.orderProductQuantityList.push(
    {productId: x.productId, quantity: 1}
  )
);

  console.log(this.productDetails);
  console.log(this.orderDetails);


  }

  // public placeOrder(orderForm: NgForm) {
  //   this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
  //     (resp) => {
  //       console.log(resp);
  //       orderForm.reset();

  //       const ngZone = this.injector.get(NgZone);
  //       ngZone.run(
  //         () => {
  //           this.router.navigate(["/confirm-message"]);
  //         }
  //       );
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }


  placeOrder(orderForm: NgForm) {
    if (orderForm.valid) {
      this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
        (res) => {
          console.log('Order placed successfully:', res);
          orderForm.resetForm();
          this.router.navigate(['confirm-message']);
        },
        (err) => {
          console.error('Error placing order:', err);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  getQuantityForProduct(productId: any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId

    );

    return filteredProduct[0].quantity;

  }

  getCalculatedTotal(productId: any, orderDiscountedPrice: any){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId

    );

    return filteredProduct[0].quantity * orderDiscountedPrice;

  }

  onQuantityChange(quantity: any, productId:any){
  this.orderDetails.orderProductQuantityList.filter(
    (orderProduct) => orderProduct.productId === productId

  )[0].quantity = quantity;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
       const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;

       grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );
    return grandTotal;
  }


  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (res) => {
        console.log(res);
        this.openTransactioModal(res, orderForm);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  openTransactioModal(response: any, orderForm: NgForm) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Learn programming yourself',
      description: 'Payment of online shopping',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response, orderForm);
        } else {
          alert("Payment failed..")
        }

      },
      prefill : {
        name:'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '90909090'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any, orderForm:NgForm) {
    // this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);
  }
}
