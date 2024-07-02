import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../../models/file-handle.model';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  isNewProduct = true;
  product: Product = {
     id:null,
    name: "",
    description: "",
    discountedPrice: 0,
    actualPrice: 0,
    productImages: [],


  }
  productForm!: FormGroup

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
  }

  ngOnInit(): void {

  this.product = this.activatedRoute.snapshot.data['product'];

  if(this.product && this.product.id) {
    this.isNewProduct = false;
  }

  }

  addNewProduct(productForm: NgForm){
    const formatDataProduct = this.prepareFormData(this.product);
    this.authService.addNewProduct(formatDataProduct).subscribe((res: Product)=>{
      console.log(res);

      if (res.id != null && this.isNewProduct != false) {
        this.snackBar.open('product posted succefully', 'clese', {
          duration: 5000,
        });
        this.router.navigate(['/product-details']);
      } else if(res.id != null && this.isNewProduct != true){
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
