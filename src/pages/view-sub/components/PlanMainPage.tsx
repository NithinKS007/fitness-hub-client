import { Box, Typography, Paper, Divider, Container } from "@mui/material";
import React from "react";
import { Subscription } from "../../../redux/subscription/subscriptionTypes";
import { formatPlanPeriod } from "../../../utils/conversion";
import SubscriptionBenefits from "./SubBenefits";
import PlansHeader from "./PlansHeader";
import PlanDetails from "./PlanDetails";
import PlanSelector from "./PlanSelector";
import PlanSubButton from "./PlanSubButton";

interface PlanMainPageProps {
  subscriptionDetails: Subscription[];
  selectedPlan: Subscription | null;
  isLoading: boolean;
  error: string | null;
  handlePlanClick: (plan: Subscription) => void;
  handleSubscription: (event: React.SyntheticEvent<EventTarget>) => void;
  onPlanChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

const PlanMainPage: React.FC<PlanMainPageProps> = ({
  subscriptionDetails,
  selectedPlan,
  isLoading,
  handlePlanClick,
  handleSubscription,
  onPlanChange
}) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, backgroundColor: "#f8f9fa" }}>
      <PlansHeader />
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
          <>
            <PlanSelector
              handlePlanClick={handlePlanClick}
              selectedPlan={selectedPlan}
              subscriptionDetails={subscriptionDetails}
              onPlanChange={onPlanChange}
            />
          </>
          {selectedPlan && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <PlanSubButton
                isLoading={isLoading}
                handleSubscription={handleSubscription}
              />
            </Box>
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
              {selectedPlan && (
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  {`${formatPlanPeriod(selectedPlan.subPeriod)} Plan Details`}
                </Typography>
              )}
              {selectedPlan ? (
                <>
                  <PlanDetails selectedPlan={selectedPlan} />
                </>
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
            <SubscriptionBenefits />
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default PlanMainPage;
