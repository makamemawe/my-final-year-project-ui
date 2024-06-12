import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

const BASIC_URL = environment["BASIC_URL"]

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.css'
})
export class PostCategoryComponent {

  isSpining!: boolean;
  categoryForm!: FormGroup

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
  })
  }
  postCategory(){
    this.isSpining = true;
    this.auth.postCategory(this.categoryForm.value).subscribe((res)=>{
      this.isSpining = false;
      console.log(res);
      if(res.id != null){
        this.snackBar.open('category posted successful', 'ok', {duration: 5000});
        this.router.navigate(['/product']);
      } else{
        this.snackBar.open('category posted not successful', 'ERROR', {duration: 5000});
      }

    })
  }


}
