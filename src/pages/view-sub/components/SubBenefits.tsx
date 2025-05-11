import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SubscriptionBenefits: React.FC = () => {
  const benefits = [
    "Access to exclusive fitness content from your coach",
    "Book personalized time slots for workout schedule and diet plan discussions",
    "24/7 chat access to your fitness coach for continuous support",
    "Live virtual meetings with top fitness experts to address your questions and concerns",
  ];

  return (
    <Box sx={{ p: 4, bgcolor: "#fafafa" }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
        What happens after you subscribe
      </Typography>

      <List sx={{ p: 0 }}>
        {benefits.map((step, index) => (
          <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={step} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SubscriptionBenefits;
