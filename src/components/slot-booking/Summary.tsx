import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { formatDateTodddMMMDYYYY } from "../../utils/conversion";

interface SummaryProps {
  selectedSlot: { date: Date; time: string } | undefined;
  handleBooking: () => Promise<void>;
  selectedSlotId: string;
}

const Summary: React.FC<SummaryProps> = ({
  selectedSlot,
  handleBooking,
  selectedSlotId,
}) => {
  const details = [
    {
      label: "Date",
      value: selectedSlot ? formatDateTodddMMMDYYYY(selectedSlot.date) : "N/A",
    },
    { label: "Time", value: selectedSlot?.time || "N/A" },
  ];

  return (
    <Box sx={{ mt: 3, width: "100%" }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Summary
      </Typography>
      {details.map((detail, index) => (
        <Typography key={index}>
          <strong>{detail.label} : </strong>
          {detail.value}
        </Typography>
      ))}
      <Button
        onClick={handleBooking}
        sx={{
          mt: 10,
          width: "100%",
          backgroundColor: "#1f2937",
          height: "50px",
          color: "white",
          "&:disabled": { backgroundColor: "#d3d3d3", color: "#a1a1a1" },
          "&:hover": { backgroundColor: "#374151" },
        }}
        disabled={!selectedSlotId}
      >
        Book Now
      </Button>
    </Box>
  );
};

export default Summary;
