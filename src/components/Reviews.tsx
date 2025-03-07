import { Box, Typography } from "@mui/material";
import React from "react";

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

          width: "50%", 
          marginRight: 20,
        }}
      >
        <Typography variant="body1">Reviews will be displayed here</Typography>
      </Box>
    </>
  );
};

export default Reviews;
