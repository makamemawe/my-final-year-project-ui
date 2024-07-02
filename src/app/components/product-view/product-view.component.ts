import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{

  product!: Product;
  selectedProductIndex = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);

  }

  changIndex(index: any){
    this.selectedProductIndex = index;
  }
  // buyProduct(id: any) {
  //   this.router.navigate(['/buy-product'], {
  //     queryParams: {
  //       isSingleProductCheckout: true,
  //       productId: id
  //     }
  //   });
  // }

  buyProduct(id: any){
    this.router.navigate(['/buy-product',
      {isSingleProductCheckout: true, productId: id}
    ])
  }

}
