import { Box } from "@mui/material";
import NavigationTabs from "../components/Tabs";
import { useEffect, useState } from "react";
import Reviews from "../components/Reviews";
import ViewTrainerDetailsCommon from "../components/ViewTrainerDetailsCommon";
import { useParams } from "react-router-dom";
import { getTrainerDetailsWithSubscription } from "../redux/user/userThunk";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import TrainerSpecificationLeftSide from "../components/TrainerSpecificationLeftSide";
import ShowSubscriptionPlansPage from "./ShowSubscriptionPlansPage";
import { getUserSubscriptionsData, purchaseSubscription } from "../redux/subscription/subscriptionThunk";
import { showErrorToast } from "../utils/toast";
import { useStripe } from "@stripe/react-stripe-js";
import { Subscription } from "../redux/subscription/subscriptionTypes";

const ViewTrainerDetailsUS = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);

  const [showPlans, setShowPlans] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { _id } = useParams<{ _id: string }>();
  const user = useSelector((state: RootState) => state.auth.user);

  const trainerDetails = useSelector((state: RootState) => state.user.trainerDetailsWithSubscription);
  const stripe = useStripe();
  const isPurchaseableUser = user?.role === "user";
  const isLoggedIn = user ? true :false

  const mySubscriptionPlans = useSelector((state: RootState) => state.subscription.userSubscribedTrainerPlans)

  const { isLoading, error } = useSelector( (state: RootState) => state.subscription);
  

  useEffect(() => {
    if (_id) {
      dispatch(getTrainerDetailsWithSubscription(_id));
    }

    if (user && user.role === "user") {
      dispatch(getUserSubscriptionsData());
    }
    getUserSubscriptionsData()
  }, [dispatch, _id,user]);



  const tabItems = [
    { label: "Review" },
    { label: "About Me" },
    { label: "Show Plans" },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setShowPlans(false);
  };



  const handleSeePlansClick = () => {
    setActiveTab(2);
    setShowPlans(true);
  };

 
  const isHeSubscribedToTheTrainer = mySubscriptionPlans.some((sub) =>
    trainerDetails?.subscriptionDetails.some(
      (trainerSub) => sub.trainerId === trainerSub.trainerId && sub.isActive==="active"
    )
  )

  const handlePlanClick = (plan: Subscription) => {
    setSelectedPlan(plan);
  };

  const handleSubscription = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();

    if (selectedPlan && stripe) {
      dispatch(
        purchaseSubscription({
          subscriptionId: selectedPlan._id as string,
          stripe,
        })
      )
    } else if(!selectedPlan){
      showErrorToast("Please select before continuing")
    }
  };

 
  
  

  const renderContent = () => {
    if (showPlans && !isHeSubscribedToTheTrainer) {
      return (
        <ShowSubscriptionPlansPage
          trainerSubscriptions={trainerDetails?.subscriptionDetails || []}
          isPurchaseableUser={isPurchaseableUser}
          isLoggedIn = {isLoggedIn}
          selectedPlan = {selectedPlan}
          isLoading={isLoading}
          error={error}
          handlePlanClick={handlePlanClick}
          handleSubscription={handleSubscription}

        />
      );
    } else if (isHeSubscribedToTheTrainer && showPlans) {
      return (
        <Box
          sx={{
            display: "flex",
            minHeight: "200px",
            justifyContent: "space-between",
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
              width: "50%",
              marginRight: 20,
            }}
          >
            <>You have been subscribed to the trainer enjoy the benefits of your subscription</>
          </Box>
        </Box>
      );
    }
    switch (activeTab) {
      case 0:
        return (
          <Box
            sx={{
              display: "flex",
              minHeight: "200px",
              justifyContent: "space-between",
            }}
          >
            <TrainerSpecificationLeftSide
              certifications={trainerDetails?.certifications || []}
              specializations={trainerDetails?.specializations || []}
            />
            <Reviews />
          </Box>
        );
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              minHeight: "200px",
              justifyContent: "space-between",
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
                width: "50%",
                marginRight: 20,
              }}
            >
              {trainerDetails?.aboutMe ? (
                <p>{trainerDetails.aboutMe}</p>
              ) : (
                <p>No information available.</p>
              )}
            </Box>
          </Box>
        );
      case 2:
        return trainerDetails &&
          trainerDetails?.subscriptionDetails?.length > 0 &&
          !isHeSubscribedToTheTrainer ? (
          <ShowSubscriptionPlansPage
            trainerSubscriptions={trainerDetails?.subscriptionDetails || []}
            isPurchaseableUser={isPurchaseableUser}
            isLoggedIn = {isLoggedIn}
            selectedPlan = {selectedPlan}
            isLoading={isLoading}
            error={error}
            handlePlanClick={handlePlanClick}
            handleSubscription={handleSubscription}
          />
        ) : isHeSubscribedToTheTrainer ? (
          <Box
            sx={{
              display: "flex",
              minHeight: "200px",
              justifyContent: "space-between",
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
                width: "50%",
                marginRight: 20,
              }}
            >
              <>You have been subscribed to the trainer enjoy the benefits of your subscription</>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              padding: "16px",
              width: "80%",
              margin: "0 auto",
              boxShadow: 1,
              borderRadius: 2,
            }}
          >
            <p>No Subscriptions Available</p>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "1000px" }}>
        <ViewTrainerDetailsCommon
          trainerDetails={trainerDetails}
          handleShowPlan={handleSeePlansClick}
        />
        <Box
          sx={{
            marginTop: 1,
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          <NavigationTabs
            tabItems={tabItems}
            value={activeTab}
            handleChange={handleChange}
          />
        </Box>
        {renderContent()}
      </Box>
    </>
  );
};

export default ViewTrainerDetailsUS;
