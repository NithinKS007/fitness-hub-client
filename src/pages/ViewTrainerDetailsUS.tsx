import { Box, Typography, Button, Avatar, Container } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NavigationTabs from "../components/Tabs";
import { useState } from "react";

const ViewTrainerDetailsUS = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabItems = [
    { label: "details", path: "/trainer-details" },
    { label: "Subscriptions", path: "/trainer-subscriptions" },
    { label: "Videos", path: "/trainer-videos" },
  ];

  return (
    <>
      <Box sx={{ marginTop: 20,marginLeft:20,marginRight:20, boxShadow: 1, borderRadius: 2 }}>
        <Box
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9))",
            height: "195px",
            width: "100%",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            mt: -15,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "flex-end" },
              justifyContent: "space-between",
              pb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  src="/api/placeholder/154/154"
                  sx={{
                    width: 154,
                    height: 154,
                    border: "4px solid white",
                    bgcolor: "#f5f5f5",
                    mb: 2,
                  }}
                />
                <Typography
                  sx={{
                    display: "inline-block",
                    bgcolor: "#11D900",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: "100px",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  STANDARD
                </Typography>
              </Box>
              <Box sx={{ mt: 20 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 500,
                    fontSize: "32px",
                    lineHeight: "40px",
                    mb: 0.5,
                  }}
                >
                  Isha Sharma
                </Typography>
                <Typography
                  sx={{
                    color: "#9E9E9E",
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  Strength and Conditioning
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  px: 4,
                  height: "44px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#333",
                    boxShadow: "none",
                  },
                }}
              >
                See Plans
              </Button>
              <Button
                variant="outlined"
                startIcon={<ChatBubbleOutlineIcon />}
                sx={{
                  color: "black",
                  borderColor: "#E0E0E0",
                  px: 3,
                  height: "44px",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: "#999",
                    bgcolor: "transparent",
                  },
                }}
              >
                Chat With Coach
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          marginTop: 1,
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center", 
          marginBottom:2
        }}
      >
        <NavigationTabs
          tabItems={tabItems}
          value={value}
          handleChange={handleChange}
        />
      </Box>
    </>
  );
};

export default ViewTrainerDetailsUS;
