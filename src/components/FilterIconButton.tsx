import { Button } from "@mui/material";
import { FilterList } from "@mui/icons-material";

const FilterButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      sx={{
        display: "flex",
        alignItems: "center",
        color: "#333",
        borderRadius: "10px",
        border: "0.5px solid lightgrey",
        padding: "8px 30px",
        bgcolor: "transparent",
        fontSize: "16px",
        textTransform: "none",
      }}
      onClick={onClick} 
    >
      <FilterList sx={{ fontSize: 20, marginRight: 1, color: "#333" }} />
      Filter
    </Button>
  );
};

export default FilterButton;
