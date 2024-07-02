import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  role!:string
  constructor(
    private authService: AuthService,
    private router: Router,
    private store:StoreService,

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
    this.router.navigate(['/']);
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.authService.clear();
    this.router.navigate(['/']);
  }


}
