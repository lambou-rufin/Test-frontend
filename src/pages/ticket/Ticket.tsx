import React, { useEffect, useState } from 'react';
import TicketItem from 'src/components/ticketItem/TicketItem';
import { TicketStatus } from 'src/interface/Ticket.interface';
import { ITicket, ICreateTicket } from 'src/interface/Ticket.interface';
import AjoutTicket from './AddTicket';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import ConfirmModalComponent from 'src/components/confirmModal/ConfirmModal';
import ticketService from 'src/service/ticket.service';

const Ticket: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tickets, setTickets] = useState<ITicket[]>([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Charger tous les tickets à l'initialisation
  useEffect(() => {
    const fetchTickets = async () => {
      const data = await ticketService.findAll();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(ticket =>
    statusFilter === 'ALL' || ticket.status === statusFilter
  );

  const changeStatus = async (id: number) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;

    const nextStatus =
      ticket.status === TicketStatus.OPEN
        ? TicketStatus.IN_PROGRESS
        : ticket.status === TicketStatus.IN_PROGRESS
        ? TicketStatus.RESOLVED
        : ticket.status;

    const updatedTicket = await ticketService.updateStatus(id, nextStatus);
    if (updatedTicket) {
      setTickets(prev =>
        prev.map(t => (t.id === id ? updatedTicket : t))
      );
    }
  };

  const requestDeleteTicket = (id: number) => {
    setTicketToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDeleteTicket = async () => {
    if (ticketToDelete !== null) {
      await ticketService.remove(ticketToDelete);
      setTickets(prev => prev.filter(ticket => ticket.id !== ticketToDelete));
      setTicketToDelete(null);
    }
    setConfirmOpen(false);
  };

  const cancelDeleteTicket = () => {
    setTicketToDelete(null);
    setConfirmOpen(false);
  };

const addTicket = async (newTicket: ICreateTicket): Promise<ITicket | null> => {
  const created = await ticketService.create(newTicket);
  if (created) {
    setTickets(prev => [...prev, created]);
    return created; // <- renvoyer le ticket créé
  }
  return null;
};


  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <ToastContainer />
      <Box mb={4}>
        <Stack
          direction={isSmallScreen ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems={isSmallScreen ? 'stretch' : 'center'}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Liste des Tickets
          </Typography>

          <Stack
            direction={isSmallScreen ? 'column' : 'row'}
            spacing={2}
            sx={{ width: isSmallScreen ? '100%' : 'auto' }}
          >
            <FormControl
              size="small"
              fullWidth={isSmallScreen}
              sx={{ minWidth: isSmallScreen ? '100%' : 180 }}
            >
              <InputLabel id="status-filter-label">Statut</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Statut"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="ALL">Tous</MenuItem>
                <MenuItem value={TicketStatus.OPEN}>Ouverts</MenuItem>
                <MenuItem value={TicketStatus.IN_PROGRESS}>En cours</MenuItem>
                <MenuItem value={TicketStatus.RESOLVED}>Résolus</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
              fullWidth={isSmallScreen}
              sx={{
                bgcolor: '#4f46e5',
                '&:hover': { bgcolor: '#4338ca' },
                whiteSpace: 'nowrap',
                height: '40px',
              }}
            >
              Ajouter un ticket
            </Button>
          </Stack>
        </Stack>
      </Box>

      <AjoutTicket
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddTicket={addTicket}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen
            ? '1fr'
            : isMediumScreen
            ? 'repeat(2, 1fr)'
            : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 7,
          alignItems: 'stretch',
        }}
      >
        {filteredTickets.map(ticket => (
          <TicketItem
            key={ticket.id}
            ticket={ticket}
            onStatusChange={changeStatus}
            onDelete={requestDeleteTicket}
          />
        ))}
      </Box>

      <ConfirmModalComponent
        open={confirmOpen}
        onClose={cancelDeleteTicket}
        onConfirm={confirmDeleteTicket}
        title="Supprimer le ticket"
        description="Êtes-vous sûr de vouloir supprimer ce ticket ?"
        confirmText="Supprimer"
        cancelText="Annuler"
      />

      {filteredTickets.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Aucun ticket disponible
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setModalOpen(true)}
            sx={{ width: isSmallScreen ? '100%' : 'auto' }}
          >
            Créer votre premier ticket
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Ticket;
