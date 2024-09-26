import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../../models/file-handle.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  listOfCategory: any = [];
  category: any = {};
  isNewProduct = true;
  product: Product = {
    productId: null,
    categoryId: null,
    productName: "",
    productDescription: "",
    productActualPrice: 0,
    productDiscountedPrice: 0,
    productImages: [],
  }

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
  }

  ngOnInit(): void {

  this.product = this.activatedRoute.snapshot.data['product'];

  if(this.product && this.product.productId) {
    this.isNewProduct = false;
  }

  this.getAllCategories();

  }

  addNewProduct(productForm: NgForm){
    const formatDataProduct = this.prepareFormData(this.product);
    const categoryId = this.product.categoryId;
    this.productService.addNewProduct(formatDataProduct, categoryId).subscribe(
      (res: Product)=>{
      console.log(res);
      productForm.reset();

      if (res.productId != null && this.isNewProduct != false) {
        this.snackBar.open('product posted succefully', 'clese', {
          duration: 5000,
        });
        this.router.navigate(['/product-details']);
      } else if(res.productId != null && this.isNewProduct != true){
        this.snackBar.open('product updated succefully', 'clese', {
          duration: 5000,
        });
        this.router.navigate(['/product-details']);
      }else{
        this.snackBar.open('product posted not successful', 'ERROR', {
          duration: 5000,
        });
      }

    })
  }

  prepareFormData(product: any): FormData {
    const formatData = new FormData();
      formatData.append(
        "product",
        new Blob([JSON.stringify(product)], { type: "application/json" })
      );

      for (let i = 0; i < this.product.productImages.length; i++) {
            formatData.append(
              "imageFile",
              this.product.productImages[i].file,
              this.product.productImages[i].file.name
            );
          }

      return formatData;
  }

  getAllCategories() {
    this.productService.getAllCategory().subscribe((res) => {
      this.listOfCategory = res;
    });
  }

  onFileSelected(event: any){
    if(event.target.files){
     const file = event.target.files[0];

     const fileHandle: FileHandle = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      )
     }
     this.product.productImages.push(fileHandle);
    }
  }

  removeImage(image: FileHandle): void {
    this.product.productImages = this.product.productImages.filter(img => img !== image);
  }

  onFileDropped(fileHandle: FileHandle): void {
    this.product.productImages.push(fileHandle);
  }
}
