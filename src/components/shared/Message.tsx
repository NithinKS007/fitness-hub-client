import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";

interface MessageProps {
  heading: string;
  bodyText: string;
  buttonText: string;
  onButtonClick: () => void;
  icon: React.ReactNode;
}

const styles = {
  paper: {
    padding: { xs: "24px", sm: "32px" },
    maxWidth: "480px",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#1f2937",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  heading: {
    color: "#ffffff",
    fontSize: { xs: "28px", sm: "32px" },
    fontWeight: 700,
    letterSpacing: "-0.02em",
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  bodyText: {
    color: "#d1d5db",
    maxWidth: "400px",
    margin: "0 auto",
    fontSize: "16px",
    lineHeight: 1.6,
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  button: {
    marginTop: "16px",
    backgroundColor: "#14b8a6",
    color: "#ffffff",
    width: { xs: "100%", sm: "200px" },
    padding: "12px 24px",
    borderRadius: "9999px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 600,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "#0d9488",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
      transform: "translateY(-2px)",
    },
    transition: "background-color 0.3s, transform 0.2s, box-shadow 0.3s",
  },
};
const iconVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.5,
    },
  },
};

const Message: React.FC<MessageProps> = ({
  heading,
  bodyText,
  buttonText,
  onButtonClick,
  icon
}) => (
  <Paper elevation={0} sx={styles.paper}>
    <Box sx={styles.contentBox}>
      <motion.div variants={iconVariants} initial="initial" animate="animate">
        {icon}
      </motion.div>
      <Typography component="h1" sx={styles.heading}>
        {heading}
      </Typography>
      <Typography sx={styles.bodyText}>{bodyText}</Typography>
      <Button
        sx={styles.button}
        onClick={onButtonClick}
        aria-label="Start Training"
      >
        {buttonText}
      </Button>
    </Box>
  </Paper>
);

export default Message;
