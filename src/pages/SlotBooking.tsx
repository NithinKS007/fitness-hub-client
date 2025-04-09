import React from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import useSlotBooking from "../hooks/useSlotBooking";
import { formatDateTodddMMMDYYYY } from "../utils/conversion";

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
      return (
        <div
          className="w-full p-4 border
         border-gray-300 rounded-lg 
         text-center text-gray-700
         bg-gray-50"
        >
          Please Select a Slot
        </div>
      );
    }

    return (
      <div className="relative w-full font-sans">
        <select
          value={selectedSlot?.time || ""}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="w-full py-3 px-4 
          rounded-lg border
           border-gray-300 
           text-base bg-gray-100
            text-gray-800 cursor-pointer 
            appearance-none"
        >
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <option key={slot._id} value={slot.time}>
                {slot.time}
              </option>
            ))
          ) : (
            <option disabled>No available time slots</option>
          )}
        </select>
      </div>
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
        variant="contained"
        color="primary"
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
