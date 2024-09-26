import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { FileHandle } from '../models/file-handle.model';
import { Product } from '../models/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';




@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  product: { productImages: FileHandle[] } = { productImages: [] };

  constructor(
    private productService: ProductService,
    private imageProcessing: ImageProcessingService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Product> {

      const id = route.paramMap.get("productId");

      if(id){
        //then we have to fetch details from backend
          return this.productService.getProductById(id)
         .pipe(
          map(p => this.imageProcessing.createImages(p))
         );
      } else{
        //return empty product observable.
        return of(this.getAllProducts());
      }
  }

  getAllProducts(){

    return {
      productId:null,
      categoryId:null,
      productName: "",
      productDescription: "",
      productActualPrice: 0,
      productDiscountedPrice: 0,
      productImages: []
    };

}
}
