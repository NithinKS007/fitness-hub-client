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
  filterValues: any;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>, filterLabel: string) => void;
  onResetAll: () => void;
  onApply: () => void;
  onToggleFilter: (filterLabel: string) => void;
  onClose: () => void;
  openFilters: any;
}

const styles = {
  drawer: {
    "& .MuiDrawer-paper": {
      width: 390,
      bgcolor: "#FAFAFA",
    },
  },
  container: {
    p: 3,
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    mb: 2,
  },
  closeButton: {
    size: "small",
  },
  list: {
    padding: 0,
  },
  collapseContent: {
    p: 2,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: 2,
  },
  resetButton: {
    variant: "text",
    color: "primary",
  },
  applyButton: {
    variant: "text",
    color: "primary",
  },
};

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

  return (
    <Drawer anchor="left" open={open} onClose={onClose} sx={styles.drawer}>
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <IconButton onClick={onClose} sx={styles.closeButton}>
            <Close />
          </IconButton>
        </Box>
        <List sx={styles.list}>
          {filters.map((filter) => (
            <React.Fragment key={filter.label}>
              <ListItem onClick={() => onToggleFilter(filter.label)}>
                <ListItemText primary={filter.label || ""} />
                {openFilters[filter.label || ""] ? <Remove /> : <Add />}
              </ListItem>
              <Collapse in={openFilters[filter.label]} timeout="auto" unmountOnExit>
                <Box sx={styles.collapseContent}>
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
          <Box sx={styles.buttonContainer}>
            <Button sx={styles.resetButton} onClick={onResetAll}>
              Reset All
            </Button>
            <Button sx={styles.applyButton} onClick={onApply}>
              Apply
            </Button>
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};

export default FilterSidebar;