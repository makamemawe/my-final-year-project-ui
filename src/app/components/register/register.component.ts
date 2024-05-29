import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  registerForm!: FormGroup;
  hidePassword: Boolean = true;
  constructor(
     private fb: FormBuilder,
     private authService: AuthService,
     private snackBar: MatSnackBar,
     private router: Router
    ){}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, [Validators.required]]
    },)
  }

  togglePasswordVisibility(){
     this.hidePassword = !this.hidePassword;
  }

   onSubmit(){
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
         this.snackBar.open('password do not match!', 'close', {duration: 5000, panelClass: 'error-snackBar'});
         return;
      }
    this.authService.register(this.registerForm.value).subscribe((res: any)=>{
      this.snackBar.open('register successful!', 'close', {duration: 5000});
      this.router.navigate(['login']);
    })
  }

}
