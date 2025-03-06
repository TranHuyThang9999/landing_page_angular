import { Injectable } from '@angular/core';
import { FetchApiInstanceService } from '../utils/fetch_api.service';
import { ResponseListUser, UserProfile } from '../components/models/ user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apiService: FetchApiInstanceService) {}  

  async getUsers(): Promise<UserProfile[]> {
    try {
      const response: ResponseListUser = await this.apiService.get<ResponseListUser>('user/public/users');
      return response.code === 0 ? response.data : [];
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      return [];
    }
  }
  
}
