import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../models/ user-profile.model';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket-assignment',
  templateUrl: './ticket-assignment.component.html',
  styleUrls: ['./ticket-assignment.component.css'],
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
    ]
})
export class TicketAssignmentComponent implements OnInit {
  users: UserProfile[] = [];


  constructor(private usersService: UsersService) {} 

  ngOnInit(): void {
    this.usersService.getUsers().then(users => {
      this.users = users;
    }).catch(err => console.error("Lỗi khi lấy danh sách người dùng:", err));
  }
  
}
