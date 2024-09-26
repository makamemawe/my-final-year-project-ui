import { Component, Injector, Renderer2 } from '@angular/core';
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
    orderDate: new Date(),
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: []
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector,
    private renderer: Renderer2
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


this.loadRazorpayScript();

  }

  loadRazorpayScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay script loaded successfully.');
    };
    script.onerror = () => {
      console.error('Failed to load the Razorpay script.');
    };
    this.renderer.appendChild(document.body, script);
  }


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
        this.openTransactionModal(res, orderForm);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  openTransactionModal(res: any, orderForm: NgForm) {
    if (typeof Razorpay === 'undefined') {
      console.error('Razorpay library is not loaded.');
      return;
    }

    var options = {
      order_id: res.orderId,
      key: res.key,
      amount: res.amount,
      currency: res.currency,
      name: 'Final Year Project',
      description: 'Payment of online shopping',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        if (response != null && response.razorpay_payment_id != null) {
          this.processResponse(response, orderForm);
        } else {
          alert("Payment failed..")
        }
      },
      prefill: {
        name: 'Mawe',
        email: 'mawe@gmail.com',
        contact: '9000090000'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };

    try {
      var razorPayObject = new Razorpay(options);
      razorPayObject.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
    }
  }

  processResponse(response: any, orderForm: NgForm) {
    this.orderDetails.transactionId = response.razorpay_payment_id;
    this.placeOrder(orderForm);
  }

// goBack(productId: any){
//   this.router.navigate(['/product-view', {productId:productId}])
// }

}
