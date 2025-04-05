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
      <Typography 
        variant="h1" 
        sx={{ 
          fontSize: { 
            xs: '6rem',    
            sm: '8rem',   
            md: '10rem',  
            lg: '12rem'    
          }, 
          fontWeight: 'bold',
          color: 'black',
          lineHeight: 1,
          marginBottom: 2
        }}
      >
        404
      </Typography>
      <Typography 
        sx={{ 
          marginBottom: 2,
          fontSize: '1.5rem'
        }}
      >
        Page Not Found
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ marginTop: 2,bgcolor:"black" }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;