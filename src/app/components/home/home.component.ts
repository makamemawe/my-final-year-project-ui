import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { ImageProcessingService } from '../../services/image-processing.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  productDetails: any[] = [];

  constructor(
    private authService: AuthService,
    private imageProcessing: ImageProcessingService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.authService.getAllProducts()
    .pipe(
      map((x: any, i) => x.map((product: any) => this.imageProcessing.createImages(product)))
    )
    .subscribe((res: Product[])=>{
    console.log(res);
    this.productDetails = res;
    }, (err: HttpErrorResponse)=>{
      console.log(err);

    })
  }

  showProductDetails(id:any){
    console.log(id);

    this.router.navigate(['/product-view', {id:id}])
  }

}
