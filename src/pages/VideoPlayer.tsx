import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchVideoDataById,
  relatedVideosDataByPayListId,
} from "../redux/content/contentThunk";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getRelativeTime , formatVideoDuration } from "../utils/conversion";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playListId, trainerId, videoId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state?.auth?.user);
  const isLoggedIn = user ? true : false;

  const { videoData, isLoading, error } = useSelector(
    (state: RootState) => state.content
  );

  useEffect(() => {
    if (videoId && playListId) {
      dispatch(fetchVideoDataById({ videoId }));
      dispatch(relatedVideosDataByPayListId({ playListId }));
    }
  }, [dispatch, videoId, playListId]);

  const { relatedVideosData } = useSelector(
    (state: RootState) => state.content
  );
  let isHeSubscribedToTheTrainer: boolean = false;
  if (trainerId) {
    isHeSubscribedToTheTrainer = useSelector(
      (state: RootState) =>
        state.subscription.isSubscribedToTheTrainer?.[trainerId].isSubscribed ||
        false
    );
  }

  const shouldRender = () => {
    if (isLoggedIn && playListId && trainerId && isHeSubscribedToTheTrainer) {
      return true;
    }
    if (isLoggedIn && playListId && trainerId ) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "blue" }} />
      </Box>
    );
  }

  if (error) {
    <Box
    sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {error}
  </Box>
  }

  return (
    shouldRender() ? (
      <div className="bg-white min-h-screen p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:flex-8 w-full md:w-auto">
            <div className="w-full bg-white aspect-w-16 aspect-h-9 overflow-hidden relative">
              {videoData ? (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  key={videoData._id}
                  poster={videoData.thumbnail}
                >
                  <source src={videoData.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-600">No video available</p>
                </div>
              )}
            </div>
  
            <div className="p-4">
              <h1 className="text-2xl font-medium mb-2">
                {videoData?.title || "Untitled Video"}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-gray-600 text-sm">
                  {formatVideoDuration(videoData?.duration)}
                </p>
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">
                {videoData?.description || "No description available"}
              </p>
            </div>
          </div>
  
          <div className="md:flex-4 w-full md:w-auto  cursor-pointer">
            {relatedVideosData.map((video) => (
              <div
                key={video._id}
                className="flex gap-4 mb-4 p-2 rounded-lg items-center"
              >
                <Link
                  to={`/workout-video/${playListId}/${trainerId}/${video._id}`}
                  className="no-underline text-inherit"
                >
                  <div
                    className="w-30 h-20 bg-gray-300 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  ></div>
                </Link>
  
                <div className="flex flex-col justify-center">
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-gray-600">
                    • {getRelativeTime (new Date(video.createdAt))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : null
  );
  
};

export default VideoPlayer;
