import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

const containerStyles = {
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "grey.100",
};

const paperStyles = {
  p: 4,
  maxWidth: 448,
  width: "100%",
  textAlign: "center",
};

const contentBoxStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const iconStyles = {
  fontSize: 64,
  color: "error.main",
  mx: "auto",
};

const headingStyles = {
  color: "grey.800",
};

const textStyles = {
  color: "grey.600",
};

const buttonStyles = {
  mt: 2,
  px: 3,
  bgcolor: "grey.800",
  "&:hover": {
    bgcolor: "grey.700",
  },
};

const OnFailure: React.FC = () => {
  return (
    <Box sx={containerStyles}>
      <Paper elevation={1} sx={paperStyles}>
        <Box sx={contentBoxStyles}>
          <ErrorOutline sx={iconStyles} />
          <Typography variant="h5" component="h1" sx={headingStyles}>
            Payment failure
          </Typography>
          <Typography variant="body1" sx={textStyles}>
            An error occurred, try again
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={buttonStyles}
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