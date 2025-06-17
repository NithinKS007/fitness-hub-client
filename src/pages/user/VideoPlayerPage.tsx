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

  if (error) {
    return <Error message={error} />;
  }

  if (isLoading || !videoData) {
    return <LoadingSpinner size={60} thickness={4} />;
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
