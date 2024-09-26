import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  category: Category = {
    categoryId:null,
    categoryName: "",
  }

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(){
    this.getAllCategories();
  }

  addNewCategory(categoryForm: NgForm){
    this.productService.addNewCategory(categoryForm.value).subscribe((res)=>{
    console.log(res);
    this.snackBar.open('Category successful posted', 'ok', {duration: 5000});
    this.router.navigate(['/product']);

})

  }

  getAllCategories() {
    this.productService.getAllCategory().subscribe((res) => {
      console.log(res);

      // this.listOfCategory = res;
    });
  }

}
