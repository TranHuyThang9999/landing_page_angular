import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/ user-profile.model';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userProfile: UserProfile | null = null;

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
    window.location.href = '/';
  }
}
