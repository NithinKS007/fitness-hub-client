import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  Grid,
} from "@mui/material";
import { ChatBubbleOutline, Star } from "@mui/icons-material";

interface TrainerGridProps {
  isSidebarOpen: boolean;
}
const demoTrainers = [
  {
    name: "Anurag Mishra",
    coached: 0,
    rating: 4,
    slotsAvailable: 2,
    time: ["9:00 PM", "9:30 PM"],
  },
  {
    name: "John Doe",
    coached: 10,
    rating: 3.5,
    slotsAvailable: 3,
    time: ["8:00 AM", "10:00 AM"],
  },
  {
    name: "Jane Smith",
    coached: 5,
    rating: 4.5,
    slotsAvailable: 1,
    time: ["11:00 AM", "2:00 PM"],
  },
  {
    name: "Alice Cooper",
    coached: 12,
    rating: 5,
    slotsAvailable: 4,
    time: ["12:00 PM", "3:00 PM"],
  },
  {
    name: "Bob Dylan",
    coached: 8,
    rating: 3,
    slotsAvailable: 2,
    time: ["9:00 AM", "1:00 PM"],
  },
];

const TrainerCard = ({ trainer }: any) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        margin: "15px",
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            pt: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Avatar
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "#f5f5f5",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#1a1a1a",
              mt: 2,
            }}
          >
            {trainer.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Star sx={{ color: "black", fontSize: "16px" }} /> 
            <Typography sx={{ color: "#1a1a1a", ml: 1, fontSize: "16px" }}>
              {trainer.rating} 
            </Typography>
            <Typography sx={{ color: "#1a1a1a", mx: 1, fontSize: "16px" }}>
              | 
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666666",
              }}
            >
              {trainer.coached} People Coached
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              bgcolor: "#f8f8f8",
              p: 2,
              borderRadius: "8px",
              mt: 2,
            }}
          >
            <Typography
              sx={{ color: "#666666", fontSize: "14px", textAlign: "center" }}
            >
              {trainer.slotsAvailable} slots available
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                {trainer.time.map((time: string, index: number) => (
                  <Typography
                    key={index}
                    sx={{
                      color: "#1a1a1a",
                      fontSize: "16px",
                      marginRight: "12px",
                      display: "flex",
                    }}
                  >
                    {time}
                  </Typography>
                ))}
              </Box>

              <Box>
                <Typography sx={{ color: "#666666", ml: 1, textAlign: "end" }}>
                  View →
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", width: "100%", mt: 2 }}>
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

const TrainerGrid: React.FC<TrainerGridProps> = ({ isSidebarOpen }) => {
  return (
    <Grid container>
      {demoTrainers.map((trainer, index) => (
        <Grid item xs={12} sm={6} md={isSidebarOpen ? 4 : 3} key={index}>
          <TrainerCard trainer={trainer} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TrainerGrid;
