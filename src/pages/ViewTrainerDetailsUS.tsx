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
import SlotBooking from "./SlotBooking";
import { fetchTrainerSlots } from "../redux/booking/bookingThunk";
import { getPlayListsAvailableByTrainerId } from "../redux/content/contentThunk";

const tabItems = [
  { label: "Review" },
  { label: "About Me" },
  { label: "Show Plans" },
  { label: "Video Playlist" },
  { label: "Book a slot" },
] as const;

const ViewTrainerDetailsUS = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<Subscription | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { _id } = useParams<{ _id: string }>();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const trainer = useSelector((state: RootState) => state?.auth?.trainer);
  const admin = useSelector((state: RootState) => state?.auth?.admin);
  const trainerDetails = useSelector((state: RootState) => state.user.trainerDetailsWithSubscription)
  const availableSlotsOfTrainer = useSelector((state: RootState) => state.bookingSlot.slots);
  const playListsData = useSelector((state: RootState) => state.content.playLists);

  const stripe = useStripe();

  const isPurchaseableUser = user?.role === "user";
  const isLoggedIn = user || trainer || admin ? true : false;

  const { isLoading, error } = useSelector((state: RootState) => state.subscription);

  // let isHeSubscribedToTheTrainer: boolean = false;

  useEffect(() => {
    if (_id) {
      dispatch(getTrainerDetailsWithSubscription(_id));

      if (user && user.role === "user") {
        dispatch(isSubscribedToTheTrainer(_id));
      }
      if (activeTab === 4) {
        dispatch(fetchTrainerSlots({ trainerId: _id }));
      }

      if (activeTab === 3) {
        dispatch(getPlayListsAvailableByTrainerId({ trainerId: _id }));
      }
    }
  }, [dispatch, _id, user, activeTab]);

  const isHeSubscribedToTheTrainer = useSelector((state: RootState) =>
    state.subscription.isSubscribedToTheTrainer?.[_id as string ]?.isSubscribed ?? false
  );
  

  console.log("is he subscribed to the trainer", isHeSubscribedToTheTrainer);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePlanClick = (plan: Subscription) => {
    setSelectedPlan(plan);
  };

  const handleSubscription = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();

    if (selectedPlan && stripe) {
      dispatch(purchaseSubscription({subscriptionId: selectedPlan._id as string,stripe}));
    } else if (!selectedPlan) {
      showErrorToast("Please select before continuing");
    }
  };



  const fetchedPlayListsData =
    playListsData && playListsData.length > 0
      ? playListsData.map((list) => {
          return {
            ...list,
            title: list.title,
            videoCount: list?.videoCount ? list.videoCount : 0,
          };
        })
      : [];

  const renderContent = () => {
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
          isPurchaseableUser &&
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
            Subscription Purchase Currently Unavailable
          </Box>
        );

      case 3:
        return isHeSubscribedToTheTrainer &&
          isPurchaseableUser &&
          isLoggedIn ? (
          <ShowTrainerPlayLists playListsData={fetchedPlayListsData} />
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
            <p>Please log in to watch vidoes </p>
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
            <p>Video playlist currently unavailable</p>
          </Box>
        );
      case 4:
        return isHeSubscribedToTheTrainer &&
          isPurchaseableUser &&
          isLoggedIn ? (
          <SlotBooking availableSlots={availableSlotsOfTrainer} />
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
      default:
        return null;
    }
  };
  return (
    <>
      <Box sx={{ minHeight: "auto", marginBottom: "20px", width: "100%" }}>
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
