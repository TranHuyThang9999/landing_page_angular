import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketAssignedByMe } from '../models/assigned_ticket';
import { TicketServiceAssignedByMe } from '../../services/tickets_assigned_by_me.service';

@Component({
  selector: 'app-tickets-assigned-by-me',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './tickets-assigned-by-me.component.html',
  styleUrl: './tickets-assigned-by-me.component.css'
})
export class TicketsAssignedByMeComponent {
  tickets: TicketAssignedByMe[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private ticketService: TicketServiceAssignedByMe) { }
  async ngOnInit() {
    this.loading = true;
    try {
      this.tickets = await this.ticketService.getAssignedTicketsByMe();
    } catch (error) {
      this.errorMessage = "Lỗi khi tải dữ liệu!";
    }
    this.loading = false;
  }
}
