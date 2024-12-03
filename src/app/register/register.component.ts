import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../models/user-registration';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: UserRegistration = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    phone_number: '',
    role: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  showSnackbar(body: string): void {
    this.snackBar.open(body, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center', // 'start' | 'center' | 'end' | 'left' | 'right'
      verticalPosition: 'bottom', // 'top' | 'bottom'
    });
  }
  onSubmit(): void {
    this.authService.registerUser(this.user).subscribe({
      next: (response) => {
        this.showSnackbar('crée avec succès');
        this.router.navigate(['/login']);
      },
      error: (response) => {
        console.log(response);
        var error = JSON.stringify(response.error);
        this.showSnackbar(error);
      },
    });
  }
}
