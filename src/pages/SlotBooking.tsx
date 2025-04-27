import React from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import useSlotBooking from "../hooks/useSlotBooking";
import { formatDateTodddMMMDYYYY } from "../utils/conversion";
import { Select, MenuItem } from "@mui/material";

const containerStyles = {
  py: 3,
  width: { xs: "100%", md: "79%" },
};

const paperStyles = {
  p: 2,
  borderRadius: "8px",
  elevation: 3,
};

const mainBoxStyles = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  gap: 3,
  width: "100%",
};

const calendarBoxStyles = {
  flex: { xs: "100%", md: "50%" },
};

const selectorBoxStyles = {
  flex: { xs: "100%", md: "50%" },
  marginTop: { xs: 2, md: 2 },
};

const summaryStyles = {
  mt: 3,
};

const summaryTitleStyles = {
  fontWeight: "bold",
  mb: 1,
};

const bookButtonStyles = {
  mt: 10,
  width: "100%",
  backgroundColor: "#1f2937",
  height: "50px",
  color: "white",
  "&:disabled": {
    backgroundColor: "#d3d3d3",
    color: "#a1a1a1",
  },
  "&:hover": {
    backgroundColor: "#374151",
  },

  "&.MuiButton-root": {
    textTransform: "none",
  },
};
const messageBox = {
  width: "100%",
  padding: { xs: "0.75rem", sm: "1rem" },
  border: "1px solid #d1d5db",
  borderRadius: "0.5rem",
  textAlign: "center",
  color: "#4b5563",
  backgroundColor: "#f9fafb",
  fontFamily: "sans-serif",
  fontSize: { xs: "0.875rem", sm: "1rem" },
};
const wrapper = {
  width: "100%",
  fontFamily: "sans-serif",
};
const selectBox = {
  width: "100%",
  padding: { xs: "0.5rem 0.75rem", sm: "0.75rem 1rem" },
  borderRadius: "0.5rem",
  border: "1px solid #d1d5db",
  fontSize: { xs: "0.875rem", sm: "1rem" },
  backgroundColor: "#f3f4f6",
  color: "#1f2937",
  cursor: "pointer",
};

const SlotBooking: React.FC = () => {
  const {
    selectedSlotId,
    selectedSlot,
    handleDateChange,
    shouldDisableDate,
    getFilteredTimeSlots,
    handleTimeChange,
    handleBooking,
  } = useSlotBooking();

  const renderCalendar = () => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={dayjs(selectedSlot?.date)}
        onChange={handleDateChange}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );

  const renderTimeSelector = () => {
    const filteredSlots = getFilteredTimeSlots();

    if (!selectedSlot) {
      return <Box sx={messageBox}>Please Select a Slot</Box>;
    }

    return (
      <Box sx={wrapper}>
        <Select
          value={selectedSlot?.time || ""}
          onChange={(e) => handleTimeChange(e.target.value)}
          sx={selectBox}
        >
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <MenuItem key={slot._id} value={slot.time}>
                {slot.time}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No available time slots</MenuItem>
          )}
        </Select>
      </Box>
    );
  };

  const renderSummary = () => (
    <Box sx={summaryStyles}>
      <Typography variant="subtitle1" sx={summaryTitleStyles}>
        Summary
      </Typography>
      <Typography>
        <strong>Date : </strong>
        {formatDateTodddMMMDYYYY(selectedSlot?.date as Date)}
        <strong> Time : </strong>
        {selectedSlot?.time ? selectedSlot?.time : "N/A"}
      </Typography>
      <Button
        onClick={handleBooking}
        sx={bookButtonStyles}
        disabled={!selectedSlotId}
      >
        Book Now
      </Button>
    </Box>
  );

  return (
    <Container sx={containerStyles}>
      <Paper sx={paperStyles}>
        <Box sx={mainBoxStyles}>
          <Box sx={calendarBoxStyles}>{renderCalendar()}</Box>
          <Box sx={selectorBoxStyles}>
            {renderTimeSelector()}
            {renderSummary()}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SlotBooking;
