export interface ReceivedAssignedTicketDTO {
    assignedTicketId: number;
    ticketId: number;
    assignerId: number;
    name: string;
    fileDescription: string;
    description: string;
}

export interface TicketAssignedByMe {
    id: number;
    assigneeId: number;
    name: string;
    fileDescription: string;
    description: string;
    createdAt: string;
}
