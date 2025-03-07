import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography sx={{ marginBottom: 2 }}>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ textTransform: 'none' }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;