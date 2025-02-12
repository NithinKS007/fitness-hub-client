import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBarTable = () => {
  // Declare state for search term
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'end' }}>
      <TextField
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: '225px',
          height: '45px',
          '& .MuiInputAdornment-root': {
            cursor: 'pointer', // Makes the cursor a pointer when hovering over the icon
          },
          '& .MuiInputBase-root': { height: '45px' }, // Decreasing height
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBarTable;
