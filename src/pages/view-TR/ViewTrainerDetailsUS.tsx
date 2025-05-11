import { Box } from "@mui/material";
import { useEffect } from "react";
import TrainerProfileCard from "./TrainerProfileCard ";
import { useNavigate, useParams } from "react-router-dom";
import { getTrainerDetailsWithSubscription } from "../../redux/user/userThunk";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import TRSpecification from "./TRSpecification";
import { isSubscribedToTheTrainer } from "../../redux/subscription/subscriptionThunk";
import LoadingSpinner from "../../components/LoadingSpinner";
import useIsUserSubscribedToTrainer from "../../hooks/useIsUserSubscribedToTrainer";
import TRAboutMe from "./TRAboutMe";

const ViewTrainerDetailsUS = () => {
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

  const navigate = useNavigate();
  const isPurchaseableUser = user || trainer || admin;

  const { isLoading: isSubLoading } = useSelector(
    (state: RootState) => state.subscription
  );

  const isHeSubscribedToTheTrainer = useIsUserSubscribedToTrainer(
    trainerId as string
  );

  useEffect(() => {
    if (trainerId) {
      dispatch(getTrainerDetailsWithSubscription(trainerId));
      if (user && user.role === "user") {
        dispatch(isSubscribedToTheTrainer(trainerId));
      }
    }
  }, [dispatch, trainerId, user]);

  const handleSeePlansClick = () => {
    if (!isHeSubscribedToTheTrainer && isPurchaseableUser) {
      navigate(`/trainer-show-plans/${trainerId}`);
    }
  };

  if (isTrainerDataLoading || authPersonLoading || isSubLoading) {
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
        <TrainerProfileCard
          trainerDetails={trainerDetails}
          isSubscribed={isHeSubscribedToTheTrainer}
          handleSeePlansClick={handleSeePlansClick}
          isLoggedIn={isPurchaseableUser}
        />
        <Box
          sx={{
            marginTop: 2,
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "center",
            marginBottom: 2,
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              minHeight: "200px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TRSpecification
              certifications={trainerDetails?.certifications || []}
              specializations={trainerDetails?.specializations || []}
            />
            <TRAboutMe aboutMe={trainerDetails?.aboutMe || ""} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ViewTrainerDetailsUS;
