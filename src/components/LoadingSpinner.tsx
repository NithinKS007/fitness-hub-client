import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;      
  thickness?: number; 
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 60,         
  thickness = 4,    
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  );
};

export default LoadingSpinner;