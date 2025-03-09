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
}


export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

