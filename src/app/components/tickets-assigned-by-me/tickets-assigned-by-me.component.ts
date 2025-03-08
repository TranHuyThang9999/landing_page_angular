import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketAssignedByMe } from '../models/assigned_ticket';
import { TicketServiceAssignedByMe } from '../../services/tickets_assigned_by_me.service';
import { TicketEventService } from '../../services/ticket_assigned_event.service';
import { Subscription } from 'rxjs';

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
  private ticketEventSubscription!: Subscription;

  constructor(
    private ticketService: TicketServiceAssignedByMe,
    private ticketEventService: TicketEventService,
  ) { }

  async ngOnInit() {
    this.loadAssignedTickets();

    this.ticketEventSubscription = this.ticketEventService.ticketAssigned$.subscribe(() => {
      this.loadAssignedTickets();
    });
  }

  async loadAssignedTickets() {
    this.loading = true;
    try {
      this.tickets = await this.ticketService.getAssignedTicketsByMe();
    } catch (error) {
      this.errorMessage = "Lỗi khi tải dữ liệu!";
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.ticketEventSubscription.unsubscribe();
  }
  

}
