import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../models/user-registration';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  user: UserRegistration = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    phone_number: '',
    role: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.registerUser(this.user).subscribe({
      next: (response) => {
        alert(JSON.stringify(response.message));
        this.router.navigate(['/login']);
      },
      error: (Response) => {
        alert(JSON.stringify(Response.error));
      },
    });
  }
}
