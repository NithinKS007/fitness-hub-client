import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";

interface TrainerGridProps {
  trainersList: any[];
  handleTrainerDetails: (_id: string) => void;
}

const TrainerCard = ({ trainer, handleTrainerDetails }: any) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        width: "100%",
        maxWidth: "100%",
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        border: "none",
        boxShadow: "none",
        cursor: "pointer",
      }}
      onClick={() => handleTrainerDetails(trainer._id)}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Avatar
            src={trainer.profilePic || ""}
            sx={{
              width: "100%",
              height: { xs: "180px", sm: "220px", md: "250px" },
              borderRadius: "10px",
              mb: 2,
              fontSize: "80px",
              bgcolor: "#e0e0e0",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: 500,
              color: "#1a1a1a",
            }}
          >
            {trainer.fname + " " + trainer.lname}
          </Typography>

          <Box sx={{ display: "flex", width: "100%", mt: 1, px: 1 }}>
            <Button
              variant="outlined"
              sx={{
                minWidth: "48px",
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
                color: "#666666",
                "&:hover": {
                  border: "1px solid #666666",
                },
              }}
            >
              <ChatBubbleOutline sx={{ fontSize: 20 }} />
            </Button>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
                height: "48px",
                color: "black",
                borderRadius: "12px",
                border: "0.5px solid lightgrey",
                textTransform: "none",
                fontSize: { xs: "14px", sm: "16px" },
                ml: 1,
                bgcolor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              See Plans
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const TrainerGrid: React.FC<TrainerGridProps> = ({
  trainersList,
  handleTrainerDetails,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        cursor: "pointer",
        justifyContent: "flex-start", // Aligns items at the start, making them take full width
        width: "100%", // Ensures the container takes up full width
      }}
    >
      {trainersList && trainersList.length > 0 ? (
        trainersList.map((trainer) => (
          <Box
            key={trainer._id}
            sx={{
              width: { xs: "100%", sm: "48%", md: "31%", lg: "24%" },
              display: "flex",
              justifyContent: "center", // Center each card within its container
            }}
          >
            <TrainerCard
              trainer={trainer}
              handleTrainerDetails={handleTrainerDetails}
            />
          </Box>
        ))
      ) : (
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ marginTop: "20px", textAlign: "center" }}
          >
            No Trainers Found
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TrainerGrid;
