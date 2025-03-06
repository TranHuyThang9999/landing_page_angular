import { Component, OnInit } from '@angular/core';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";

export interface Ticket {
  id: number;
  name: string;
  fileDescription: string;
}

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzImageModule,
    CreateTicketComponent
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
      } else {
        console.error('Failed to load tickets. Server response:', response);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách ticket:", error);
    }
  }

  onTicketCreated() {
    this.loadTickets();
  }
}