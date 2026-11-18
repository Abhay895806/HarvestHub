
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  password = '';
  message = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.message = response.message;
        alert('Login Successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.message = error.error?.message || 'Login failed!';
      }
    });
  }
}
