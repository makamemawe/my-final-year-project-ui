import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  role!:string
  constructor(
    private authService: AuthService,
    private router: Router,
    private store:StoreService,

    // public userService: UserService
  ) {
    this.role = 'ADMIN';

  }

  ngOnInit(): void {
    this.store.getRoles().subscribe({
      next: ((res:any)=>{
        console.log('my response are',res)
        this.role=res||this.authService.getRoleFromToken()
      })
    })
  }

  clearToken(){
    this.authService.clearToken();
    this.router.navigate(['login']);
  }


  // public isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }

  // public logout() {
  //   this.authService.clear();
  //   this.router.navigate(['/']);
  // }

  // public isAdmin() {
  //   return this.authService.isAdmin();
  // }

  // public isUser() {
  //   return this.authService.isUser();
  // }

}
