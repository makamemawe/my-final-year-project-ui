import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  listOfCategories: any;
  selectedFile!: File | any;
  imagePreview: string | ArrayBuffer | null = null;
  // selectedFile: any = [];
  // imagePreview!: string | ArrayBuffer | null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // onFileSelected(event: any){
  //   this.selectedFile = event.target.files[0];
  //   this.previewImage();
  // }
  // previewImage(){
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //   }
  //   reader.readAsDataURL(this.selectedFile);
  // }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.authService.getAllCategory().subscribe((res) => {
      this.listOfCategories = res;
    });
  }
  postProduct() {
    const productDto: FormData = new FormData();
    productDto.append('image', this.selectedFile);
    productDto.append('name', this.productForm.get(['name'])?.value);
    productDto.append(
      'description',
      this.productForm.get(['description'])?.value
    );
    productDto.append('price', this.productForm.get(['price'])?.value);

    const categoryId = this.productForm.get('categoryId')?.value;
    this.authService.postProduct(categoryId, productDto).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackBar.open('product posted succefully', 'clese', {
          duration: 5000,
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open('product posted not successful', 'ERROR', {
          duration: 5000,
        });
      }
    });
  }

  // postProduct(){
  // if(this.productForm.valid){
  //     const formData: FormData = new FormData();
  //     formData.append('image', this.selectedFile);
  //     formData.append('categoryId', this.productForm.get('categoryId')?.value);
  //     formData.append('name', this.productForm.get('name')?.value);
  //     formData.append('description', this.productForm.get('description')?.value);
  //     formData.append('price', this.productForm.get('price')?.value);

  //     //this.authService.postProduct(formData).subscribe((res)=>{
  //       this.authService.postProduct(this.productForm.get(['categoryId'])?.value,formData).subscribe((res)=>{
  //       if(res.id != null){
  //         this.snackBar.open("product posted succefully", "clese", {duration: 5000});
  //         this.router.navigate(['/dashboard']);
  //       }else{
  //         this.snackBar.open('product posted not successful', 'ERROR', {duration: 5000});
  //       }
  //     })
  //   }
  //   else {
  //     for(const i in this.productForm.controls){
  //       this.productForm.controls[i].markAsDirty();
  //       this.productForm.controls[i].updateValueAndValidity();
  //     }

  //   }
  // }
}
