import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";
import { Ticket } from '../models/ticket';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzImageModule,
    NzPaginationModule,
    CreateTicketComponent,
  ],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  displayedTickets: Ticket[] = [];
  
  currentPage = 1;
  pageSize = 5; // Fix số bản ghi mỗi trang là 5
  
  constructor(private ticketService: TicketService) { }
  
  ngOnInit(): void {
    this.loadTickets();
  }
  
  async loadTickets() {
    this.ticketService.getTickets().then(ticket => {
      this.tickets = ticket;
      this.updateDisplayedTickets();
    }).catch(err => console.error("Lỗi khi lấy danh sách ticket:", err));
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
  
  // Không cần onPageSizeChange() vì pageSize cố định
}
