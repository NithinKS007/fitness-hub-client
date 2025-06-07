import { Box } from "@mui/material";
import React from "react";

interface TRAboutMeProps {
  aboutMe: string;
}
const TRAboutMe: React.FC<TRAboutMeProps> = ({ aboutMe }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "300px",
        boxShadow: 1,
        borderRadius: 2,
        padding: "16px",
        width: { xs: "100%", md: "72%" },
        marginRight: { xs: 0, md: 2 },
        marginTop: { xs: 2, md: 0 },
        paddingTop: 2,
      }}
    >
      {aboutMe || "No information available."}
    </Box>
  );
};

export default TRAboutMe;
