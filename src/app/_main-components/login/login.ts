import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth-service';
import { LoginRequest } from '../../_models/auth';
declare const alertify: any;

@Component({
  selector: 'login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  request: LoginRequest = new LoginRequest();
  errors: any = [];
  loading = false;

  login() {
    this.loading = true;
    this.authService.login(this.request).subscribe({
      next: result => {
        this.authService.saveToken(result.data.token);
      },
      error: result => {
        this.loading = false;
        alertify.error("Login failed! Check your credentials.");
        if (result.status === 400) {
          this.errors = result.error.errors;
        }
      },
      complete: () => {
        this.loading = false;
        alertify.success("Welcome back!");
        this.router.navigateByUrl('/admin/category');
      }
    });
  }
}
