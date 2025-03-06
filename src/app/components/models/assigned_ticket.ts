export interface ReceivedAssignedTicketDTO {
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
  }
