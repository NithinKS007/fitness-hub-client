import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { isSubscribedToTheTrainer } from "../../redux/subscription/subscriptionThunk";
import {
  fetchVideosByTrainerUser,
  getPlayListsAvailableByTrainerId,
} from "../../redux/content/contentThunk";
import { Box, Typography, Container } from "@mui/material";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import PaginationTable from "../../components/PaginationTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import SearchVideoGrid from "../../components/SearchVideoGrid";
import VideoFilter from "../../components/VideoGridFilter";
import VideoCard from "../../components/VideoCard";
import useIsUserSubscribedToTrainer from "../../hooks/useIsUserSubscribedToTrainer";

const styles = {
  loaderBox: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noVideosText: {
    textAlign: "center",
    padding: "40px 0",
    fontSize: {
      xs: "14px",
      sm: "16px",
    },
    color: "#888",
  },
  searchFilterContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "22px",
    marginTop: 2,
  },
  filterWrapper: {
    display: "flex",
    justifyContent: "end",
    gap: 2,
    alignItems: "center",
    width: "100%",
    marginLeft: "auto",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mb: 2,
  },
};

const TrainerVideosGrid: React.FC = () => {
  const { trainerId } = useParams<{ trainerId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    getQueryParams,
  } = useSearchFilter();

  useEffect(() => {
    if (trainerId) {
      const queryParams = getQueryParams();
      queryParams.limit = 12;
      dispatch(fetchVideosByTrainerUser({ trainerId, ...queryParams }));
      dispatch(getPlayListsAvailableByTrainerId({ trainerId }));
      dispatch(isSubscribedToTheTrainer(trainerId));
    }
  }, [
    dispatch,
    trainerId,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
  ]);

  const {
    videos: videosData,
    playLists: playListsData,
    isLoading,
    pagination: { currentPage, totalPages },
  } = useSelector((state: RootState) => state.content);

  const { isLoading: isSubscriptionLoading } = useSelector(
    (state: RootState) => state.subscription
  );
  const isHeSubscribedToTheTrainer = useIsUserSubscribedToTrainer(
    trainerId as string
  );

  const handleVideoClick = (videoId: string) => {
    navigate(`/user/trainer/video/${videoId}`);
  };

  const fetchedPlayListsData =
    playListsData.length > 0
      ? playListsData.map((p) => {
          return { value: p.title, playListId: p._id };
        })
      : [];

  return (
    <>
      <Box sx={styles.searchFilterContainer}>
        <SearchVideoGrid
          searchTerm={searchTerm as string}
          handleSearchChange={handleSearchChange}
        />
        <Box sx={styles.filterWrapper}>
          <VideoFilter
            selectedFilter={selectedFilter as string[]}
            filter={fetchedPlayListsData}
            handleFilterChange={handleFilterChange}
          />
        </Box>
      </Box>

      {isLoading || isSubscriptionLoading ? (
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner />
        </Box>
      ) : (
        <>
          <Container maxWidth={false}>
            {isHeSubscribedToTheTrainer ? (
              videosData && videosData.length > 0 ? (
                <VideoCard
                  videos={videosData}
                  onVideoClick={handleVideoClick}
                />
              ) : (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={styles.noVideosText}
                >
                  No videos available
                </Typography>
              )
            ) : (
              <Box sx={styles.noVideosText}>
                <Typography variant="h6" color="text.secondary">
                  Please subscribe to watch videos
                </Typography>
              </Box>
            )}
          </Container>
          {isHeSubscribedToTheTrainer &&
            videosData &&
            videosData.length > 0 && (
              <Box sx={styles.paginationContainer}>
                <PaginationTable
                  handlePageChange={handlePageChange}
                  page={currentPage}
                  totalPages={totalPages}
                />
              </Box>
            )}
        </>
      )}
    </>
  );
};

export default TrainerVideosGrid;
