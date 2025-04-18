import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchVideoDataById } from "../../redux/content/contentThunk";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReuseableVideoPlayer from "../../components/ReuseableVideoPlayer";
import LoadingSpinner from "../../components/LoadingSpinner";
import Error from "../../components/Error";

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
  noVideo: {
    width: "100%",
    height: "100%",
    maxHeight: { xs: "50vh", md: "90vh" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "grey.200",
  },
};
const TrainerVideo: React.FC = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { videoData, isLoading, error } = useSelector(
    (state: RootState) => state.content
  );

  React.useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoDataById({ videoId }));
    }
  }, [dispatch, videoId]);

  if (isLoading) {
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
      {videoData?.video ? (
        <ReuseableVideoPlayer
          videoUrl={videoData.video}
          thumbnail={videoData.thumbnail}
          videoId={videoData._id}
          title={videoData.title}
          duration={videoData.duration}
          description={videoData.description}
        />
      ) : (
        <Box sx={styles.noVideo}>
          <Typography color="text.secondary">No video available</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TrainerVideo;
