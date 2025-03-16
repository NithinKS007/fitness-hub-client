import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material"; 

const OnFailure: React.FC = () => {
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
          <ErrorOutline
            sx={{
              fontSize: 64,
              color: "error.main", 
              mx: "auto",
            }}
          />
          <Typography variant="h5" component="h1" sx={{ color: "grey.800" }}>
            Payment failure
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.600" }}>
            An error occurred, try again
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

export default OnFailure;
