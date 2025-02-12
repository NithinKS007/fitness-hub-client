import { useState } from "react";

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
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrainerAuthForm from "./TrainerAuthForm";

interface WhatWeDoProps {
  handleOpen: () => void;
  handleClose: () => void;
  open:boolean,
  formik:any
}
const WhatWeDo:React.FC<WhatWeDoProps> = ({ handleOpen,handleClose,open,formik }) => {
  const features = [
    {
      title: "Connect with Clients",
      description:
        "We match you with clients who are looking for personalized fitness programs and expert advice tailored to their needs.",
      icon: <PersonSearchIcon color="primary" />,
    },
    {
      title: "Expand Your Reach",
      description:
        "Whether you offer in-person or virtual sessions, our platform helps you grow your client base.",
      icon: <TrendingUpIcon color="primary" />,
    },
    {
      title: "Focus on What You Love",
      description:
        "Leave the administrative work to us. From scheduling to payments, we handle the logistics so you can focus on training.",
      icon: <WorkIcon color="primary" />,
    },
    {
      title: "Professional Growth",
      description:
        "Gain exposure to a wide audience and enhance your skills by being part of a community of top-notch trainers.",
      icon: <EmojiEventsIcon color="primary" />,
    },
  ];

  return (
    <Box sx={{ py: 15 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          WHAT WE DO?
        </Typography>

        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            sx={{
              mb: 4,
              textAlign: "center",
              fontStyle: "italic",
              color: "text.secondary",
            }}
          >
            We are dedicated to creating a platform that connects skilled
            professionals like you with clients seeking expert guidance to
            achieve their fitness goals. Here's what we offer:
          </Typography>

          <List sx={{ width: "100%" }}>
            {features.map((feature, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  mb: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 2 },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {feature.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      component="span"
                      color="primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {feature.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {feature.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            Join us in transforming lives and making fitness accessible to
            everyone!
          </Typography>
          <Box sx={{ textAlign: "center", mt: 3 }}>
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
        </Paper>
      </Container>
      <TrainerAuthForm handleClose={handleClose} open={open} formik={formik} />
    </Box>
  );
};

export default WhatWeDo;
