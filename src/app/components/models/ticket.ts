export interface Ticket {
  id: number;
  name: string;
  fileDescription: string;
  description: string;
}


export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}