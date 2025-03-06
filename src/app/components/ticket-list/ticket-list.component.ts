import { Component, OnInit } from '@angular/core';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
    NzPaginationModule,
    NzSelectModule,
    CreateTicketComponent
  ],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  displayedTickets: Ticket[] = [];
  
  // Pagination properties
  currentPage = 1;
  pageSize = 10;
  
  constructor(private apiService: FetchApiInstanceService) { }
  
  ngOnInit(): void {
    this.loadTickets();
  }
  
  async loadTickets() {
    try {
      const response = await this.apiService.get<{ code: number; message: string; data: Ticket[] }>('ticket/tickets');
      if (response.code === 0) {
        this.tickets = response.data;
        this.updateDisplayedTickets();
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
  
  updateDisplayedTickets() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedTickets = this.tickets.slice(startIndex, endIndex);
  }
  
  onPageIndexChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.updateDisplayedTickets();
  }
  
  onPageSizeChange() {
    // Reset to first page when changing page size
    this.currentPage = 1;
    this.updateDisplayedTickets();
  }
}