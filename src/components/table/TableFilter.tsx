import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

interface TableFilterProps {
  filter: { value: string }[];
  selectedFilter: string[];
  handleFilterChange: (value: string[]) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
  filter,
  selectedFilter,
  handleFilterChange,
}) => {

  return (
    <FormControl size="small" sx={{ minWidth: 225, maxWidth: 225 }}>
      <InputLabel>Filter by</InputLabel>

      <Select
        multiple
        label="Filter by"
        value={selectedFilter}
        onChange={(e) => handleFilterChange(e.target.value as string[])}
        renderValue={(selected) =>
          selected.length > 0 ? selected.join(", ") : "Select filters"
        }
        MenuProps={{
          PaperProps: {
            sx: { border: "1px solid lightgrey", borderRadius: 2, maxHeight: 200, mt: 1 },
          },
        }}
      >
        {filter.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectedFilter?.includes(option.value)} />
            <ListItemText primary={option.value} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TableFilter;
