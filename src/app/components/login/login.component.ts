import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword: Boolean = true;
  token: any;
  user: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: StoreService
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
          const tokenPayload = this.authService.decodeToken();
          this.store.setRoles(tokenPayload.role);
          if(tokenPayload.role=="ADMIN"){
            this.snackBar.open('Login successful', 'ok', {duration: 5000});
            this.router.navigate(['post-category'])
          }
          else{ (tokenPayload.role=="USER")
            this.router.navigate(['product'])
        }

        }

    },
      (err: any)=>{
        this.snackBar.open('Wrong password or Email', 'ERROR', {duration: 5000});
      })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;

  }

}
