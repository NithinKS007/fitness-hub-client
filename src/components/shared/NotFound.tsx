import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const containerStyles = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const headingStyles = {
  fontSize: {
    xs: '6rem',
    sm: '8rem',
    md: '10rem',
    lg: '12rem',
  },
  fontWeight: 'bold',
  color: 'black',
  lineHeight: 1,
  marginBottom: 2,
};

const textStyles = {
  marginBottom: 2,
  fontSize: '1.5rem',
};

const buttonStyles = {
  marginTop: 2,
  bgcolor: "black",
};

const NotFound: React.FC = () => {
  return (
    <Box sx={containerStyles}>
      <Typography variant="h1" sx={headingStyles}>
        404
      </Typography>
      <Typography sx={textStyles}>
        Page Not Found
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={buttonStyles}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFound;