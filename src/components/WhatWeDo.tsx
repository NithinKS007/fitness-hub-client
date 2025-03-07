import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrainerAuthForm from "./TrainerAuthForm";

interface WhatWeDoProps {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
  formik: any;
  bannerImage: any; 
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({ handleOpen, handleClose, open, formik, bannerImage }) => {
  return (
    <Box sx={{ py: 15 }}>
      <Container maxWidth="lg">
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            bgcolor: "#e2f5e9",
            mb: 6, 
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: 2,
                  textTransform: "uppercase",
                }}
              >
                Expert Fitness Coaching
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: 3,
                  fontSize: { xs: "32px", md: "38px" },
                }}
              >
                Achieve your goals with top-tier coaches
              </Typography>
              <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  "Personalized training plans",
                  "Guidance from certified professionals",
                  "Results-driven programs",
                ].map((text, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 1, p: 0 }}
                  >
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#1a1a1a" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ color: "#1a1a1a" }}>
                          {text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: "300px",
                height: "300px",
              }}
            >
              <Box
                component="img"
                src={bannerImage}
                alt="Expert Coaching"
                sx={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            bgcolor: "#f0f4ff", 
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: 2,
                  textTransform: "uppercase",
                }}
              >
                Become a Fitness Coach
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#1a1a1a",
                  mb: 3,
                  fontSize: { xs: "32px", md: "38px" },
                }}
              >
                Join our expert team and inspire others
              </Typography>
              <List sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
                {[
                  "Share your expertise with a global audience",
                  "Flexible schedule to suit your lifestyle",
                  "Supportive community of professionals",
                ].map((text, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 1, p: 0 }}
                  >
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#1a1a1a" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ color: "#1a1a1a" }}>
                          {text}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                sx={{ borderRadius: 3, fontWeight: "bold" }}
                onClick={handleOpen}
              >
                Apply Now
              </Button>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: "300px",
                height: "300px",
              }}
            >
              <Box
                component="img"
                src={bannerImage}
                alt="Fitness Coach Opportunity"
                sx={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
      <TrainerAuthForm handleClose={handleClose} open={open} formik={formik} />
    </Box>
  );
};

export default WhatWeDo;