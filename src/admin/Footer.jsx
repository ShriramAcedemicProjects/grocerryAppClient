import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1201,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Grocery Admin Panel. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
