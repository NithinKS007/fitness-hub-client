import React from "react";
import { Box, Typography } from "@mui/material";
import { formatVideoDuration, getRelativeTime } from "../utils/conversion";

const styles = {
  videoWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "18px",
    marginTop: 2,
    width: "100%",
    boxSizing: "border-box",
  },
  cardContainer: {
    width: {
      xs: "100%",
      sm: "48%",
      md: "31%",
      lg: "24%",
    },
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  thumbnailWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
  },
  thumbnail: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  durationOverlay: {
    position: "absolute",
    bottom: "6px",
    right: "4px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "500",
    padding: "2px 4px",
    borderRadius: "2px",
  },
  cardContent: {
    padding: "8px 8px",
  },
  title: {
    fontSize: {
      xs: "13px",
      sm: "14px",
    },
    fontWeight: "500",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    color: "#030303",
  },
  metadata: {
    fontSize: {
      xs: "11px",
      sm: "12px",
    },
    color: "#606060",
  },
};

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
  duration: number;
  createdAt: string;
}

interface VideoGridProps {
  videos: Video[];
  onVideoClick: (videoId: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoClick }) => {
  return (
    <Box sx={styles.videoWrapper}>
      {videos.map((video) => (
        <Box
          key={video._id}
          sx={styles.cardContainer}
          onClick={() => onVideoClick(video._id)}
        >
          <Box sx={styles.thumbnailWrapper}>
            <Box
              component="img"
              src={`${video.thumbnail}?t=0`}
              alt={video.title}
              sx={styles.thumbnail}
            />
            <Box sx={styles.durationOverlay}>
              {formatVideoDuration(video.duration)}
            </Box>
          </Box>
          <Box sx={styles.cardContent}>
            <Typography sx={styles.title}>{video.title}</Typography>
            <Typography sx={styles.metadata}>
              {getRelativeTime(new Date(video.createdAt))}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default VideoGrid;
