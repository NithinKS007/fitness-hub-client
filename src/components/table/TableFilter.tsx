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
  filter: { value: string; _id?: string }[];
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
        renderValue={(selected) => {
          const selectedValues = filter
            .filter((option) => selected.includes(option._id || option.value))
            .map((option) => option.value);

          return selectedValues.length > 0
            ? selectedValues.join(", ")
            : "Select filters";
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              border: "1px solid lightgrey",
              borderRadius: 2,
              maxHeight: 200,
              mt: 1,
            },
          },
        }}
      >
        {filter.map((option) => {
          const filterValue = option._id ? option._id : option.value;
          return (
            <MenuItem key={filterValue} value={filterValue}>
              <Checkbox checked={selectedFilter?.includes(filterValue)} />
              <ListItemText primary={option.value} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default TableFilter;
