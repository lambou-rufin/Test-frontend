import React from 'react';
import { TicketStatus, ITicket } from 'src/interface/Ticket.interface';
import './TicketItem.css';

interface TicketItemProps {
  ticket: ITicket;
  onStatusChange: (id: number) => void;
  onDelete: (id: number) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, onStatusChange, onDelete }) => {
  const getStatusClass = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.OPEN:
        return 'status-open';
      case TicketStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TicketStatus.RESOLVED:
        return 'status-resolved';
      default:
        return '';
    }
  };

  return (
    <div className="ticket-item">
      <div className="ticket-header">
        <h3 className="ticket-title">{ticket.title}</h3>
        <span className={`ticket-status ${getStatusClass(ticket.status)}`}>
          {ticket.status === TicketStatus.OPEN
            ? 'Ouvert'
            : ticket.status === TicketStatus.IN_PROGRESS
            ? 'En cours'
            : 'Résolu'}
        </span>
      </div>

      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-date">
        Créé le : {new Date(ticket.createdAt).toLocaleDateString()}
      </div>

      <div className="ticket-actions">
        {ticket.status !== TicketStatus.RESOLVED && (
          <button
            className="btn btn-status"
            onClick={() => onStatusChange(ticket.id)}
          >
            Changer statut
          </button>
        )}
        <button
          className="btn btn-delete"
          onClick={() => onDelete(ticket.id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default TicketItem;
