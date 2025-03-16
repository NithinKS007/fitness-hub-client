import { Box, Typography } from "@mui/material";

const Reviews = () => {
  return (
    <>
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
        <Typography variant="body1">Reviews will be displayed here</Typography>
      </Box>
    </>
  );
};

export default Reviews;