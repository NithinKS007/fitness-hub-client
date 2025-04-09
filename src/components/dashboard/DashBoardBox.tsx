import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface DashBoardBoxProps {
  content: string;
  number: number;
  icon: ReactNode;
}

const styles = {
  outerBox: {
    bgcolor: "white",
    borderRadius: "8px",
    p: 2,
    boxShadow: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  contentBox: {},
  contentTypography: {
    color: "grey.600",
    fontWeight: "medium",
    mb: 0.5,
  },
  numberIconBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    mt: 1,
  },
  numberTypography: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

const DashBoardBox: React.FC<DashBoardBoxProps> = ({
  content,
  number,
  icon,
}) => {
  return (
    <Box sx={styles.outerBox}>
      <Box sx={styles.contentBox}>
        <Typography sx={styles.contentTypography}>{content}</Typography>
      </Box>
      <Box sx={styles.numberIconBox}>
        <Typography sx={styles.numberTypography}>{number}</Typography>
        {icon}
      </Box>
    </Box>
  );
};

export default DashBoardBox;
