import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModalComponent: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmer l'action",
  description = "Êtes-vous sûr ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box sx={style}>
        <Typography id="confirm-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="confirm-modal-description" sx={{ mt: 2, mb: 3 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="contained" color="success" onClick={onConfirm}>
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModalComponent;
