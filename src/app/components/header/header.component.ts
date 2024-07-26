import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }
  // role!:string
  // constructor(
  //   private authService: AuthService,
  //   private router: Router,
  //   private store:StoreService,

  // ) {
  //   this.role = 'Admin';

  // }

  // ngOnInit(): void {

  //   this.store.getRoles().subscribe({
  //     next: ((res:any)=>{
  //       console.log('my response are',res)
  //       this.role=res||this.authService.getRoleFromToken()
  //     })
  //   })
  // }

  // clearToken(){
  //   this.authService.clearToken();
  //   this.router.navigate(['/']);
  // }

  // public isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }

  // public logout() {
  //   this.authService.clear();
  //   this.router.navigate(['/']);
  // }


}
