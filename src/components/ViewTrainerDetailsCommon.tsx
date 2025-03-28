import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { TrainerWithSubscriptionDetails } from "../redux/auth/authTypes";

interface ViewTrainerDetailsCommonProps {
  trainerDetails: TrainerWithSubscriptionDetails | null;
}

const ViewTrainerDetailsCommon: React.FC<ViewTrainerDetailsCommonProps> = ({
  trainerDetails,
}) => {
  return (
    <Box
      sx={{
        mt: { xs: 2, md: 4 },
        mx: { xs: 2, md: 5, lg: 20 },
        boxShadow: 1,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9))",
          height: { xs: 120, md: 180, lg: 195 },
          width: "100%",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      />

      <Container maxWidth="lg" sx={{ mt: { xs: -8, md: -12, lg: -15 } }}>
        <Box
          sx={{
            display: { xs: "block", lg: "flex" },
            justifyContent: { lg: "space-between" },
            alignItems: { lg: "flex-end" },
            pb: 3,
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
              alignItems: { lg: "flex-end" },
              gap: { lg: 3 },
              mb: { xs: 3, lg: 0 },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Avatar
                src={trainerDetails?.profilePic || ""}
                sx={{
                  width: { xs: 100, md: 140, lg: 154 },
                  height: { xs: 100, md: 140, lg: 154 },
                  border: "4px solid white",
                  bgcolor: "#f5f5f5",
                  mb: 1,
                  mx: { xs: "auto", lg: 0 },
                }}
              />
              <Typography
                
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 20, md: 28, lg: 32 },
                  lineHeight: { xs: "28px", md: "36px", lg: "40px" },
                  mb: 0.5,
                  textAlign: "center",
                }}
              >
                {`${trainerDetails?.fname || ""} ${trainerDetails?.lname || ""}`}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 2,
              mt: { xs: 2, lg: 0 },
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                px: { xs: 2, md: 4 },
                height: 44,
                borderRadius: "8px",
                textTransform: "none",
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
                boxShadow: "none",
                "&:hover": { bgcolor: "#333", boxShadow: "none" },
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
                px: { xs: 2, md: 3 },
                height: 44,
                borderRadius: "8px",
                textTransform: "none",
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
                "&:hover": { borderColor: "#999", bgcolor: "transparent" },
              }}
            >
              Chat With Coach
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ViewTrainerDetailsCommon;
