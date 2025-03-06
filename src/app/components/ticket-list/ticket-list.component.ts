import { Component, OnInit } from '@angular/core';
import { FetchApiInstanceService } from '../../utils/fetch_api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateTicketComponent } from "../create-ticket/create-ticket.component";
import { UserListComponent } from "../../user-list/user-list.component";
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
    NzSelectModule,
    CreateTicketComponent,
    UserListComponent
],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {  
  tickets: Ticket[] = [];
  displayedTickets: Ticket[] = [];
  
  currentPage = 1;
  pageSize = 10;
  
  constructor(
    private ticketService : TicketService,
  ) { }
  
  ngOnInit(): void {
    this.loadTickets();
  }
  
   loadTickets() {
    this.ticketService.getTickets().then(ticket => {
      this.tickets = ticket;
    }).catch(err => console.error("Lỗi khi lấy danh sách người dùng:", err));
  
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