
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../service/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  fullName = '';
  email = '';
  password = '';
  message = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  register() {
    const user = {
      fullName: this.fullName,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        alert('Registration Successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.message = error.error?.message || 'Registration failed!';
      }
    });
  }
}
