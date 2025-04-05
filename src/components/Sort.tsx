import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SortProps {
  sortOption: {value:string}[];
  sortValue:string
  onChange: (value: string) => void;
}

const ReuseSort: React.FC<SortProps> = ({ sortOption, onChange,sortValue }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel 
        id="sort-select-label"
        sx={{
          color: "#333",
          fontSize: "16px",
          "&.Mui-focused": {
            color: "#333",
          },
        }}
      >
        Sort by
      </InputLabel>
      <Select
        labelId="sort-select-label"
        onChange={(e)=>onChange(e.target.value as string)}
        label="Sort by" 
        value={sortValue}
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#333",
          borderRadius: "10px",
          border: "0.5px ",
          padding: "0px 10px",
          bgcolor: "transparent",
          fontSize: "16px",
        }}
      >
        {sortOption.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              color: "#333",
              fontSize: "16px",
            }}
          >
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ReuseSort;