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
import {
  purchaseSubscription,
  isSubscribedToTheTrainer,
} from "../redux/subscription/subscriptionThunk";
import { showErrorToast } from "../utils/toast";
import { useStripe } from "@stripe/react-stripe-js";
import { Subscription } from "../redux/subscription/subscriptionTypes";
import ShowTrainerPlayLists from "./ShowTrainerPlayLists";
// import TrainerVideosGrid from "./TrainerVideosGrid";
// import VideoPlayerPage from "./VideoPlayerPage";
import SlotBooking from "./SlotBooking";
import { fetchAvailableOfTrainerForUser } from "../redux/booking/bookingThunk";

const ViewTrainerDetailsUS = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);

  const [showPlans, setShowPlans] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { _id } = useParams<{ _id: string }>();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const trainer = useSelector((state: RootState) => state?.auth?.trainer);
  const admin = useSelector((state: RootState) => state?.auth?.admin);

  const trainerDetails = useSelector(
    (state: RootState) => state.user.trainerDetailsWithSubscription
  );
  const stripe = useStripe();
  const isPurchaseableUser = user?.role === "user";
  const isLoggedIn = user || trainer || admin ? true : false;

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  let isHeSubscribedToTheTrainer: boolean = false;

  useEffect(() => {
    if (_id) {
      dispatch(getTrainerDetailsWithSubscription(_id));

    if (user && user.role === "user") {
        dispatch(isSubscribedToTheTrainer(_id));
      }
    if(activeTab===4&&user && user.role === "user"){
        dispatch(fetchAvailableOfTrainerForUser({trainerId:_id}))
      }
    }
  }, [dispatch, _id, user,activeTab])

  if (_id) {
    isHeSubscribedToTheTrainer = useSelector(
      (state: RootState) =>
        state.subscription.isSubscribedToTheTrainer?.[_id].isSubscribed || false
    );
  }

  console.log("is he subscribed to the trainer", isHeSubscribedToTheTrainer);

  const tabItems = [
    { label: "Review" },
    { label: "About Me" },
    { label: "Show Plans" },
    { label: "Videos" },
    { label: "Book a slot"}
        // { label: "vid"},
    // { label: "player"},
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setShowPlans(false);
  };

  const handleSeePlansClick = () => {
    setActiveTab(2);
    setShowPlans(true);
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

  const availableSlotsOfTrainer = useSelector((state:RootState)=>state.bookingSlot.slots)
  
  const renderContent = () => {
    if (showPlans && !isHeSubscribedToTheTrainer) {
      return (
        <ShowSubscriptionPlansPage
          trainerSubscriptions={trainerDetails?.subscriptionDetails || []}
          isPurchaseableUser={isPurchaseableUser}
          isLoggedIn={isLoggedIn}
          selectedPlan={selectedPlan}
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
      );
    }
    switch (activeTab) {
      case 0:
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
            <Reviews />
          </Box>
        );
      case 1:
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
            isLoggedIn={isLoggedIn}
            selectedPlan={selectedPlan}
            isLoading={isLoading}
            error={error}
            handlePlanClick={handlePlanClick}
            handleSubscription={handleSubscription}
          />
        ) : isHeSubscribedToTheTrainer ? (
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
                You have been subscribed to the trainer enjoy the benefits of
                your subscription
              </>
            </Box>
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
            <p>No Subscriptions Available</p>
          </Box>
        );

      case 3 :
        return (
          <ShowTrainerPlayLists/>
        )
        case 4 :
          return (
            isHeSubscribedToTheTrainer && isPurchaseableUser && isLoggedIn ? (
              <SlotBooking availableSlots={availableSlotsOfTrainer}/>
            ) : !isLoggedIn ? (
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
              Trainer Cannot book subscriptions
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
            )
          );
          
        
          
        //   case 5 :
        //     return (
        //       <VideoPlayerPage/>
        //     )
        //     case 6 :
        //       return (
        //
        // <TrainerVideosGrid/>
        //       )
      default:
        return null;
    }
  };
  return (
    <>
      <Box sx={{ minHeight: "1000px",width: "100%", }}>
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
              value={activeTab}
              handleChange={handleChange}
            />
          </Box>
        </Box>
        {renderContent()}
      </Box>
    </>
  );
};

export default ViewTrainerDetailsUS;
