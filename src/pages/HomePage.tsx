import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useModal } from "../hooks/useModal";
import useAuthForm from "../hooks/useAuthForm";
import TrainerAuthForm from "../components/modals/TrainerAuthModal";
import homePageImage from "../assets/homePageImage.jpg";
import { Box, Button, CardMedia, Typography } from "@mui/material";

const HomePage = () => {
  const { handleOpen, handleClose, open } = useModal();
  const { handleTrainerAuth } = useAuthForm();

  const steps = [
    {
      title: "Create an Account",
      description: "Sign up and provide your details to get started.",
      icon: <PersonAddIcon fontSize="large" />,
    },
    {
      title: "Find Your Trainer",
      description: "Discover trainers tailored to your fitness goals.",
      icon: <SearchIcon fontSize="large" />,
    },
    {
      title: "Start Training",
      description: "Subscribe, train, and track your progress.",
      icon: <FitnessCenterIcon fontSize="large" />,
    },
  ];

  const programs = [
    {
      title: "Cardio Strength",
      description: "Boost endurance and power with dynamic workouts.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Fat Loss",
      description: "Shed pounds with targeted exercises and diet plans.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Muscle Gain",
      description: "Build strength and mass with expert guidance.",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Nutrition",
      description: "Fuel your body with personalized meal plans.",
      image:
        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const styles = {
    heroSection: {
      position: "relative",
      height: "100vh",
      backgroundImage: `url(${homePageImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 24px",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    heroContent: {
      position: "relative",
      zIndex: 10,
      width: "100%",
      maxWidth: "1200px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
      animation: "fade-in 1s ease-in",
    },
    heroTitle: {
      fontSize: { xs: "36px", md: "60px", lg: "84px" },
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: "-0.025em",
    },
    heroSubtitle: {
      color: "#e5e7eb",
      fontSize: { xs: "18px", md: "20px" },
      maxWidth: "672px",
      margin: "0 auto",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    getStartedButton: {
      backgroundColor: "#14b8a6",
      color: "white",
      fontWeight: 600,
      padding: "12px 24px",
      borderRadius: "9999px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "192px",
      textTransform: "none",
      "&:hover": { backgroundColor: "#0d9488" },
      transition: "background-color 0.3s",
    },
    coachButton: {
      backgroundColor: "#1f2937",
      color: "white",
      fontWeight: 600,
      padding: "12px 24px",
      borderRadius: "9999px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "192px",
      textTransform: "none",
      "&:hover": { backgroundColor: "#374151"  },
      transition: "background-color 0.3s",
    },
    programsSection: {
      backgroundColor: "#111827",
      color: "white",
      padding: "80px 24px",
    },
    programsContainer: {
      width: "100%",
      maxWidth: "1400px",
      margin: "0 auto",
    },
    programsTitle: {
      fontSize: { xs: "36px", md: "48px" },
      fontWeight: 700,
      textAlign: "center",
      marginBottom: "48px",
    },
    programGrid: {
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr",
        lg: "1fr 1fr 1fr 1fr ",
      },
      gap: "30px",
    },
    programCard: {
      position: "relative",
      backgroundColor: "#1f2937",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        transform: "translateY(-8px)",
      },
    },
    programImage: {
      width: "100%",
      height: "192px",
      objectFit: "cover",
      opacity: 0.8,
    },
    programContent: {
      padding: "24px",
      textAlign: "center",
    },
    programTitle: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#4ad6c0",
      marginBottom: "8px",
    },
    programDescription: {
      color: "#d1d5db",
    },
    howItWorksSection: {
      backgroundColor: "#f3f4f6",
      color: "#111827",
      padding: "80px 24px",
    },
    howItWorksContainer: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    howItWorksHeader: {
      textAlign: "center",
      marginBottom: "64px",
    },
    howItWorksTitle: {
      fontSize: { xs: "36px", md: "48px" },
      fontWeight: 700,
      marginBottom: "16px",
    },
    howItWorksSubtitle: {
      color: "#4b5563",
      fontSize: { xs: "18px", md: "20px" },
      maxWidth: "768px",
      margin: "0 auto",
    },
    stepGrid: {
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr " },
      gap: "48px",
    },
    stepContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    stepIcon: {
      width: "64px",
      height: "64px",
      backgroundColor: "	#0e827a",
      borderRadius: "9999px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      marginBottom: "24px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s",
      "&:hover": { transform: "scale(1.1)" },
    },
    stepTitle: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#111827",
      marginBottom: "8px",
    },
    stepDescription: {
      color: "#4b5563",
    },
  };

  return (
    <>
      <Box component="section" sx={styles.heroSection}>
        <Box sx={styles.overlay} />
        <Box sx={styles.heroContent}>
          <Typography component="h1" sx={styles.heroTitle}>
            Achieve Your{" "}
            <span style={{ color: "#4ad6c0" }}>Dream Physique</span>
          </Typography>
          <Typography sx={styles.heroSubtitle}>
            Join a community of fitness enthusiasts, get expert guidance, and
            track your journey to a healthier you.
          </Typography>
          <Box sx={styles.buttonContainer}>
            <Button sx={styles.getStartedButton}>Get Started</Button>
            <Button sx={styles.coachButton} onClick={handleOpen}>
              Enroll as a Coach
            </Button>
          </Box>
          <TrainerAuthForm
            handleClose={handleClose}
            open={open as boolean}
            formik={handleTrainerAuth}
          />
        </Box>
      </Box>

      <Box component="section" sx={styles.programsSection}>
        <Box sx={styles.programsContainer}>
          <Typography component="h2" sx={styles.programsTitle}>
            Our <span style={{ color: "#4ad6c0" }}>Programs</span>
          </Typography>
          <Box sx={styles.programGrid}>
            {programs.map((program, index) => (
              <Box key={index} sx={styles.programCard}>
                <CardMedia
                  component="img"
                  image={program.image}
                  alt={program.title}
                  sx={styles.programImage}
                />
                <Box sx={styles.programContent}>
                  <Typography sx={styles.programTitle}>
                    {program.title}
                  </Typography>
                  <Typography sx={styles.programDescription}>
                    {program.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={styles.howItWorksSection}>
        <Box sx={styles.howItWorksContainer}>
          <Box sx={styles.howItWorksHeader}>
            <Typography component="h2" sx={styles.howItWorksTitle}>
              How It <span style={{ color: "	#0e827a" }}>Works</span>
            </Typography>
            <Typography sx={styles.howItWorksSubtitle}>
              Simple steps to kickstart your fitness journey with us.
            </Typography>
          </Box>
          <Box sx={styles.stepGrid}>
            {steps.map((step, index) => (
              <Box key={index} sx={styles.stepContainer}>
                <Box sx={styles.stepIcon}>{step.icon}</Box>
                <Typography sx={styles.stepTitle}>{step.title}</Typography>
                <Typography sx={styles.stepDescription}>
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
