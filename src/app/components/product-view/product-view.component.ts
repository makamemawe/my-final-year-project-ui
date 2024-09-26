import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{

  product!: Product;
  selectedProductIndex = 0;
p: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);

  }

  changeIndex(index: any){
    this.selectedProductIndex = index;
  }

  addToCart(productId: any) {
    console.log(productId);

    this.productService.addToCart(productId).subscribe(
      (res: any) => {
        console.log(res);
      }, (error: any)=> {
        console.log(error);
      }
    );
  }

  buyProduct(productId: any){
    this.router.navigate(['/buy-product',
      {isSingleProductCheckout: true, id: productId}
    ])
  }

  goBack(){
    this.router.navigate(['/']);
  }

}
