import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FetchApiInstanceService } from '../utils/fetch_api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../components/models/ user-profile.model';
import { UsersService } from '../services/users.service';

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
  users: UserProfile[] | null = null;
  @Output() usersLoaded = new EventEmitter<UserProfile[]>();

  constructor(
    private usersService: UsersService,
  ) { }


  ngOnInit(): void {

    this.usersService.getUsers().then(users => {
      this.users = users;
    }).catch(err => console.error("Lỗi khi lấy danh sách người dùng:", err));

  }


}
