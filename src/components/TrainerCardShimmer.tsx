import React from "react";
import { Box, Skeleton } from "@mui/material";
const trainerCardShimmerStyles = {
  root: {
    borderRadius: 3,
    width: "100%",
    maxWidth: "100%",
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
    border: "none",
    boxShadow: "none",
  },
  contentWrapper: {
    p: 0,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  avatarSkeleton: {
    width: "100%",
    height: { xs: "180px", sm: "220px", md: "250px" },
    borderRadius: "10px",
    mb: 2,
  },
  textSkeleton: {
    width: "60%",
    fontSize: { xs: "16px", sm: "18px", md: "20px" },
    height: 28,
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    mt: 1,
    px: 1,
  },
  chatButtonSkeleton: {
    minWidth: "48px",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
  },
  plansButtonSkeleton: {
    flex: 1,
    height: "48px",
    borderRadius: "12px",
    ml: 1,
  },
};

const trainerGridShimmerStyles = {
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    justifyContent: "flex-start",
    width: "100%",
  },
  cardWrapper: {
    width: { xs: "100%", sm: "48%", md: "31%", lg: "24%" },
    display: "flex",
    justifyContent: "center",
  },
};

const TrainerCardShimmer = () => {
  return (
    <Box sx={trainerCardShimmerStyles.root}>
      <Box sx={trainerCardShimmerStyles.contentWrapper}>
        <Box sx={trainerCardShimmerStyles.innerContainer}>
          <Skeleton
            variant="rectangular"
            sx={trainerCardShimmerStyles.avatarSkeleton}
          />
          <Skeleton variant="text" sx={trainerCardShimmerStyles.textSkeleton} />
          <Box sx={trainerCardShimmerStyles.buttonContainer}>
            <Skeleton
              variant="rectangular"
              sx={trainerCardShimmerStyles.chatButtonSkeleton}
            />
            <Skeleton
              variant="rectangular"
              sx={trainerCardShimmerStyles.plansButtonSkeleton}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const TrainerGridShimmer: React.FC = () => {
  return (
    <Box sx={trainerGridShimmerStyles.gridContainer}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Box key={index} sx={trainerGridShimmerStyles.cardWrapper}>
          <TrainerCardShimmer />
        </Box>
      ))}
    </Box>
  );
};

export default TrainerGridShimmer;
