import { Injectable } from "@angular/core";
import { FetchApiInstanceService } from "../utils/fetch_api.service";
import { AssignedTicketDetail } from "../components/models/ticket";

@Injectable({
    providedIn: 'root'
})
export class TicketSearchService {
    constructor(private apiService: FetchApiInstanceService) { }

    async getTickets(ticketName: string): Promise<AssignedTicketDetail[]> {
        try {
            const response = await this.apiService
                .get<{ code: number; message: string; data: AssignedTicketDetail[] }>(`ticket/search?ticketName=${(ticketName)}`);

            return response.code === 0 ? response.data : [];
        } catch (error) {
            console.error('Failed to load tickets:', error);
            return [];
        }
    }
}
