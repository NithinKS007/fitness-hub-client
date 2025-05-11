import { Box } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { motion } from "framer-motion";
import Message from "../../components/shared/Message";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
    padding: { xs: "16px", sm: "32px" },
  },
  icon: {
    fontSize: { xs: "48px", sm: "64px" },
    color: "#14b8a6",
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface SubFailurePageProps {
  message?: string;
}

const SubFailurePage: React.FC<SubFailurePageProps> = ({
  message = "Error",
}) => {
  return (
    <Box sx={styles.container}>
      <motion.div variants={cardVariants} initial="initial" animate="animate">
        <Message
          heading="Payment Failure"
          bodyText={`Something went wrong with your payment. ${message}`}
          buttonText="Go Back"
          icon={<ErrorOutline sx={styles.icon} />}
          onButtonClick={() => (window.location.href = "/find-trainer")}
        />
      </motion.div>
    </Box>
  );
};

export default SubFailurePage;
