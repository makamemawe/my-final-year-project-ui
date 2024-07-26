import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { UserAuthService } from '../../services/user-auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hidePassword: Boolean = true;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: StoreService
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (res: any) => {
        console.log(res);

        this.userAuthService.setRoles(res.user.role);
        this.userAuthService.setToken(res.jwtToken);

        const role = res.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/product-details']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error: any) => {
        console.error('Login failed', error);
        // Handle the error here, e.g., display a notification to the user
       }
    );
  }

  togglePasswordVisibility(){
      this.hidePassword = !this.hidePassword;

    }

  registerUser() {
    this.router.navigate(['/register']);
  }


  // loginForm!: FormGroup;
  //  hidePassword: Boolean = true;
  // token: any;
  // user: any;
  // constructor(
  //   private fb: FormBuilder,
  //   private authService: AuthService,
  //   private snackBar: MatSnackBar,
  //   private router: Router,
  //   private store: StoreService
  // ){}

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({

  //   email: [null, [Validators.required, Validators.email]],
  //   password: [null, [Validators.required]]

  //   })

  // }

  // login(loginForm: NgForm){

  //   this.authService.login(loginForm.value).subscribe(
  //     (res: any)=> {
  //       console.log(res);
  //       if(res.token != null){
  //         console.log("token is " + res.token)
  //         const tokenSaved = res.token;
  //         this.authService.storeToken(tokenSaved);
  //         const tokenPayload = this.authService.decodeToken();
  //         this.store.setRoles(tokenPayload.role);
  //         if(tokenPayload.role=="Admin"){
  //           this.snackBar.open('Login successful', 'ok', {duration: 5000});
  //           this.router.navigate(['product-details'])
  //         }
  //         else{ (tokenPayload.role=="Admin")
  //           this.router.navigate(['/'])
  //       }

  //      }

  //   },
  //     (err: any)=>{
  //       this.snackBar.open('Wrong password or Email', 'ERROR', {duration: 5000});
  //     })
  // }

  // togglePasswordVisibility(){
  //   this.hidePassword = !this.hidePassword;

  // }

}
