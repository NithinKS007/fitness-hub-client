import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useModal } from "../hooks/useModal";
import useAuthForm from "../hooks/useAuthForm";
import TrainerAuthForm from "../components/modals/TrainerAuthModal";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const homeImage = import.meta.env.VITE_HOME_PAGE_IMAGE
const homeGridImage1 = import.meta.env.VITE_HOME_GRID_IMAGE1
const homeGridImage2 = import.meta.env.VITE_HOME_GRID_IMAGE2
const homeGridImage3 = import.meta.env.VITE_HOME_GRID_IMAGE3
const homeGridImage4 = import.meta.env.VITE_HOME_GRID_IMAGE4

const styles = {
  heroSection: {
    position: "relative",
    height: "100vh",
    backgroundImage: `url(${homeImage})`,
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
    "&:hover": { backgroundColor: "#374151" },
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

const motionVariants = {
  hero: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" },
  },
  programCard: (index: number) => ({
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay: index * 0.2 },
    whileHover: {
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
      translateY: -8,
    },
  }),
  step: (index: number) => ({
    initial: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, delay: index * 0.3 },
  }),
};

const programs = [
  {
    title: "Cardio & Strength",
    description: "Improve stamina, heart health, and full-body strength.",
    image:
      `${homeGridImage1}`,
  },
  {
    title: "Fat Loss Focus",
    description: "Burn fat efficiently with guided workouts and tips.",
    image:
     `${homeGridImage2}`,
  },
  {
    title: "Muscle Building",
    description: "Gain lean muscle through expert strength training.",
    image:
    `${homeGridImage3}`,
  },
  {
    title: "StrengthTraining",
    description: "Enhance strength and muscle mass with targeted training.",
    image:
    `${homeGridImage4}`,
  },
];

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

const HomePage = () => {
  const { handleOpen, handleClose, open } = useModal();
  const { handleTrainerAuth } = useAuthForm();

  return (
    <>
      <Box component="section" sx={styles.heroSection}>
        <Box sx={styles.overlay} />
        <MotionBox
          variants={motionVariants.hero}
          initial="initial"
          animate="animate"
          transition={motionVariants.hero.transition}
          sx={styles.heroContent}
        >
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
        </MotionBox>
      </Box>

      <Box component="section" sx={styles.programsSection}>
        <Box sx={styles.programsContainer}>
          <Typography component="h2" sx={styles.programsTitle}>
            Our <span style={{ color: "#4ad6c0" }}>Programs</span>
          </Typography>
          <Box sx={styles.programGrid}>
            {programs.map((program, index) => (
              <MotionBox
                key={index}
                initial={motionVariants.programCard(index).initial}
                whileInView={motionVariants.programCard(index).animate}
                transition={motionVariants.programCard(index).transition}
                whileHover={motionVariants.programCard(index).whileHover}
                viewport={{ once: true }}
                sx={styles.programCard}
              >
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
              </MotionBox>
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
              <MotionBox
                key={index}
                initial={motionVariants.step(index).initial}
                whileInView={motionVariants.step(index).animate}
                transition={motionVariants.step(index).transition}
                viewport={{ once: true }}
                sx={styles.stepContainer}
              >
                <Box sx={styles.stepIcon}>{step.icon}</Box>
                <Typography sx={styles.stepTitle}>{step.title}</Typography>
                <Typography sx={styles.stepDescription}>
                  {step.description}
                </Typography>
              </MotionBox>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
