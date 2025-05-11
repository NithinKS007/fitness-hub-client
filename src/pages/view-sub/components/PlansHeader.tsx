import { Typography } from "@mui/material";

const PlansHeader = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}
      >
        Choose Your Transformation Package
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 5, textAlign: "center" }}
      >
        Select a plan that fits your fitness goals and start your journey today
      </Typography>
    </>
  );
};

export default PlansHeader;
