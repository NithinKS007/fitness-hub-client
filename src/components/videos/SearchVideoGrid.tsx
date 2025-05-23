import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "35%",
    padding: "8px 20px",
  },
  searchInput: {
    maxWidth: 900,
    backgroundColor: "#fff",
    borderRadius: "4px",
  },
  searchInputText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#030303",
  },
};

interface SearchVideoGridProps {
  searchTerm: string;
  handleSearchChange: (newSearchTerm: string) => void;
  disabled?: boolean;
}

const SearchVideoGrid: React.FC<SearchVideoGridProps> = ({
  searchTerm,
  handleSearchChange,
  disabled = false,
}) => {
  return (
    <Box sx={styles.searchContainer}>
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={(event) => handleSearchChange(event.target.value)}
        placeholder="Search Videos..."
        disabled={disabled}
        sx={styles.searchInput}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchVideoGrid;
