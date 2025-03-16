import React, { useState } from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { bookingSlots } from "../redux/booking/bookingTypes";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { bookSlot } from "../redux/booking/bookingThunk";
import { AppDispatch } from "../redux/store";
import { showErrorToast, showSuccessToast } from "../utils/toast";

interface SlotBookingProps {
  availableSlots: bookingSlots[];
}

const SlotBooking: React.FC<SlotBookingProps> = ({ availableSlots }) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  const selectedSlot = availableSlots.find(
    (slot) => slot._id === selectedSlotId
  );
  const availableDates = availableSlots.map((slot) =>
    dayjs(slot.date).format("YYYY-MM-DD")
  );

  const handleDateChange = (newDate: Dayjs) => {
    if (!newDate) return;
    const formattedDate = newDate.format("YYYY-MM-DD");
    const matchingSlot = availableSlots.find(
      (slot) => dayjs(slot.date).format("YYYY-MM-DD") === formattedDate
    );
    if (matchingSlot) {
      setSelectedSlotId(matchingSlot._id);
    }
  };

  const shouldDisableDate = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    return !availableDates.includes(formattedDate);
  };

  const getFilteredTimeSlots = () => {
    return availableSlots.filter(
      (slot) =>
        dayjs(slot.date).format("YYYY-MM-DD") ===
        dayjs(selectedSlot?.date).format("YYYY-MM-DD")
    );
  }

  const handleTimeChange = (newTime: string) => {
    const matchingSlot = availableSlots.find(
      (slot) =>
        slot.time === newTime &&
        dayjs(slot.date).format("YYYY-MM-DD") ===
          dayjs(selectedSlot?.date).format("YYYY-MM-DD")
    );
    if (matchingSlot) {
      setSelectedSlotId(matchingSlot._id);
    }
  };
  const dispatch = useDispatch<AppDispatch>();
  const handleBooking = async () => {

    try {
      const response = await dispatch(
        bookSlot({ slotId: selectedSlotId })
      ).unwrap();
      console.log("response for booking slot",response)
      showSuccessToast(`${response.message}`);
    } catch (error) {
      console.log(`API Error ${error}`);
      showErrorToast(`${error}`);
    }

  };

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
            <option value="" disabled>
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
        <strong>Date :</strong>
        {dayjs(selectedSlot?.date).format("ddd, MMM D, YYYY")}
        <strong> Time :{selectedSlot?.time}</strong>
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
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: "8px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
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
