import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";

const styles = {
  card: {
    borderRadius: "16px",
    width: "100%",
    maxWidth: "100%",
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #f0f0f0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    backgroundColor: "#fafafa",
  },
  cardContent: {
    p: 0,
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    padding: "16px",
  },
  avatar: {
    width: "100%",
    height: { xs: "180px", sm: "220px", md: "250px" },
    borderRadius: "10px",
    mb: 2,
    fontSize: "80px",
    bgcolor: "#f0f0f0",
    color: "#666666",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "50%",
      background: "linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)",
      borderRadius: "10px",
    },
  },
  nameTypography: {
    fontSize: { xs: "16px", sm: "18px", md: "20px" },
    fontWeight: 600,
    color: "#1a1a1a",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  subtitleTypography: {
    fontSize: { xs: "12px", sm: "14px" },
    color: "#666666",
    textAlign: "center",
    mt: 0.5,
  },
  buttonBox: {
    display: "flex",
    width: "100%",
    mt: 2,
    px: 0,
    gap: 1,
  },
  chatButton: {
    minWidth: "48px",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    color: "#000000",
    "&:hover": {
      border: "1px solid #000000",
      bgcolor: "rgba(0, 0, 0, 0.05)",
    },
  },
  plansButton: {
    flex: 1,
    height: "48px",
    backgroundColor: "#1f2937",
    color: "white",
    borderRadius: "12px",
    border: "none",
    textTransform: "none",
    fontSize: { xs: "14px", sm: "16px" },
    ml: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": { backgroundColor: "#374151" },
    transition: "background-color 0.3s",
  },
};

const TrainerCard = ({ trainer, handleTrainerDetails }: any) => {
  return (
    <Card sx={styles.card} onClick={() => handleTrainerDetails(trainer._id)}>
      <CardContent sx={styles.cardContent}>
        <Box sx={styles.contentBox}>
          <Avatar src={trainer.profilePic || ""} sx={styles.avatar} />
          <Typography variant="h6" sx={styles.nameTypography}>
            {trainer.fname + " " + trainer.lname}
          </Typography>
          <Typography variant="body2" sx={styles.subtitleTypography}>
            {trainer.specialty || "Fitness Trainer"}
          </Typography>
          <Box sx={styles.buttonBox}>
            <Button variant="outlined" sx={styles.chatButton}>
              <ChatBubbleOutline sx={{ fontSize: 20 }} />
            </Button>
            <Button variant="contained" sx={styles.plansButton}>
              See Plans
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrainerCard;
