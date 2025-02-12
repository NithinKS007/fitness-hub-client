import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

interface FilterProps {
  sort: any[];
  filter: any[];
  direction: any[];
}

const Filter: React.FC<FilterProps> = ({ sort, filter, direction }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 1 }}>
      <FormControl size="small" sx={{ minWidth: 180, marginRight: 1 }}>
        <InputLabel>Filter by</InputLabel>
        <Select label="Filter by"  sx={{ minWidth: 180 }}> 
          {filter.map((item, index) => (
            <MenuItem  key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180, marginRight: 1 }}>
        <InputLabel>Sort by</InputLabel>
        <Select label="Sort by"  sx={{ minWidth: 180}}>
          {sort.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Direction</InputLabel>
        <Select label="Direction"  sx={{ minWidth: 180}}>
          {direction.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
