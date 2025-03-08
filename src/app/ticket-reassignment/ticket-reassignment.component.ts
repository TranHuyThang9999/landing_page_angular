import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { TicketServiceAssignedToMe } from '../services/tickets_assigned_to_me.service';
import { ReceivedAssignedTicketDTO } from '../components/models/assigned_ticket';
import { ReassignTicketService } from '../services/reassign_ticket.service';
import { UserProfile } from '../components/models/ user-profile.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-ticket-reassignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './ticket-reassignment.component.html',
  styleUrls: ['./ticket-reassignment.component.css']
})
export class TicketReassignmentComponent implements OnInit {
  users: UserProfile[] = [];
  tickets: ReceivedAssignedTicketDTO[] = [];
  selectedTicketIds: number[] = [];
  selectedAssigneeIds: number[] = [];

  constructor(
    private usersService: UsersService,
    private ticketService: TicketServiceAssignedToMe,
    private reassignTicketService: ReassignTicketService,
    private message: NzMessageService,
    private nzConfigService: NzConfigService,
  ) { 
    this.nzConfigService.set('message', { nzTop: 100 });
  }

  async ngOnInit(): Promise<void> {
    try {
      this.tickets = await this.ticketService.getAssignedTicketsToMe();
      this.users = await this.usersService.getUsers();
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  }

  toggleTicketSelection(assignedTicketId: number): void {
    const index = this.selectedTicketIds.indexOf(assignedTicketId);
    if (index > -1) {
      this.selectedTicketIds.splice(index, 1);
    } else {
      this.selectedTicketIds.push(assignedTicketId);
    }
  }

  toggleAssigneeSelection(userId: number): void {
    const index = this.selectedAssigneeIds.indexOf(userId);
    if (index > -1) {
      this.selectedAssigneeIds.splice(index, 1);
    } else {
      this.selectedAssigneeIds.push(userId);
    }
  }

  async reassignTickets(): Promise<void> {
    if (this.selectedTicketIds.length === 0 || this.selectedAssigneeIds.length === 0) {
      this.message.warning('Vui lòng chọn ít nhất một ticket và một người nhận mới.');
      return;
    }

    try {
      const success = await this.reassignTicketService.reassignTicket({
        assignedTicketIds: this.selectedTicketIds,
        newAssigneeIds: this.selectedAssigneeIds
      });

      if (success) {
        this.message.success('Chuyển giao ticket thành công!');
        this.selectedTicketIds = [];
        this.selectedAssigneeIds = [];
      } else {
        this.message.error('Có lỗi xảy ra khi chuyển giao ticket!');
      }
    } catch (error) {
      this.message.error('Lỗi khi chuyển giao ticket:');
    }
  }

}
