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
  Slide,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const filters = [
  {
    label: "Coach Name",
    type: "autocomplete",
    options: ["John Doe", "Jane Smith", "Alex Johnson"],
  },
  {
    label: "Specialization",
    type: "autocomplete",
    options: [
      "Yoga",
      "Pilates",
      "Strength Training",
      "Cardio",
      "Nutrition Coaching",
    ],
  },
  {
    label: "Year of Experience",
    type: "checkbox",
    options: ["Less than 1", "1-3", "3-5", " Greateer than 5"],
  },
  {
    label: "Experience Level",
    type: "checkbox",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    label: "Price Range",
    type: "checkbox",
    options: ["Less than 15000", "15000-30000", "30000-50000", " Greateer than 100000"],
  },
  {
    label: "Availability",
    type: "autocomplete",
    options: ["Morning", "Afternoon", "Evening", "Weekend"],
  },
  {
    label: "Rating",
    type: "checkbox",
    options: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
  },
];

const FilterSidebar: React.FC<{ open: boolean }> = ({ open }) => {
  const [openFilters, setOpenFilters] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [filterValues, setFilterValues] = React.useState<{
    [key: string]: any;
  }>({});

  const handleToggleFilter = (filterLabel: string) => {
    setOpenFilters((prevOpenFilters) => ({
      ...prevOpenFilters,
      [filterLabel]: !prevOpenFilters[filterLabel],
    }));
  };

  const handleAutocompleteChange = (
    event: any,
    value: any,
    filterLabel: string
  ) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [filterLabel]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [event.target.name]: event.target.checked
        ? [...(prevFilterValues[event.target.name] || []), event.target.value]
        : prevFilterValues[event.target.name].filter(
            (value: string) => value !== event.target.value
          ),
    }));
  };

  const handleResetAll = () => {
    setOpenFilters({});
    setFilterValues({});
  };

  return (
    <Slide direction="right" in={open} mountOnEnter unmountOnExit>
      <Box sx={{ width: 400, p: 3, bgcolor: "#FAFAFA" }}>
        <List sx={{ padding: 0 }}>
          {filters.map((filter, index) => (
            <>
              <ListItem
                onClick={() => handleToggleFilter(filter.label)}
                key={filter.label}
              >
                <ListItemText primary={filter.label} />
                {openFilters[filter.label] ? <Remove /> : <Add />}
              </ListItem>
              <Collapse
                in={openFilters[filter.label]}
                timeout="auto"
                unmountOnExit
              >
                <Box sx={{ p: 2 }}>
                  {filter.type === "autocomplete" && (
                    <Autocomplete
                      options={filter.options}
                      value={filterValues[filter.label] || ""}
                      onChange={(event, newValue) =>
                        handleAutocompleteChange(event, newValue, filter.label)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={filter.label}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  )}
                  {filter.type === "checkbox" && (
                    <Box>
                      {filter.options.map((option) => (
                        <FormControlLabel
                          sx={{ display: "flex", flexDirection: "row" }}
                          key={option}
                          control={
                            <Checkbox
                              checked={
                                filterValues[filter.label]?.includes(option) ||
                                false
                              }
                              onChange={handleCheckboxChange}
                              value={option}
                              name={filter.label}
                            />
                          }
                          label={option}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Collapse>
              {index < filters.length - 1 && <Divider />}
            </>
          ))}
          <Button variant="text" color="primary" onClick={handleResetAll}>
            Reset All
          </Button>
        </List>
      </Box>
    </Slide>
  );
};

export default FilterSidebar;
