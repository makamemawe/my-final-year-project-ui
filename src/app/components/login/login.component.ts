import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword: Boolean = true;
  token: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({

    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]

    })

  }

  onSubmit(): void{
    this.authService.login(this.loginForm.value).subscribe(
      (res: any)=> {
        console.log(res);
        if(res.token != null){
          console.log("token is " + res.token)
          const tokenSaved = res.token;
          this.authService.storeToken(tokenSaved);
        }
        this.snackBar.open('Login successful', 'ok', {duration: 5000});
        this.router.navigate(['product']);
    },
      (err: any)=>{
        this.snackBar.open('Wrong password or Email', 'ERROR', {duration: 5000});
      })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;

  }

}
