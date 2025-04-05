import React from "react";
import {
  Box,
  FormControl,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Dayjs } from "dayjs";

interface DateFilterProps {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  onFromDateChange: (date: Dayjs | null) => void;
  onToDateChange: (date: Dayjs | null) => void;
  onReset: () => void;
}
const DateFilter: React.FC<DateFilterProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onReset,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <FormControl size="small">
          <MobileDatePicker
            label="From Date"
            orientation="landscape"
            value={fromDate}
            onAccept={onFromDateChange}
            slots={{
              textField: TextField,
            }}
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
                sx: { width: "12rem" },
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon sx={{ fontSize: "large" }} />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </FormControl>

        <FormControl size="small">
          <MobileDatePicker
            label="To Date"
            orientation="landscape"
            slots={{
              textField: TextField,
            }}
            value={toDate}
            onAccept={onToDateChange}
            slotProps={{
              textField: {
                size: "small",
                variant: "outlined",
                sx: { width: "12rem" },
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon sx={{ fontSize: "large" }} />
                    </InputAdornment>
                  ),
                },
              },
            }}
          />
        </FormControl>
        <Button
          variant="outlined"
          size="small"
          sx={{
            minWidth: "auto",
            padding: "7px",
            bgcolor: "white",
            color: "gray",
            border: "1px solid",
            borderColor: "gray.50",
          }}
          onClick={onReset}
        >
          <RefreshIcon />
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DateFilter;
