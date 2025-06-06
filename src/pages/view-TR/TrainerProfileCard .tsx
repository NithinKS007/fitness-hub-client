import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Admin,
  Trainer,
  TrainerWithSubscriptionDetails,
  User,
} from "../../redux/auth/authTypes";

interface TrainerProfileCard {
  trainerDetails: TrainerWithSubscriptionDetails | null;
  isSubscribed: boolean;
  handleSeePlansClick: () => void;
  isLoggedIn: Trainer | Admin | User | null;
}

const styles = {
  outerBox: {
    mt: { xs: 2, md: 4 },
    mx: { xs: 2, md: 5, lg: 3 },
    boxShadow: 1,
    borderRadius: 2,
    overflow: "hidden",
  },
  gradientBox: {
    background: "linear-gradient(to bottom, #1f2937, #111827)",
    height: { xs: 120, md: 180, lg: 195 },
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  container: {
    mt: { xs: -8, md: -12, lg: -15 },
    ml: { xs: 1, md: 3, lg: 5 },
    mr: { xs: 1, md: 3, lg: 5 },
    maxWidth: "1200px",
    width: "100%",
  },
  innerBox: {
    display: { xs: "block", lg: "flex" },
    justifyContent: { lg: "space-between" },
    alignItems: { lg: "flex-end" },
    pb: 3,
    textAlign: { xs: "center", lg: "left" },
  },
  avatarContainer: {
    display: { xs: "block", lg: "flex" },
    alignItems: { lg: "flex-end" },
    gap: { lg: 3 },
    mb: { xs: 3, lg: 0 },
    ml: { lg: 0 },
    paddingLeft: 0,
  },
  avatarColumn: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    width: { xs: 100, md: 140, lg: 154 },
    height: { xs: 100, md: 140, lg: 154 },
    border: "4px solid white",
    bgcolor: "#f5f5f5",
    mb: 1,
    mx: { xs: "auto", lg: 0 },
  },
  nameTypography: {
    fontWeight: 500,
    fontSize: { xs: 20, md: 28, lg: 32 },
    lineHeight: { xs: "28px", md: "36px", lg: "40px" },
    mb: 0.5,
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    gap: 2,
    mt: { xs: 2, lg: 0 },
  },
  seePlansButton: {
    bgcolor: "#1f2937",
    color: "white",
    px: { xs: 2, md: 4 },
    height: 44,
    borderRadius: "8px",
    textTransform: "none",
    fontSize: { xs: 14, md: 16 },
    fontWeight: 500,
    boxShadow: "none",
    "&:hover": { backgroundColor: "#374151" },
    transition: "background-color 0.3s",
  },
  chatButton: {
    color: "black",
    borderColor: "#E0E0E0",
    px: { xs: 2, md: 3 },
    height: 44,
    borderRadius: "8px",
    textTransform: "none",
    fontSize: { xs: 14, md: 16 },
    fontWeight: 500,
    "&:hover": { borderColor: "#999", bgcolor: "transparent" },
  },
};

const TrainerProfileCard: React.FC<TrainerProfileCard> = ({
  trainerDetails,
  handleSeePlansClick,
  isSubscribed,
  isLoggedIn,
}) => {
  const { subscriptionDetails } = trainerDetails || {};

  const isAvailablePlans =
    subscriptionDetails && subscriptionDetails.length > 0;
  const isUserSubscribed = isSubscribed && isAvailablePlans;
  const isUserNotSubscribed = !isSubscribed && isAvailablePlans;

  return (
    <Box sx={styles.outerBox}>
      <Box sx={styles.gradientBox} />
      <Container sx={styles.container}>
        <Box sx={styles.innerBox}>
          <Box sx={styles.avatarContainer}>
            <Box sx={styles.avatarColumn}>
              <Avatar
                src={trainerDetails?.profilePic || ""}
                sx={styles.avatar}
              />
              <Typography sx={styles.nameTypography}>
                {`${trainerDetails?.fname || ""} ${trainerDetails?.lname || ""}`}
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.buttonContainer}>
            {isLoggedIn ? (
              isUserNotSubscribed ? (
                <Button
                  variant="contained"
                  sx={styles.seePlansButton}
                  onClick={handleSeePlansClick}
                >
                  See Plans
                </Button>
              ) : isUserSubscribed ? (
                <Button
                  variant="contained"
                  sx={styles.seePlansButton}
                  disabled
                  startIcon={<NotificationsIcon />}
                >
                  Subscribed
                </Button>
              ) : (
                <Button variant="contained" sx={styles.seePlansButton} disabled>
                  NO PLANS AVAILABLE
                </Button>
              )
            ) : (
              <Button variant="contained" sx={styles.seePlansButton} disabled>
                Log in to See Plans
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<ChatBubbleOutlineIcon />}
              sx={styles.chatButton}
            >
              Chat With Coach
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TrainerProfileCard;
