import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(
    private productService: ProductService,
    private imageProcessing: ImageProcessingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");

    return this.productService.getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map((x: Product[], i) =>
          x.map((product: Product) => this.imageProcessing.createImages(product))
        )
      );
  }
}


