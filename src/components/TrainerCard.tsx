import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  Grid,
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
        width: "100%",
        maxWidth: "100%",
        minHeight: "350px",
        borderRadius: "10px",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => handleTrainerDetails(trainer._id)}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            pt: 1,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Avatar
            src={trainer.profilePic || ""}
            sx={{
              width: "330px",
              height: "250px",
              borderRadius: "10px",
              mb: 2,
              fontSize: "80px",
              bgcolor: "#e0e0e0",
            }}
          ></Avatar>

          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#1a1a1a",
            }}
          >
            {trainer.fname + " " + trainer.lname}
          </Typography>

          <Box sx={{ display: "flex", width: "100%", mt: 1 }}>
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
                fontSize: "16px",
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
    <Grid
      container
      spacing={2}
      sx={{
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >

      {trainersList && trainersList.length > 0 ? (
        trainersList?.map((trainer) => (
          <Grid item key={trainer._id} xs={12} sm={6} md={4} lg={3}>
            <TrainerCard
              trainer={trainer}
              handleTrainerDetails={handleTrainerDetails}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ marginTop: "20px" }}
          >
            No Trainers Found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default TrainerGrid;
