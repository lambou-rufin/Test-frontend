// src/services/ticket.service.ts
import { notifyError, notifySuccess } from "src/utils/toastUtils";
import axiosInstance from "src/config/axiosInstance";
import { ICreateTicket, ITicket, TicketStatus } from "src/interface/Ticket.interface";

const TICKET_ROOT = "/tickets";

const ticketService = {
  /**
   * Récupère tous les tickets
   */
  findAll: async (): Promise<ITicket[]> => {
    try {
      const res = await axiosInstance.get<ITicket[]>(TICKET_ROOT);
      return res.data;
    } catch (err) {
      notifyError("Erreur lors de la récupération des tickets");
      return [];
    }
  },

  /**
   * Récupère un ticket par ID
   */
  findOne: async (id: number): Promise<ITicket | null> => {
    try {
      const res = await axiosInstance.get<ITicket>(`${TICKET_ROOT}/${id}`);
      return res.data;
    } catch (err) {
      notifyError("Ticket introuvable");
      return null;
    }
  },

  /**
   * Crée un nouveau ticket
   */
create: async (ticket: ICreateTicket): Promise<ITicket | null> => {
  try {
    const res = await axiosInstance.post<ITicket>(TICKET_ROOT, ticket);
    notifySuccess("Ticket créé avec succès");
    return res.data;
  } catch (err: any) {
    console.error("Erreur création ticket:", err.response?.data || err.message);
    notifyError("Erreur lors de la création du ticket");
    return null;
  }
},

  /**
   * Met à jour le statut d'un ticket
   */
  updateStatus: async (id: number, status?: TicketStatus): Promise<ITicket | null> => {
    try {
      const res = await axiosInstance.patch<ITicket>(`${TICKET_ROOT}/${id}`, status ? { status } : {});
      notifySuccess("Statut mis à jour");
      return res.data;
    } catch (err) {
      notifyError("Erreur lors de la mise à jour du statut");
      return null;
    }
  },

  /**
   * Supprime un ticket
   */
  remove: async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${TICKET_ROOT}/${id}`);
      notifySuccess("Ticket supprimé");
    } catch (err) {
      notifyError("Erreur lors de la suppression du ticket");
    }
  },
};

export default ticketService;
