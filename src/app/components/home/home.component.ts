import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../models/product.model';
import { ImageProcessingService } from '../../services/image-processing.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  pageNumber: number = 0;
  productDetails: any[] = [];
  showLoadButton = false;

  constructor(
    private productService: ProductService,
    private imageProcessing: ImageProcessingService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: any){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);

  }

  getAllProducts(searchKey: string = ""){
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: any, i) => x.map((product: any) => this.imageProcessing.createImages(product)))
    )
    .subscribe((res: Product[])=>{
    console.log(res);
    if(res.length == 12){
      this.showLoadButton = true;
    } else{
      this.showLoadButton = false;
    }
    res.forEach(p => this.productDetails.push(p));
    }, (err: HttpErrorResponse)=>{
      console.log(err);

    })
  }

  showProductDetails(productId:any){
    console.log(productId);

    this.router.navigate(['/product-view', {productId:productId}])
  }

  loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

}
