import { Injectable } from "@angular/core";
import { FetchApiInstanceService } from "../utils/fetch_api.service";
import { ReceivedAssignedTicketDTO } from "../components/models/assigned_ticket";
import { ApiResponse } from "../components/models/ticket";


@Injectable({
  providedIn: 'root'
})
export class TicketServiceAssignedToMe {
    constructor(private apiService: FetchApiInstanceService) { }

    async getAssignedTicketsToMe(): Promise<ReceivedAssignedTicketDTO[]> {
        try {
            const response: ApiResponse<ReceivedAssignedTicketDTO[]> = await this.apiService.get<ApiResponse<ReceivedAssignedTicketDTO[]>>('ticket/assignedToMe');

            return response.code === 0 ? response.data : [];
        } catch (error) {
            console.error("Lỗi khi lấy danh sách ticket được giao:", error);
            return [];
        }
    }
}
