import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { TicketService } from '../../services/ticket.service';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { Ticket } from '../models/ticket';
import { UserProfile } from '../models/ user-profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-assignment',
  templateUrl: './ticket-assignment.component.html',
  styleUrls: ['./ticket-assignment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ] // Nếu cần thêm module (CommonModule, FormsModule) thì import ở đây
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
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers().then(users => {
      this.users = users;
    }).catch(err => console.error("Lỗi khi lấy danh sách người dùng:", err));

    this.ticketService.getTickets().then(tickets => {
      this.tickets = tickets;
    }).catch(err => console.error("Lỗi khi lấy danh sách ticket:", err));
  }

  createAssignTicketsForUsers(form: NgForm) {
    if (form.invalid || this.selectedTicketIds.length === 0 || this.selectedAssigneeIds.length === 0) {
      alert('Vui lòng chọn ít nhất một ticket và một người dùng!');
      return;
    }
    console.log('Dữ liệu gửi lên:', this.selectedTicketIds, this.selectedAssigneeIds);

    this.apiService.post<{ message: string, code: number }>('assignTickets/create', {
      tickets: {
        ticketIds: this.selectedTicketIds,
        assigneeIds: this.selectedAssigneeIds
      }
    })
      .then(response => {
        if (response.code === 0) {
          alert('Gán ticket cho người dùng thành công!');
          this.selectedTicketIds = [];
          this.selectedAssigneeIds = [];
          form.resetForm();
        } else {
          alert(response.message || 'Có lỗi xảy ra!');
        }
      })
      .catch(error => {
        console.error('Lỗi khi gửi yêu cầu', error);
        alert('Lỗi khi gán ticket!');
      });
  }

  // Xử lý chọn/bỏ checkbox cho Ticket
  toggleTicketSelection(ticketId: number) {
    const index = this.selectedTicketIds.indexOf(ticketId);
    if (index > -1) {
      this.selectedTicketIds.splice(index, 1);
    } else {
      this.selectedTicketIds.push(ticketId);
    }
  }

  // Xử lý chọn/bỏ checkbox cho User
  toggleAssigneeSelection(userId: number) {
    const index = this.selectedAssigneeIds.indexOf(userId);
    if (index > -1) {
      this.selectedAssigneeIds.splice(index, 1);
    } else {
      this.selectedAssigneeIds.push(userId);
    }
  }
}
