import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { Subscription } from "../../../redux/subscription/subscriptionTypes";
import { formatPlanPeriod } from "../../../utils/conversion";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

};

interface PlanSelectorProps {
  subscriptionDetails: Subscription[];
  selectedPlan: Subscription | null;
  handlePlanClick: (plan: Subscription) => void;
  onPlanChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlanSelector: React.FC<PlanSelectorProps> = ({
  subscriptionDetails,
  selectedPlan,
  handlePlanClick,
  onPlanChange,
}) => {
  return (
    <RadioGroup value={selectedPlan?._id || ""} onChange={onPlanChange}>
      <Box sx={styles.container}>
        {subscriptionDetails.map((plan) => (
          <Paper
            key={plan._id}
            sx={{
              borderRadius: 2,
              border:
                selectedPlan?._id === plan._id
                  ? "2px solid #1976d2"
                  : "1px solid #e0e0e0",
              cursor: "pointer",
              backgroundColor:
                selectedPlan?._id === plan._id ? "#f5f9ff" : "#ffffff",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "#1976d2",
                backgroundColor: "#f8fbff",
              },
            }}
            onClick={() => handlePlanClick(plan)}
          >
            <FormControlLabel
              value={plan._id}
              control={<Radio />}
              label={
                <Box sx={{ width: "100%", p: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "18px",
                      textTransform: "capitalize",
                      color: "#2a2a2a",
                    }}
                  >
                    {formatPlanPeriod(plan.subPeriod)} Plan
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {plan.durationInWeeks} weeks • {plan.totalSessions} total
                    sessions
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ mt: 1, color: "#1976d2", fontWeight: 600 }}
                  >
                    USD :{plan.price}
                  </Typography>
                </Box>
              }
              sx={{
                margin: 0,
                width: "100%",
                "& .MuiFormControlLabel-label": {
                  width: "100%",
                },
              }}
            />
          </Paper>
        ))}
      </Box>
    </RadioGroup>
  );
};

export default PlanSelector;
