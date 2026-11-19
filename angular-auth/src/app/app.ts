import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from './service/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private readonly auth: Auth, private readonly router: Router) {}

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }
}
