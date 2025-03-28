import React from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  FormControlLabel,
  Button,
  Drawer,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Add, Remove, Clear, Close } from "@mui/icons-material";

interface FilterSidebarProps {
  filters: any[];
  open: boolean;
  filterValues: { [key: string]: any };
  onSearchChange: (value: any, filterLabel: string) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, filterLabel: string) => void;
  onResetAll: () => void;
  onApply: () => void;
  onToggleFilter: (filterLabel: string) => void;
  onClose: () => void; 
  openFilters: { [key: string]: boolean };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open,
  filterValues,
  onSearchChange,
  onCheckboxChange,
  onResetAll,
  onApply,
  onToggleFilter,
  onClose, 
  openFilters,
  filters,
}) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 290,
          bgcolor: "#FAFAFA",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <List sx={{ padding: 0 }}>
          {filters.map((filter) => (
            <React.Fragment key={filter.label}>
              <ListItem onClick={() => onToggleFilter(filter.label)}>
                <ListItemText primary={filter.label || ""} />
                {openFilters[filter.label || ""] ? <Remove /> : <Add />}
              </ListItem>
              <Collapse in={openFilters[filter.label]} timeout="auto" unmountOnExit>
                <Box sx={{ p: 2 }}>
                  {filter.type === "search" && (
                    <TextField
                      label={filter.label === "Search" ? "" : ""}
                      value={filterValues[filter.label] || ""}
                      onChange={(event) => onSearchChange(event.target.value, filter.label)}
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiInputBase-input": {
                          backgroundColor: "transparent",
                          "&:focus": { backgroundColor: "transparent" },
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => onSearchChange("", filter.label)}
                                edge="end"
                              >
                                <Clear />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                  {filter.type === "checkbox" && (
                    <Box>
                      {filter.options?.map((option: any) => (
                        <FormControlLabel
                          key={option}
                          control={
                            <Checkbox
                              checked={filterValues[filter.label || ""]?.includes(option) || false}
                              onChange={(e) => onCheckboxChange(e, filter.label)}
                              value={option}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </Box>
                  )}
                  {filter.type === "autocomplete" && (
                    <Autocomplete
                      multiple
                      options={filter.options || []}
                      value={filterValues[filter.label] || []}
                      onChange={(_, value) => onSearchChange(value, filter.label)}
                      renderInput={(params) => (
                        <TextField {...params} label={filter.label} />
                      )}
                    />
                  )}
                </Box>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="text" color="primary" onClick={onResetAll}>
              Reset All
            </Button>
            <Button variant="text" color="primary" onClick={onApply}>
              Apply
            </Button>
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};

export default FilterSidebar;