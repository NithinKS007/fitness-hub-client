import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrainerDetailsWithSubscription } from "../../redux/user/userThunk";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  purchaseSubscription,
  isSubscribedToTheTrainer,
} from "../../redux/subscription/subscriptionThunk";
import { showErrorToast } from "../../utils/toast";
import { useStripe } from "@stripe/react-stripe-js";
import { Subscription } from "../../redux/subscription/subscriptionTypes";
import useIsUserSubscribedToTrainer from "../../hooks/useIsUserSubscribedToTrainer";
import PlanMainPage from "./components/PlanMainPage";
import { Box, Typography } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner";
import Error from "../../components/shared/Error";

const ShowPlansPage = () => {
  const stripe = useStripe();
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { trainerId } = useParams<{ trainerId: string }>();
  const { trainerDetailsWithSubscription, isLoading: isTrainerDataLoading } =
    useSelector((state: RootState) => state.user);

  const subscriptionDetails =
    trainerDetailsWithSubscription?.subscriptionDetails || [];

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  const isHeSubscribedToTheTrainer = useIsUserSubscribedToTrainer(
    trainerId as string
  );

  useEffect(() => {
    if (trainerId) {
      dispatch(getTrainerDetailsWithSubscription(trainerId));
      dispatch(isSubscribedToTheTrainer(trainerId));
      if (isHeSubscribedToTheTrainer) {
        navigate(`/trainer-details/${trainerId}`);
      }
    }
  }, [dispatch, trainerId, isHeSubscribedToTheTrainer, navigate]);

  const handlePlanClick = (plan: Subscription) => {
    setSelectedPlan(plan);
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = subscriptionDetails.find(
      (plan) => plan._id === e.target.value
    );
    if (selected) handlePlanClick(selected);
  };

  const handleSubscription = (
    event: React.SyntheticEvent<EventTarget>
  ): void => {
    event.preventDefault();

    if (selectedPlan && stripe) {
      dispatch(
        purchaseSubscription({
          subscriptionId: selectedPlan._id as string,
          stripe,
        })
      );
    } else if (!selectedPlan) {
      showErrorToast("Please select before continuing");
    }
  };

  if (isTrainerDataLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (subscriptionDetails.length === 0) {
    return (
      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ textAlign: "center", width: "100%" }}
        >
          No plans available.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ mt: 5, mb: 5 }}>
        <PlanMainPage
          subscriptionDetails={subscriptionDetails || []}
          selectedPlan={selectedPlan}
          isLoading={isLoading}
          error={error}
          handlePlanClick={handlePlanClick}
          handleSubscription={handleSubscription}
          onPlanChange={handlePlanChange}
        />
      </Box>
    </>
  );
};

export default ShowPlansPage;
