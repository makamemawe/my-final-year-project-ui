import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { FileHandle } from '../models/file-handle.model';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import { ImageProcessingService } from './image-processing.service';



@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  product: { productImages: FileHandle[] } = { productImages: [] };

  constructor(
    private authService: AuthService,
    private imageProcessing: ImageProcessingService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Product> {

      const productId = route.paramMap.get("id");

      if(productId){
        //then we have to fetch details from backend
          return this.authService.getProductById(productId)
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
      id:null,
      name: "",
      description: "",
      actualPrice: 0,
      discountedPrice: 0,
      productImages: []
    };

}
}
