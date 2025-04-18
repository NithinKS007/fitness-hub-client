import React, { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatVideoDuration } from "../utils/conversion";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
  videoId: string;
  title: string;
  duration: number;
  description: string;
}

const ReuseableVideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnail,
  videoId,
  title,
  duration,
  description,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const styles = {
    content: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: 1,
      overflow: "hidden",
    },
    videoContainer: {
      flex: { xs: 1, md: 6 },
      display: "flex",
      flexDirection: "column",
      maxHeight: { xs: "50vh", md: "100vh" },
      overflow: "hidden",
    },
    video: {
      width: "100%",
      height: "100%",
      maxHeight: { xs: "50vh", md: "100vh" },
      objectFit: "contain",
    },
    detailsContainer: {
      flex: { xs: 1, md: 2 },
      overflowY: "auto",
      p: 1,
      maxHeight: { xs: "auto", md: "100vh" },
    },
  };

  return (
    <Box sx={styles.content}>
      <Box sx={styles.videoContainer}>
        <Box sx={styles.video}>
          <video
            ref={videoRef}
            controls
            autoPlay
            key={videoId}
            poster={thumbnail}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </Box>
      </Box>
      <Box sx={styles.detailsContainer}>
        <Typography variant="h6" fontWeight="medium">
          {title || "Untitled Video"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {formatVideoDuration(duration)}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {description || "No description available"}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReuseableVideoPlayer;