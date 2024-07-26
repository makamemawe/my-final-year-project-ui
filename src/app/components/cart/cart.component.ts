import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];

  cartDetails: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: any) {
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp);
        this.getCartDetails();
      }, (err) => {
        console.log(err);
      }
    );
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (res:any) => {
        console.log(res);
        this.cartDetails = res;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  checkout() {

    this.router.navigate(['/buy-product', {
      isSingleProductCheckout: false, id: 0
    }]);

    this.productService.getProductDetails(false, 0).subscribe(
      (res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
