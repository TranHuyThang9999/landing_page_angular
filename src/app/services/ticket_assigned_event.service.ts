import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketEventService {
  private ticketAssignedSource = new Subject<void>();

  ticketAssigned$ = this.ticketAssignedSource.asObservable();

  notifyTicketAssigned() {
    this.ticketAssignedSource.next();
  }
}
