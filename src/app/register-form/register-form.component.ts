import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  registerUser() {
    this.http.post(`${environment.apiUrl}/user/register`, this.user)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Đăng ký thành công!');
        },
        error: (error) => {
          console.error('Lỗi khi đăng ký:', error);
          alert('Đăng ký thất bại!');
        }
      });
  }
}


