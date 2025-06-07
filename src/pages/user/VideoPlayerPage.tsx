import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchVideoDataById } from "../../redux/content/contentThunk";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import VideoPlayer from "../../components/videos/VideoPlayer";
import LoadingSpinner from "../../components/LoadingSpinner";
import Error from "../../components/shared/Error";

const styles = {
  container: {
    height: "90vh",
    bgcolor: "white",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  loadingContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
const VideoPlayerPage: React.FC = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { videoData, isLoading, error } = useSelector(
    (state: RootState) => state.content
  );

  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoDataById({ videoId }));
    }
  }, [dispatch, videoId]);

  if (isLoading || !videoData) {
    return (
      <Box sx={styles.loadingContainer}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorContainer}>
        <Error message={error} />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <VideoPlayer
        videoUrl={videoData?.video}
        thumbnail={videoData?.thumbnail}
        videoId={videoData?._id}
        title={videoData?.title}
        duration={videoData?.duration}
        description={videoData?.description}
      />
    </Box>
  );
};

export default VideoPlayerPage;
