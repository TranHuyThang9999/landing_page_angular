import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FetchApiInstanceService } from '../utils/fetch_api.service';
import { ResponseData, UserProfile } from '../components/models/ user-profile.model';

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
        localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  }

}
