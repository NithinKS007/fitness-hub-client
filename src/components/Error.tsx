import React from "react";
import { Box, Typography } from "@mui/material";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({
  message = "Oops, something went wrong",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography color="error">{message}</Typography>
    </Box>
  );
};

export default Error;
