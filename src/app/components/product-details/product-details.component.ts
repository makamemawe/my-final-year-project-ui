import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../models/product.model';
import { ImageProcessingService } from '../../services/image-processing.service';
import { ProductService } from '../../services/product.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  displayedColumns: string[] = ['ProductId', 'Product Name', 'description', 'Product Actual Price', 'Product Discounted Price', 'Actions'];
  productDetails: any[] = [];
  product: any[] = [];
  pageNumber: number = 0;
  showTable = false;
  loadMoreProductButton = false;



  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private imageProcessing: ImageProcessingService
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
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: any, i) => x.map((product: any) => this.imageProcessing.createImages(product)))
    )
    .subscribe((res: Product[])=>{
    res.forEach(p => this.productDetails.push(p));
    console.log('product details => ', this.productDetails);

    this.showTable = true;
      if(res.length == 8){
        this.loadMoreProductButton = true;
      }else{
        this.loadMoreProductButton = false;
      }
    }, (err: HttpErrorResponse)=>{
      console.log(err);

    })
  }

  loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId: any){
    this.productService.deleteProduct(productId).subscribe((res: any)=>{
      this.getAllProducts();
      this.snackBar.open("product successfully deleted", "close", {duration: 5000});

    }, (err: any)=>{
      this.snackBar.open("product not deleted", "ERROR", {duration: 5000});
    })

  }

  showImages(product: any) {
    console.log(product);
    this.dialog.open(ImageDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

  editProductDetails(productId: any) {
  this.router.navigate(['/product', {productId: productId}]);
   }

}
