import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth-service';

@Component({
  selector: 'main-layout',
  standalone: false,
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout implements OnInit {

  constructor(private authService: AuthService) { }

  isMobileMenuOpen = false;
  showScrollTop = false;
  currentYear = new Date().getFullYear();

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.showScrollTop = window.scrollY > 200;
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getFullName() {
    const decoded = this.authService.getCurrentUser();
    return decoded?.fullName ?? '';
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }
}
