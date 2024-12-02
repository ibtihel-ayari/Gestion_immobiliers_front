import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
 

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        this.router.navigate(['/annonces']);
      },
      error: (response) => {
        alert(JSON.stringify(response.error));
      },
    });
  }
}
