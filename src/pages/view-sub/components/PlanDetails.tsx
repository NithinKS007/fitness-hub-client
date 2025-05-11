import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { Subscription } from "../../../redux/subscription/subscriptionTypes";

interface PlanDetailsProps {
  selectedPlan: Subscription | null;
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ selectedPlan }) => {
  const planDetails = [
    { label: "Price", value: `USD :${selectedPlan?.price}` },
    { label: "Duration", value: `${selectedPlan?.durationInWeeks} weeks` },
    { label: "Sessions per week", value: selectedPlan?.sessionsPerWeek },
    { label: "Total sessions", value: selectedPlan?.totalSessions },
  ];

  return (
    <>
      {planDetails.map((detail, index) => (
        <React.Fragment key={detail.label}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {detail.label}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {detail.value}
            </Typography>
          </Box>
          {index < planDetails.length - 1 && <Divider sx={{ my: 2 }} />}
        </React.Fragment>
      ))}
      <Box
        sx={{
          mt: 3,
          p: 2,
          bgcolor: "#f5f9ff",
          borderRadius: 1,
          border: "1px solid #e6f0ff",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Please note that this package is not covered under our refund policy
        </Typography>
      </Box>
    </>
  );
};

export default PlanDetails;
