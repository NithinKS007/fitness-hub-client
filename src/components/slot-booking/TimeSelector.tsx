import React from "react";
import { Select, MenuItem, Box } from "@mui/material";

interface TimeSelectorProps {
  selectedSlotTime: string | undefined;
  handleTimeChange: (newTime: string) => void;
  filteredSlots: { _id: string; time: string }[];
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  selectedSlotTime,
  handleTimeChange,
  filteredSlots,
}) => (
  <Box
    sx={{
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid #d1d5db",
      backgroundColor: "#f3f4f6",
    }}
  >
    <Select
      value={selectedSlotTime ||"Please Select a time Slot"}
      onChange={(e) => handleTimeChange(e.target.value)}
      sx={{ width: "100%" }}
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

export default TimeSelector;
