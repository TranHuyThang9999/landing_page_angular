import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/ user-profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      this.userProfile = JSON.parse(storedUser);
    }
  }

  logout() {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('token');
    this.userProfile = null;
    window.location.href = '/login';
  }

  goToProfile() {
    if (this.router.url !== '/profile') {
      this.router.navigate(['/profile']);
    }
  }
}
