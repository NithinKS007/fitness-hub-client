import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

interface FilterProps {
  sort?: any[];
  filter?: any[];
  direction?: any[];
}

const Filter: React.FC<FilterProps> = ({ sort, filter, direction }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", marginBottom: 1 }}>
      {filter?.length!==undefined  && filter?.length > 0 && (
        <FormControl size="small" sx={{ minWidth: 180}}>
          <InputLabel>Filter by</InputLabel>
          <Select
            label="Filter by"
            sx={{ minWidth: 180 }}
            MenuProps={{
              PaperProps: {
                sx: {
                  border: "1px solid", 
                  borderColor: "grey.400", 
                  borderRadius: 2, 
                  mt: 1, 
                },
                elevation: 1,
              },
            }}
          >
            {filter?.map((item, index) => (
              <MenuItem key={index} value={item?.value}>
                {item?.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {sort?.length!==undefined &&sort?.length > 0 && (
        <FormControl size="small" sx={{ minWidth: 180}}>
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
                  mt: 1,
                },
                elevation: 1,
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
      )}

      {direction?.length!==undefined&&direction?.length > 0 && (
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
                  mt: 1, 
                },
                elevation: 1,
              },
            }}
          >
            {direction.map((item, index) => (
              <MenuItem key={index} value={item?.value}>
                {item?.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default Filter;
