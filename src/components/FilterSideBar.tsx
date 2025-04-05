import React from "react";
import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  Button,
  Drawer,
  IconButton,
} from "@mui/material";
import { Add, Remove, Close } from "@mui/icons-material";

interface FilterSidebarProps {
  filters: any[];
  open: boolean;
  filterValues: { [key: string]: any };
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, filterLabel: string) => void;
  onResetAll: () => void;
  onApply: () => void;
  onToggleFilter: (filterLabel: string) => void;
  onClose: () => void;
  openFilters: { [key: string]: any };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open,
  filterValues,
  onCheckboxChange,
  onResetAll,
  onApply,
  onToggleFilter,
  onClose,
  openFilters,
  filters,
}) => {

  console.log("on toggle",onToggleFilter)
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 390,
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