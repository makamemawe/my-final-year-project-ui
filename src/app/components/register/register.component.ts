import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {
    if (registerForm.valid) {
      const registrationDetails = registerForm.value;
      this.userService.register(registrationDetails).subscribe(
        (res) => {
          console.log(res);
          this.snackBar.open('registration succefully', 'clese', {
            duration: 5000,
          });
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log(err);
          this.snackBar.open('registration is failed', 'ERROR', {
            duration: 5000,
          });
        }
      );
    }
  }

}
