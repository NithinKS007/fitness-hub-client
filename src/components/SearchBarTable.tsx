import React, { useState } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBarTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "end" }}>
      <TextField
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: "225px",
          height: "45px",
          "& .MuiInputAdornment-root": {
            cursor: "pointer",
          },
          "& .MuiInputBase-root": { height: "45px" },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }
        }}
      />
    </Box>
  );
};

export default SearchBarTable;
