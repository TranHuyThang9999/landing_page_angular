import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/ user-profile.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.userProfile$.subscribe(user => {
      this.userProfile = user;
    });
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    if (this.router.url !== '/dashboard') {
      this.router.navigate(['/dashboard']);
    }
  }
  
}
