import { Injectable } from "@angular/core";
import { FetchApiInstanceService } from "../utils/fetch_api.service";
import { TicketAssignedByMe } from "../components/models/assigned_ticket";
import { ApiResponse } from "../components/models/ticket";


@Injectable({
    providedIn: 'root'
})
export class TicketServiceAssignedByMe {
    constructor(private apiService: FetchApiInstanceService) { }

    async getAssignedTicketsByMe(): Promise<TicketAssignedByMe[]> {
        try {
            const response: ApiResponse<TicketAssignedByMe[]> = await this.apiService.get<ApiResponse<TicketAssignedByMe[]>>('ticket/ticketsAssignedByMe');

            return response.code === 0 ? response.data : [];
        } catch (error) {
            console.error("Lỗi khi lấy danh sách ticket được giao:", error);
            return [];
        }
    }
}
