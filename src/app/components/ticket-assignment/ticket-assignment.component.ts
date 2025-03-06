import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { TicketService } from '../../services/ticket.service';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { Ticket } from '../models/ticket';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
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
    private apiService: FetchApiInstanceService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers().then(users => {
      this.users = users;
    }).catch(err => this.message.error("Lỗi khi lấy danh sách người dùng: " + err));

    this.ticketService.getTickets().then(tickets => {
      this.tickets = tickets;
    }).catch(err => this.message.error("Lỗi khi lấy danh sách ticket: "));
  }

  createAssignTicketsForUsers(form: NgForm) {
    if (form.invalid || this.selectedTicketIds.length === 0 || this.selectedAssigneeIds.length === 0) {
      this.message.warning('Vui lòng chọn ít nhất một ticket và một người dùng!');
      return;
    }

    this.apiService.post<{ message: string, code: number }>('assignTickets/create', {
      tickets: {
        ticketIds: this.selectedTicketIds,
        assigneeIds: this.selectedAssigneeIds
      }
    })
      .then(response => {
        if (response.code === 0) {
          this.message.success('Gán ticket cho người dùng thành công!');
          this.selectedTicketIds = [];
          this.selectedAssigneeIds = [];
          form.resetForm();
        } else {
          this.message.error(response.message || 'Có lỗi xảy ra!');
        }
      })
      .catch(error => {
        console.error('Lỗi khi gửi yêu cầu', error);
        this.message.error('Lỗi khi gán ticket!');
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
