import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Divider,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Subscription } from "../redux/subscription/subscriptionTypes";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface ShowSubscriptionPlansPageProps {
  trainerSubscriptions: Subscription[];
  isPurchaseableUser: boolean;
  selectedPlan: Subscription | null;
  isLoading: boolean;
  error: string | null;
  handlePlanClick: (plan: Subscription) => void;
  handleSubscription: (event: React.SyntheticEvent<EventTarget>) => void;
}

const ShowSubscriptionPlansPage: React.FC<ShowSubscriptionPlansPageProps> = ({
  trainerSubscriptions,
  isPurchaseableUser,
  selectedPlan,
  isLoading,
  error,
  handlePlanClick,
  handleSubscription,
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, backgroundColor: "#f8f9fa" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}
      >
        Choose Your Transformation Package
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 5, textAlign: "center" }}
      >
        Select a plan that fits your fitness goals and start your journey today
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "40%" } }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
            Available Plans
          </Typography>

          <RadioGroup
            value={selectedPlan?._id || ""}
            onChange={(e) => {
              const selected = trainerSubscriptions.find(
                (plan) => plan._id === e.target.value
              );
              if (selected) handlePlanClick(selected);
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {trainerSubscriptions.map((plan) => (
                <Paper
                  key={plan._id}
                  sx={{
                    borderRadius: 2,
                    border:
                      selectedPlan?._id === plan._id
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                    cursor: isPurchaseableUser ? "pointer" : "not-allowed",
                    backgroundColor:
                      selectedPlan?._id === plan._id ? "#f5f9ff" : "#ffffff",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      borderColor: "#1976d2",
                      backgroundColor: "#f8fbff",
                    },
                  }}
                  onClick={() => isPurchaseableUser && handlePlanClick(plan)}
                >
                  <FormControlLabel
                    value={plan._id}
                    control={<Radio disabled={!isPurchaseableUser} />}
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
                          {plan.subPeriod.charAt(0).toUpperCase() +
                            plan.subPeriod.slice(1)}{" "}
                          Plan
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {plan.durationInWeeks} weeks • {plan.totalSessions}{" "}
                          total sessions
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

          {selectedPlan && isPurchaseableUser && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  maxWidth: "300px",
                }}
                onClick={handleSubscription}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Subscribe Now"}
              </Button>
            </Box>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </Box>
        <Box sx={{ width: { xs: "100%", md: "60%" } }}>
          <Paper
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #e0e0e0",
              height: "100%",
            }}
          >
            <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                {selectedPlan
                  ? ` ${selectedPlan.subPeriod.charAt(0).toUpperCase() + selectedPlan.subPeriod.slice(1)} Plan Details`
                  : "Plan Details"}
              </Typography>

              {selectedPlan ? (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Price
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      USD :{selectedPlan.price}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Duration
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedPlan.durationInWeeks} weeks
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Sessions per week
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedPlan.sessionsPerWeek}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Total sessions
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedPlan.totalSessions}
                    </Typography>
                  </Box>

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
                      Please note that this package is not covered under our
                      refund policy
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ color: "#757575", fontStyle: "italic", p: 2 }}
                >
                  Select a plan on the left to view its details
                </Typography>
              )}
            </Box>

            <Divider />

            <Box sx={{ p: 4, bgcolor: "#fafafa" }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                What happens after you subscribe
              </Typography>

              <List sx={{ p: 0 }}>
                {[
                  "Access to exclusive fitness content from your coach with ability to like and comment",
                  "Book personalized time slots for workout schedule and diet plan discussions",
                  "24/7 chat access to your fitness coach for continuous support",
                  "Live virtual meetings with top fitness experts to address your questions and concerns",
                ].map((step, index) => (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    sx={{ px: 0, py: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ShowSubscriptionPlansPage;
