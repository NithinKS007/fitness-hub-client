import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { getSubscribedDetails } from "../../redux/subscription/subscriptionThunk";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import OnFailurePage from "./SubFailurePage";
import Message from "../../components/shared/Message";
import { CheckCircleOutline } from "@mui/icons-material";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
    padding: { xs: "16px", sm: "32px" },
  },
  icon: {
    fontSize: { xs: "48px", sm: "64px" },
    color: "#14b8a6",
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const SubSuccessPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("sessionId");
    if (sessionId) {
      dispatch(getSubscribedDetails({ sessionId }));
    } else {
      navigate("/");
    }
  }, [location, dispatch, navigate]);

  if (isLoading)
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
  if (error) return <OnFailurePage message={error} />;

  return (
    <Box sx={styles.container}>
      <motion.div variants={cardVariants} initial="initial" animate="animate">
        <Message
          heading="Subscription Success!"
          bodyText="Your payment was processed successfully. 
          Welcome to our fitness community—let's crush your goals!"
          buttonText="Start Training"
          onButtonClick={() => (window.location.href = "/find-trainer")}
          icon={<CheckCircleOutline sx={styles.icon} />}
        />
      </motion.div>
    </Box>
  );
};

export default SubSuccessPage;
