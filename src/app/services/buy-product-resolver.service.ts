import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(
    private authService: AuthService,
    private imageProcessing: ImageProcessingService
  ) { }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
  //   const id = route.queryParamMap.get("productId");
  //   const isSingleProductCheckout = route.queryParamMap.get("isSingleProductCheckout");

  //   return this.authService.getProductDetails(isSingleProductCheckout, id)
  //     .pipe(
  //       map(products =>
  //         products.map((product: Product) => this.imageProcessing.createImages(product))
  //       )
  //     );
  // }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const id = route.paramMap.get("productId");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");

    return this.authService.getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map((products: Product[], i) =>
          products.map(product => this.imageProcessing.createImages(product))
        )
      );
  }
}


