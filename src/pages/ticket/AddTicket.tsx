import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';
import { ICreateTicket, TicketStatus } from 'src/interface/Ticket.interface';

interface AjoutTicketProps {
  open: boolean;
  onClose: () => void;
  onAddTicket: (ticket: ICreateTicket) => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const AjoutTicket: React.FC<AjoutTicketProps> = ({ open, onClose, onAddTicket }) => {
  const [formData, setFormData] = useState<ICreateTicket>({
    title: '',
    description: '',
    status: TicketStatus.OPEN,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }
    onAddTicket(formData);
    toast.success('Ticket ajouté avec succès');
    setFormData({ title: '', description: '', status: TicketStatus.OPEN });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-ajout-ticket">
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>Ajouter un ticket</Typography>

        <TextField
          fullWidth
          label="Titre"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />

        <TextField
          select
          fullWidth
          label="Statut"
          name="status"
          value={formData.status}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value={TicketStatus.OPEN}>Ouvert</MenuItem>
          <MenuItem value={TicketStatus.IN_PROGRESS}>En cours</MenuItem>
          <MenuItem value={TicketStatus.RESOLVED}>Résolu</MenuItem>
        </TextField>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button variant="outlined" onClick={onClose}>Annuler</Button>
          <Button variant="contained" type="submit">Créer</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AjoutTicket;
