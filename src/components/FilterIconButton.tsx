import { Button } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import React from "react";

interface FilterButtonProps {
  onClick: () => void;
}
const styles = {
  button: {
    display: "flex",
    alignItems: "center",
    color: "#333",
    borderRadius: "10px",
    border: "0.5px solid lightgrey",
    padding: "8px 30px",
    bgcolor: "transparent",
    fontSize: "16px",
    textTransform: "none",
    "&:hover": {
      bgcolor: "grey.100",
    },
  },
  icon: {
    fontSize: 20,
    marginRight: 1,
    color: "#333",
  },
};

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <Button sx={styles.button} onClick={onClick}>
      <FilterList sx={styles.icon} />
      Filter
    </Button>
  );
};

export default FilterButton;
