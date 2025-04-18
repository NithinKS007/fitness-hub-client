import { Box } from "@mui/material";
import NavigationTabs from "../components/Tabs";
import { useEffect, useState } from "react";
import ViewTrainerDetailsCommon from "../components/ViewTrainerDetailsCommon";
import { useParams } from "react-router-dom";
import { getTrainerDetailsWithSubscription } from "../redux/user/userThunk";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import TrainerSpecificationLeftSide from "../components/TrainerSpecificationLeftSide";
import ShowSubscriptionPlansPage from "./ShowSubscriptionPlansPage";
import {
  purchaseSubscription,
  isSubscribedToTheTrainer,
} from "../redux/subscription/subscriptionThunk";
import { showErrorToast } from "../utils/toast";
import { useStripe } from "@stripe/react-stripe-js";
import { Subscription } from "../redux/subscription/subscriptionTypes";
import SlotBooking from "./SlotBooking";
import { fetchTrainerSlots } from "../redux/booking/bookingThunk";
import LoadingSpinner from "../components/LoadingSpinner";
import useIsUserSubscribedToTrainer from "../hooks/useIsUserSubscribedToTrainer";

const tabItems = [
  { label: "About Me" },
  { label: "Show Plans" },
  { label: "Book a slot" },
];

const ViewTrainerDetailsUS = () => {
  const stripe = useStripe();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { trainerId } = useParams<{ trainerId: string }>();
  const {
    user,
    trainer,
    admin,
    isLoading: authPersonLoading,
  } = useSelector((state: RootState) => state.auth);
  const {
    trainerDetailsWithSubscription: trainerDetails,
    isLoading: isTrainerDataLoading,
  } = useSelector((state: RootState) => state.user);

  const isPurchaseableUser = user?.role === "user";
  const isUserLoggedIn = user || trainer || admin;

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  const isHeSubscribedToTheTrainer = useIsUserSubscribedToTrainer(trainerId as string)

  useEffect(() => {
    if (trainerId) {
      dispatch(getTrainerDetailsWithSubscription(trainerId));
      if (user && user.role === "user") {
        dispatch(isSubscribedToTheTrainer(trainerId));
      }
      if (activeTab === 2) {
        dispatch(fetchTrainerSlots({ trainerId: trainerId }));
      }
    }
  }, [dispatch, trainerId, user, activeTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("event", event);
    setActiveTab(newValue);
  };

  const handlePlanClick = (plan: Subscription) => {
    setSelectedPlan(plan);
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderAboutMeTab();
      case 1:
        return renderSubscriptionPlansTab();
      case 2:
        return renderSlotBookingTab();
      default:
        return null;
    }
  };

  const renderAboutMeTab = () => {
    if (isTrainerDataLoading) {
      return <LoadingSpinner />;
    }
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "200px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TrainerSpecificationLeftSide
          certifications={trainerDetails?.certifications || []}
          specializations={trainerDetails?.specializations || []}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 1,
            borderRadius: 2,
            padding: "16px",
            width: { xs: "100%", md: "50%" },
            marginRight: { xs: 0, md: 20 },
            marginTop: { xs: 2, md: 0 },
          }}
        >
          <p>{trainerDetails?.aboutMe || "No information available."}</p>
        </Box>
      </Box>
    );
  };

  const renderSubscriptionPlansTab = () => {
    if (isTrainerDataLoading || isLoading) {
      return (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "450px",
          }}
        >
          <LoadingSpinner />;
        </Box>
      );
    }
    return trainerDetails &&
      trainerDetails?.subscriptionDetails?.length > 0 &&
      isPurchaseableUser &&
      !isHeSubscribedToTheTrainer ? (
      <ShowSubscriptionPlansPage
        trainerSubscriptions={trainerDetails?.subscriptionDetails || []}
        isPurchaseableUser={isPurchaseableUser}
        selectedPlan={selectedPlan!!}
        isLoading={isLoading}
        error={error}
        handlePlanClick={handlePlanClick}
        handleSubscription={handleSubscription}
      />
    ) : trainerDetails &&
      trainerDetails?.subscriptionDetails?.length > 0 &&
      isPurchaseableUser &&
      isHeSubscribedToTheTrainer ? (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "200px",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TrainerSpecificationLeftSide
          certifications={trainerDetails?.certifications || []}
          specializations={trainerDetails?.specializations || []}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 1,
            borderRadius: 2,
            padding: "16px",
            width: { xs: "100%", md: "50%" },
            marginRight: { xs: 0, md: 20 },
            marginTop: { xs: 2, md: 0 },
          }}
        >
          <>
            You have been subscribed to the trainer enjoy the benefits of your
            subscription
          </>
        </Box>
      </Box>
    ) : trainerDetails &&
      trainerDetails?.subscriptionDetails?.length > 0 &&
      !isPurchaseableUser &&
      isUserLoggedIn?.role === "user" ? (
      <Box
        sx={{
          padding: "16px",
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        Please login to purchase subscription
      </Box>
    ) : (
      <Box
        sx={{
          padding: "16px",
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        Subscription Plan Currently Unavailable
      </Box>
    );
  };

  const renderSlotBookingTab = () => {
    if (isTrainerDataLoading||isLoading) {
      return (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxHeight: "450px",
          }}
        >
          <LoadingSpinner />
        </Box>
      );
    }

    return isHeSubscribedToTheTrainer &&
      isPurchaseableUser &&
      isUserLoggedIn?.role === "user" ? (
      <SlotBooking />
    ) : !isUserLoggedIn ? (
      <Box
        sx={{
          padding: "16px",
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <p>Please log in to book slots</p>
      </Box>
    ) : !isPurchaseableUser ? (
      <Box
        sx={{
          padding: "16px",
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        Slot booking currently unavailable
      </Box>
    ) : (
      <Box
        sx={{
          padding: "16px",
          width: { xs: "100%", md: "80%" },
          margin: "0 auto",
          boxShadow: 1,
          borderRadius: 2,
        }}
      >
        <p>Please subscribe to book slots with a trainer</p>
      </Box>
    );
  };



  if (authPersonLoading || isTrainerDataLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingSpinner />;
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ minHeight: "600px", marginBottom: "20px", width: "100%" }}>
        <ViewTrainerDetailsCommon trainerDetails={trainerDetails} />
        <Box
          sx={{
            marginTop: 1,
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
            width: "100%",
            paddingX: { xs: 1, md: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "auto" },
              maxWidth: "100%",
            }}
          >
            <NavigationTabs
              tabItems={tabItems}
              value={activeTab as number}
              handleChange={handleChange}
            />
          </Box>
        </Box>
        {renderTabContent()}
      </Box>
    </>
  );
};

export default ViewTrainerDetailsUS;
