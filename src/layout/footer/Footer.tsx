import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" color="text.secondary">
        © 2025 - Application de gestion de tickets By Lambou
      </Typography>
    </Box>
  );
};

export default Footer;
