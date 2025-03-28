import React, { useEffect} from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchVideosByPlayListId } from "../redux/content/contentThunk";
import { isSubscribedToTheTrainer } from "../redux/subscription/subscriptionThunk";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const formatDuration = (seconds: number) => {
  const dur = dayjs.duration(seconds, "seconds");
  return `${Math.floor(dur.asMinutes())}:${dur.seconds().toString().padStart(2, "0")}`;
};

const formatRelativeTime = (date: Date) => {
  return dayjs(date).fromNow();
};

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

  const {videos: videosData,isLoading} = useSelector((state: RootState) => state.content);

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

  console.log("is subs",isHeSubscribedToTheTrainer)
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
                      {formatDuration(video.duration)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatRelativeTime(new Date(video.createdAt))}
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
