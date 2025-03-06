import { Component, OnInit } from '@angular/core';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Ticket {
  id: number;
  name: string;
  fileDescription: string;
}

@Component({
  selector: 'app-ticket-list',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private apiService: FetchApiInstanceService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  async loadTickets() {
    try {
      const response = await this.apiService.get<{ code: number; message: string; data: Ticket[] }>('ticket/tickets');

      if (response.code === 0) {
        this.tickets = response.data;
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách ticket:", error);
    }
  }



  onTicketCreated(newTicket: Ticket) {
    this.loadTickets();
  }
}
