import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarTableProps {
  searchTerm: string;
  handleSearchChange: (newSearchTerm: string) => void;
  disabled?: boolean;
}

const SearchBarTable: React.FC<SearchBarTableProps> = ({
  searchTerm,
  handleSearchChange,
  disabled = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "30%",
        padding: "8px 16px",
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        value={searchTerm}
        onChange={(event) => handleSearchChange(event.target.value)}
        disabled={disabled}
        placeholder="Search ..."
        sx={{
          maxWidth: 400,
        }}
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

export default SearchBarTable;