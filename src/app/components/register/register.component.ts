import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (res) => {
        console.log(res);

        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
