import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchApiInstanceService } from '../utils/fetch_api.service';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

interface ResponseData {
  code: number;
  message: string;
  data: UserProfile;
}


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
export class ProfileComponent implements OnInit{
  userProfile: UserProfile | null = null;

  constructor(
    private apiService: FetchApiInstanceService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      const response: ResponseData = await this.apiService.get('user/profile');
      if (response.code === 0) {
        this.userProfile = response.data;
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  }

}
