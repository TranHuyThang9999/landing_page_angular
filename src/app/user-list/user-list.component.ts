import { Component, OnInit } from '@angular/core';
import { FetchApiInstanceService } from '../utils/fetch_api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponseListUser, UserProfile } from '../components/models/ user-profile.model';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  userProfile: UserProfile[] | null = null;

  constructor(
    private apiService: FetchApiInstanceService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

   async getData() {
      try {
        const response: ResponseListUser = await this.apiService.get('user/public/users');
        if (response.code === 0) {
          this.userProfile = response.data;
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    }

}
