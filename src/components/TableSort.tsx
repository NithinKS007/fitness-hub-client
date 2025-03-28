import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface TableSortProps {
  sort: any[];
}

const TableSort: React.FC<TableSortProps> = ({ sort }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel>Sort by</InputLabel>
      <Select
        label="Sort by"
        sx={{ minWidth: 180 }}
        MenuProps={{
          PaperProps: {
            sx: {
              border: "1px solid",
              borderColor: "grey.400",
              borderRadius: 2,
            },
            elevation:1
          },
        }}
      >
        {sort?.map((item, index) => (
          <MenuItem key={index} value={item?.value}>
            {item?.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TableSort;
