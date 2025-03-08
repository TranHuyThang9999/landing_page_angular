import { Injectable } from "@angular/core";
import { FetchApiInstanceService } from "../utils/fetch_api.service";

interface ReassignTicket {
    assignedTicketIds: number[];
    newAssigneeIds: number[];
}

@Injectable({
    providedIn: 'root'
})
export class ReassignTicketService {
    constructor(private apiService: FetchApiInstanceService) { }

    async reassignTicket(command: ReassignTicket): Promise<boolean> {
        try {
            const response = await this.apiService.post<{ data: string, message: string, code: number }>('/assignTickets/reassignTicket', command);
            return response.code === 0;
        } catch (error: any) {
            console.error('Failed to reassign tickets:', error.message || error);
            return false;
        }
    }
}
