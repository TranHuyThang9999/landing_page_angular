import { Component, OnInit } from '@angular/core';
import { ReceivedAssignedTicketDTO } from '../models/assigned_ticket';
import { TicketServiceAssignedToMe } from '../../services/tickets_assigned_to_me.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets-assigned-to-me',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './tickets-assigned-to-me.component.html',
  styleUrl: './tickets-assigned-to-me.component.css'
})
export class TicketsAssignedToMeComponent implements OnInit {
  tickets: ReceivedAssignedTicketDTO[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private ticketService: TicketServiceAssignedToMe) { }

  async ngOnInit() {
    this.loading = true;
    try {
      this.tickets = await this.ticketService.getAssignedTicketsToMe();
    } catch (error) {
      this.errorMessage = "Lỗi khi tải dữ liệu!";
    }
    this.loading = false;
  }

}
