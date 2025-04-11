import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { getSubscribedDetails } from "../redux/subscription/subscriptionThunk";
import LoadingSpinner from "../components/LoadingSpinner";
import Error from "../components/Error";
import { Box, Typography, Button, Paper, Fade, keyframes } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.85;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#14b8a6", 
      dark: "#0d9488",
    },
    secondary: {
      main: "#ffffff", 
    },
    background: {
      default: "linear-gradient(135deg, #e6fffa 0%, #99f6e4 100%)", 
    },
    text: {
      primary: "#111827", 
      secondary: "#4b5563",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "9999px", 
          padding: "12px 24px",
          fontSize: "1rem",
          fontWeight: 600,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s, transform 0.2s",
          "&:hover": {
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px", 
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.default,
    padding: { xs: 2, sm: 4 },
  },
  paper: {
    p: { xs: 3, sm: 4 },
    maxWidth: 480,
    width: "100%",
    textAlign: "center",
    bgcolor: "secondary.main",
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
  },
  icon: {
    fontSize: { xs: 48, sm: 64 },
    color: "primary.main",
    mx: "auto",
    animation: `${pulse} 1.8s ease-in-out infinite`,
  },
  heading: {
    color: "text.primary",
    fontSize: { xs: "28px", sm: "32px" },
  },
  bodyText: {
    color: "text.secondary",
    maxWidth: "400px",
    mx: "auto",
  },
  button: {
    mt: 2,
    bgcolor: "primary.main",
    color: "secondary.main",
    width: { xs: "100%", sm: "200px" },
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};

const OnSuccessPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("sessionId");
    if (sessionId) {
      dispatch(getSubscribedDetails({ sessionId }));
    } else {
      navigate("/");
    }
  }, [location, dispatch, navigate]);

  if (isLoading)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <LoadingSpinner />;
      </Box>
    );
  if (error) return <Error message={error} />;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.container}>
        <Fade in timeout={600}>
          <Paper elevation={1} sx={styles.paper}>
            <Box sx={styles.contentBox}>
              <CheckCircleOutline sx={styles.icon} aria-hidden="true" />
              <Typography variant="h5" component="h1" sx={styles.heading}>
                Subscription Success!
              </Typography>
              <Typography variant="body1" sx={styles.bodyText}>
                Your payment was processed successfully. Welcome to our fitness
                community—let’s start your journey!
              </Typography>
              <Button
                variant="contained"
                sx={styles.button}
                onClick={() => (window.location.href = "/find-trainer")}
                aria-label="Start Training"
              >
                Start Training
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default OnSuccessPage;
