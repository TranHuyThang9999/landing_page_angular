import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchApiInstanceService } from '../utils/fetch_api.service';
import { ResponseData, UserProfile } from '../components/models/ user-profile.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(
    private apiService: FetchApiInstanceService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      const response: ResponseData = await this.apiService.get('user/profile');
      if (response.code === 0) {
        this.userProfile = response.data;
        this.authService.setUser(this.userProfile);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  }

}
