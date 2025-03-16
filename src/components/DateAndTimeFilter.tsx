import React, { useState } from 'react';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  SelectChangeEvent 
} from '@mui/material';

const DateAndTimeFilter = () => {
  const [fromDate, setFromDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const Time = [
    "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM",
    "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM",
    "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM",
    "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM",
    "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
  ] as const;

  type TimeOption = typeof Time[number];

  const componentWidth = 180;

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = e.target.value;
    setFromDate(newFromDate);
    if (newFromDate > toDate) {
      setToDate(newFromDate);
    }
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = e.target.value;
    if (newToDate >= fromDate) {
      setToDate(newToDate);
    }
  };

  const handleTimeChange = (e: SelectChangeEvent<string>) => {
    setSelectedTime(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box>
        <FormControl size="small" sx={{ width: componentWidth }}>
          <TextField
            size="small"
            label="From Date"
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                inputProps: {
                  min: new Date().toISOString().split("T")[0],
                },
              },
            }}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl size="small" sx={{ width: componentWidth }}>
          <TextField
            size="small"
            label="To Date"
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                inputProps: {
                  min: fromDate,
                },
              },
            }}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl size="small" sx={{ width: componentWidth }}>
          <InputLabel>Time</InputLabel>
          <Select
            label="Time"
            value={selectedTime}
            onChange={handleTimeChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  border: "1px solid",
                  borderColor: "grey.400",
                  borderRadius: 2,
                  mt: 1,
                  boxShadow:"none",
                  maxHeight: 300,
                },
              },
            }}
          >
            <MenuItem value="">
              <em>All Times</em>
            </MenuItem>
            {Time.map((time, index) => (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default DateAndTimeFilter;