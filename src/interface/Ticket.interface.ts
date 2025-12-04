// src/model/interfaces/Ticket.interface.ts

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

export interface ITicket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string; // ISO string
}

export interface ICreateTicket {
  title: string;
  description: string;
  status?: TicketStatus; // facultatif
}

export interface IUpdateTicketStatus {
  status: TicketStatus;
}
