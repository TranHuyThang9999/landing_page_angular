export interface Ticket {
  id: number;
  name: string;
  fileDescription: string;
  description: string;
  assigneeId: number;
  assigneeName: string;
  assignerId: number;
  assignerName: string;
  status: number;
  assignedAt: string;
  firstAssginId: number;
  firstAssginName: string;
}


export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}


export interface AssignedTicketDetail {
  id: number;
  name: string;
  creatorId: number;
  description: string;
  assigneeId?: number;
  assigneeName?: string;
  assignerId?: number;
  assignerName?: string;
  status?: number;
  assignedAt?: string;
  firstAssginId?: number;
  firstAssginName?: string;
}
