import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: FetchApiInstanceService,
    private router: Router,
  ) { }

  async login(event: Event) {
    event.preventDefault();
    try {
      const response = await this.apiService.post<{ data: string, message: string, statusCode: number }>('user/login', {
        userName: this.userName,
        password: this.password
      });

      if (response.statusCode === 200) {
        localStorage.setItem('token', response.data);
        this.router.navigate(['/profile']);
      } else {
        this.errorMessage = response.message || 'Đăng nhập thất bại';
      }
    } catch (error: any) {
      console.error('Lỗi đăng nhập:', error);
      this.errorMessage = error.message || 'Đăng nhập thất bại';
    }
  }
}
