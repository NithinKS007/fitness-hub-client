import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getSubscribedDetails } from "../redux/subscription/subscriptionThunk";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
import { Box, Typography, Button, Paper } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { motion } from "framer-motion";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
    padding: { xs: "16px", sm: "32px" },
  },
  paper: {
    padding: { xs: "24px", sm: "32px" },
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#1f2937",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  icon: {
    fontSize: { xs: "48px", sm: "64px" },
    color: "#14b8a6",
  },
  heading: {
    color: "#ffffff",
    fontSize: { xs: "28px", sm: "32px" },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  bodyText: {
    color: "#d1d5db",
    maxWidth: "400px",
    margin: "0 auto",
    fontSize: "16px",
    lineHeight: 1.6,
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  button: {
    marginTop: "16px",
    backgroundColor: "#14b8a6",
    color: "#ffffff",
    width: { xs: "100%", sm: "200px" },
    padding: "12px 24px",
    borderRadius: "9999px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 600,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "#0d9488",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
      transform: "translateY(-2px)",
    },
    transition: "background-color 0.3s, transform 0.2s, box-shadow 0.3s",
  },
};

const iconVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.5,
    },
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

const OnSuccessPage: React.FC = () => {
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
  if (error) return <Error message={error} />;

  return (
    <Box sx={styles.container}>
      <motion.div variants={cardVariants} initial="initial" animate="animate">
        <Paper elevation={0} sx={styles.paper}>
          <Box sx={styles.contentBox}>
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
            >
              <CheckCircleOutline sx={styles.icon} aria-hidden="true" />
            </motion.div>
            <Typography component="h1" sx={styles.heading}>
              Subscription Success!
            </Typography>
            <Typography sx={styles.bodyText}>
              Your payment was processed successfully. Welcome to our fitness
              community—let’s crush your goals!
            </Typography>
            <Button
              sx={styles.button}
              onClick={() => (window.location.href = "/find-trainer")}
              aria-label="Start Training"
            >
              Start Training
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default OnSuccessPage;
