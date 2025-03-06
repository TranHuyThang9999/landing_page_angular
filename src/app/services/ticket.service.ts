import { Injectable } from '@angular/core';
import { FetchApiInstanceService } from '../utils/fetch_api.service';
import { ResponseListUser, UserProfile } from '../components/models/ user-profile.model';
import { Ticket } from '../components/models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private apiService: FetchApiInstanceService) {}  

  async getTickets(): Promise<Ticket[]> {
    try {
      const response = await this.apiService.get<{ code: number; message: string; data: Ticket[] }>('ticket/tickets');
      return response.code === 0 ? response.data : [];
    } catch (error) {
      console.error('Failed to load tickets:', error);
      return [];
    }
  }


}
