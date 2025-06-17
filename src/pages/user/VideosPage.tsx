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
import useSearchFilter from "../../hooks/useSearchFilter";
import PaginationTable from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import VideoCard from "../../components/videos/VideoCard";
import useIsUserSubscribedToTrainer from "../../hooks/useIsUserSubscribedToTrainer";
import Error from "../../components/shared/Error";
import SearchBarTable from "../../components/table/SearchBarTable";
import TableFilter from "../../components/table/TableFilter";

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
    marginRight: 3,
    marginLeft: 2,
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

const VideosPage: React.FC = () => {
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
      queryParams.limit = 8;
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
    error: videoError,
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
          return { value: p.title, _id: p._id };
        })
      : [];

  if (videoError) {
    return <Error message={videoError} />;
  }

  return (
    <>
      <Box sx={styles.searchFilterContainer}>
        <SearchBarTable
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Box sx={styles.filterWrapper}>
          <TableFilter
            selectedFilter={selectedFilter}
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
            {isHeSubscribedToTheTrainer && videosData?.length > 0 ? (
              <>
                <div
                  className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                lg:grid-cols-4 gap-4 w-full box-border"
                >
                  {videosData.map((video) => (
                    <VideoCard
                      key={video._id}
                      video={video}
                      onVideoClick={handleVideoClick}
                    />
                  ))}
                </div>

                <Box sx={styles.paginationContainer}>
                  <PaginationTable
                    handlePageChange={handlePageChange}
                    page={currentPage}
                    totalPages={totalPages}
                  />
                </Box>
              </>
            ) : isHeSubscribedToTheTrainer ? (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={styles.noVideosText}
              >
                No videos available
              </Typography>
            ) : (
              <Box sx={styles.noVideosText}>
                <Typography variant="h6" color="text.secondary">
                  Please subscribe to watch videos
                </Typography>
              </Box>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default VideosPage;
