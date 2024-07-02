import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { ImageProcessingService } from '../../services/image-processing.service';
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

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private imageProcessing: ImageProcessingService
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

  deleteProduct(id: any){
    this.authService.deleteProduct(id).subscribe((res: any)=>{
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

  editProductDetails(id: any) {
    console.log(id);

   this.router.navigate(['/product', {id: id}]);
   }

}
