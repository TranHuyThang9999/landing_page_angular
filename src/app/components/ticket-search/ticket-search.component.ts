import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssignedTicketDetail } from '../models/ticket';
import { TicketSearchService } from '../../services/ticket_search.service';

@Component({
  selector: 'app-ticket-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-search.component.html',
  styleUrl: './ticket-search.component.css'
})
export class TicketSearchComponent implements OnInit {
  tickets: AssignedTicketDetail[] = [];
  ticketName: string = '';
  loading = false;
  errorMessage: string | null = null;

  constructor(private ticketService: TicketSearchService) {}

  ngOnInit(): void {}

  async get() {
    this.ticketName = this.ticketName.trim();

    if (!this.ticketName) {
      this.errorMessage = 'Vui lòng nhập tên ticket.';
      return;
    }
    this.loading = true;
    this.errorMessage = null;

    try {
      this.tickets = await this.ticketService.getTickets(this.ticketName);
      if (this.tickets.length === 0) {
        this.errorMessage = 'Không tìm thấy ticket nào.';
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách ticket:', error);
      this.errorMessage = 'Đã xảy ra lỗi khi tải dữ liệu.';
    }

    this.loading = false;
  }
}
