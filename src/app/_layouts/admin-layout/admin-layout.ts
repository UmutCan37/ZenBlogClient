import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth-service';
import { Dropdown } from 'bootstrap';

@Component({
  selector: 'admin-layout',
  standalone: false,
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

  @ViewChild('userMenuToggle') userMenuToggle!: ElementRef<HTMLElement>;
  private dropdownInstance: Dropdown | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  toggleUserMenu(event: Event) {
    event.preventDefault();
    if (!this.dropdownInstance) {
      this.dropdownInstance = new Dropdown(this.userMenuToggle.nativeElement);
    }
    this.dropdownInstance.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
