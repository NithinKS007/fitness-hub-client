import React, { useEffect} from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchVideosByPlayListId } from "../redux/content/contentThunk";
import { isSubscribedToTheTrainer } from "../redux/subscription/subscriptionThunk";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { getRelativeTime ,formatVideoDuration } from "../utils/conversion";

const TrainerVideosGrid: React.FC = () => {
  const { playListId, trainerId } = useParams();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const isLoggedIn = user ? true : false;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (playListId && trainerId) {
      dispatch(fetchVideosByPlayListId({ playListId }));
      dispatch(isSubscribedToTheTrainer(trainerId))
    
    }
  }, [dispatch, playListId, trainerId]);

  const {videos: videosData,isLoading:isVideosLoading} = useSelector((state: RootState) => state.content);
  const { isLoading: isSubscriptionLoading } = useSelector((state: RootState) => state.subscription);

  let isHeSubscribedToTheTrainer: boolean = false;
  if (trainerId) {
    isHeSubscribedToTheTrainer = useSelector(
      (state: RootState) =>
        state.subscription.isSubscribedToTheTrainer?.[trainerId].isSubscribed ||
        false
    );
  }

  const navigate = useNavigate();

  const handleVideoClick = (video: any) => {
    navigate(`/workout-video/${playListId}/${trainerId}/${video._id}/`);
  };

  const shouldRender = () => {
    if (isLoggedIn && playListId && trainerId && isHeSubscribedToTheTrainer) {
      return true;
    }
    return false;
  };
  if (isVideosLoading || isSubscriptionLoading) {
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
  return (
    <>
      {shouldRender() ? (
        <div className="min-h-screen px-4 py-6 md:px-6">
          <div className="mb-8 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search videos..."
              className="w-full px-4 py-3 rounded-full border
               border-gray-200 shadow-sm focus:outline-none 
               focus:border-transparent transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosData?.length > 0 ? (
              videosData.map((video) => (
                <div
                  key={video._id}
                  className="w-full cursor-pointer rounded-lg 
                  overflow-hidden shadow-sm hover:shadow-md 
                  transition-shadow border border-gray-100"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="relative">
                    <img
                      src={`${video.thumbnail}?t=0`}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <span
                      className="absolute bottom-2 right-2 bg-black/70
                     text-white text-xs px-1.5 py-0.5 rounded"
                    >
                      {formatVideoDuration(video.duration)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getRelativeTime (new Date(video.createdAt))}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg">
                No videos available
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          Please subscribe to watch videos
        </div>
      )}
    </>
  );
};

export default TrainerVideosGrid;
