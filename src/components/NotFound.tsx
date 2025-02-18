import React from 'react'

import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; 

const NotFound:React.FC = () => {
  return (
    <Box
    sx={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1A2238',
      position: 'relative',
    }}
  >
    <Typography
      variant="h1"
      sx={{
        fontSize: '9rem',
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: '0.5rem',
      }}
    >
      404
    </Typography>
    <Box
      sx={{
        backgroundColor: '#FF6A3D',
        paddingX: '0.5rem',
        paddingY: '0.25rem',
        fontSize: '0.875rem',
        borderRadius: '4px',
        transform: 'rotate(12deg)',
        position: 'absolute',
      }}
    >
      Page Not Found
    </Box>
    <Button
      variant="outlined"
      sx={{
        marginTop: 5,
        textTransform: 'none',
        borderColor: '#FF6A3D',
        color: '#FF6A3D',
        '&:hover': {
          borderColor: '#FF6A3D',
          backgroundColor: '#FF6A3D',
          color: '#1A2238',
        },
      }}
      component={Link} 
      to="/"
    >
      Go Home
    </Button>
  </Box>
  )
}

export default NotFound
