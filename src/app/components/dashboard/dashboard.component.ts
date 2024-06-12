import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getAllProduct();

    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]],
    });
  }

  getAllProduct() {
    this.products = [];
    this.authService.getAllProduct().subscribe((res) => {
      res.forEach((element: { processedImg: string; byteImage: string }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
      console.log(this.products);
    });
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')?.value;
    this.authService.getAllProductByName(title).subscribe((res) => {
      res.forEach((element: { processedImg: string; byteImage: string }) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
      console.log(this.products);
    });
  }

  deleteProduct(productId: any) {
    this.authService.deleteProduct(productId).subscribe((res) => {
      if (res.body == null) {
        this.snackBar.open('product deleted succefully', 'clese', {
          duration: 5000,
        });
        this.getAllProduct();
      } else {
        this.snackBar.open('product not deleted', 'ERROR', {
          duration: 5000,
        });
      }
    });
  }
}
