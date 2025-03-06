import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../models/ticket';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { UserProfile } from '../models/ user-profile.model';

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
  tickets: Ticket[] = [];
  selectedTicketIds: number[] = [];
  selectedAssigneeIds: number[] = [];
  
  constructor(
    private usersService: UsersService,
    private ticketService: TicketService,
    private apiService: FetchApiInstanceService
  ) {}

  async createAssignTicketsForUsers(form: NgForm) {
    if (form.invalid || this.selectedTicketIds.length === 0 || this.selectedAssigneeIds.length === 0) {
      alert('Vui lòng chọn ít nhất một ticket và một người dùng!');
      return;
    }

    try {
      const response = await this.apiService.post<{ message: string, code: number }>('assignTickets/create', {
        tickets: {
          ticketIds: this.selectedTicketIds,
          assigneeIds: this.selectedAssigneeIds
        }
      });

      if (response.code === 0) {
        alert('Gán ticket cho người dùng thành công!');
        this.selectedTicketIds = [];
        this.selectedAssigneeIds = [];
        form.resetForm(); // Reset form sau khi gửi thành công
      } else {
        alert(response.message || 'Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu', error);
      alert('Lỗi khi gán ticket!');
    }
  }

  ngOnInit(): void {
    this.usersService.getUsers().then(users => {
      this.users = users;
    }).catch(err => console.error("Lỗi khi lấy danh sách người dùng:", err));

    this.ticketService.getTickets().then(tickets => {
      this.tickets = tickets;
    }).catch(err => console.error("Lỗi khi lấy danh sách ticket:", err));
  }
}
