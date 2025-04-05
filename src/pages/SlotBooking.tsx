import React from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import useSlotBooking from "../hooks/useSlotBooking";
import { formatDateTodddMMMDYYYY } from "../utils/conversion";

const SlotBooking: React.FC = () => {
  const {
    selectedSlotId,
    selectedSlot,
    handleDateChange,
    shouldDisableDate,
    getFilteredTimeSlots,
    handleTimeChange,
    handleBooking,
  } = useSlotBooking()
 
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
        <div className="w-full p-4 border
         border-gray-300 rounded-lg text-center
          text-gray-700 bg-gray-50">
          Please Select a Slot
        </div>
      );
    }

    return (
      <div className="relative w-full font-sans">
        <select
          value={selectedSlot?.time || ""}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="w-full py-3 px-4 rounded-lg border
           border-gray-300 text-base bg-gray-100
            text-gray-800 cursor-pointer appearance-none"
        >
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <option key={slot._id} value={slot.time}>
                {slot.time}
              </option>
            ))
          ) : (
            <option disabled>
              No available time slots
            </option>
          )}
        </select>
      </div>
    );
  };

  const renderSummary = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Summary
      </Typography>
      <Typography>
        <strong>Date : </strong>
        {formatDateTodddMMMDYYYY(selectedSlot?.date as Date)}
        <strong> Time : </strong>
        {selectedSlot?.time ? selectedSlot?.time :"N/A"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBooking}
        sx={{ mt: 10, width: "100%" }}
        disabled={!selectedSlotId}
      >
        Book Now
      </Button>
    </Box>
  );

  return (
    <Container  sx={{ py: 3,  width: { xs: "100%", md: "79%" },}}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: "8px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            width: "100%"
          }}
        >
          <Box
            sx={{
              flex: { xs: "100%", md: "50%" },
            }}
          >
            {renderCalendar()}
          </Box>
          <Box
            sx={{
              flex: { xs: "100%", md: "50%" },
              marginTop: { xs: 2, md: 2 },
            }}
          >
            {renderTimeSelector()}
            {renderSummary()}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SlotBooking;
