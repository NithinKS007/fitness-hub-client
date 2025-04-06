import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface ProgressBarProps {
  label: string;
  value: number;
  count: number;
  color: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  labelWidth: string | number;
  height: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  count,
  color,
  labelWidth,
  height,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography variant="body2" sx={{ width: labelWidth }}>
        {label}:
      </Typography>
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <LinearProgress
            variant="determinate"
            value={value}
            sx={{
              height,
              borderRadius: 5,
              backgroundColor: "#e0e0e0",
            }}
            color={color}
          />
        </motion.div>
      </Box>
      <Typography variant="body2">{count}</Typography>
    </Box>
  );
};

export default ProgressBar;
