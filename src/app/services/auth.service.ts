import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserProfile } from '../components/models/ user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  userProfile$ = this.userSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') { // Kiểm tra nếu đang chạy trong trình duyệt
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
      }
    }
  }

  setUser(user: UserProfile | null) {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('userProfile', JSON.stringify(user));
      } else {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('token');
      }
    }
    this.userSubject.next(user);
  }

  logout() {
    this.setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}
