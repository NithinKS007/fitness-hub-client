import React from "react";
import { Box, Typography } from "@mui/material";

interface ErrorProps {
  message?: string;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  errorText: {
    color: "error.main",
  },
};

const Error: React.FC<ErrorProps> = ({
  message = "Oops, something went wrong",
}) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.errorText}>{message}</Typography>
    </Box>
  );
};

export default Error;
