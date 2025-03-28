import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface TableDirectionProps {
  direction: any[];
}

const TableDirection: React.FC<TableDirectionProps> = ({ direction }) => {
  return (
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <InputLabel>Direction</InputLabel>
      <Select
        label="Direction"
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
        {direction?.map((item, index) => (
          <MenuItem key={index} value={item?.value}>
            {item?.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TableDirection;
