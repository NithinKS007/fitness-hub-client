import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";

interface OnSuccessProps {
  isLoading: boolean;
  error: string | null;
}

const OnSuccess: React.FC<OnSuccessProps> = ({ isLoading, error }) => {
  console.log("loading", isLoading, error);
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 4,
          maxWidth: 448,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <CheckCircleOutline
            sx={{
              fontSize: 64,
              color: "success.main",
              mx: "auto",
            }}
          />
          <Typography variant="h5" component="h1" sx={{ color: "grey.800" }}>
            Payment Successful
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.600" }}>
            Thank you for your subscription. Your payment has been processed
            successfully.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              px: 3,
              bgcolor: "grey.800",
              "&:hover": {
                bgcolor: "grey.700",
              },
            }}
            onClick={() => (window.location.href = "/find-trainer")}
          >
            Go back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OnSuccess;
