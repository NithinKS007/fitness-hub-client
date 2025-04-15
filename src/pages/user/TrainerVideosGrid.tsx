import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { isSubscribedToTheTrainer } from "../../redux/subscription/subscriptionThunk";
import {
  fetchVideosByTrainerUser,
  getPlayListsAvailableByTrainerId,
} from "../../redux/content/contentThunk";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import { getRelativeTime, formatVideoDuration } from "../../utils/conversion";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import SearchBarTable from "../../components/SearchBarTable";
import TableFilter from "../../components/TableFilter";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";
import { Dayjs } from "dayjs";
import PaginationTable from "../../components/PaginationTable";
import LoadingSpinner from "../../components/LoadingSpinner";

const styles = {
  loaderBox: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  videoWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "9px",  
    margin: "0",
    width: "100%", 
  },
  cardContainer: {
    width: "32.90%",
    cursor: "pointer",
    backgroundColor: "#fff",
    "&:hover": {
      transform: "scale(1.02)",
      transition: "transform 0.2s ease-in-out",
    },
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
  title: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    color: "#030303",
  },
  metadata: {
    fontSize: "12px",
    color: "#606060",
  },
  noVideosText: {
    textAlign: "center",
    padding: "40px 0",
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
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
  } = useSearchFilter();

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchVideosByTrainerUser({ trainerId, ...getQueryParams() }));
      dispatch(getPlayListsAvailableByTrainerId({ trainerId }));
      dispatch(isSubscribedToTheTrainer(trainerId));
    }
  }, [
    dispatch,
    trainerId,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
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

  const isHeSubscribedToTheTrainer = useSelector((state: RootState) =>
    trainerId
      ? (state.subscription.isSubscribedToTheTrainer?.[trainerId]
          ?.isSubscribed ?? false)
      : false
  );

  const handleVideoClick = (videoId: string) => {
    navigate(`/user/trainer-videos/${videoId}/`);
  };

  const fetchedPlayListsData =
    playListsData.length > 0
      ? playListsData.map((p) => {
          return { value: p.title };
        })
      : [];

  if (isLoading || isSubscriptionLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
          px: 2,
        }}
      >
        <SearchBarTable
          searchTerm={searchTerm as string}
          handleSearchChange={handleSearchChange}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <TableFilter
            selectedFilter={selectedFilter as string[]}
            filter={fetchedPlayListsData}
            handleFilterChange={handleFilterChange}
          />
          <DateAndTimeFilter
            fromDate={fromDate as Dayjs | null}
            toDate={toDate as Dayjs | null}
            onFromDateChange={handleFromDateChange}
            onToDateChange={handleToDateChange}
            onReset={handleResetDates}
          />
        </Box>
      </Box>
      <Container
        maxWidth={false}
        sx={{ py: 5, px: 0 }} 
      >
        {isHeSubscribedToTheTrainer ? (
          videosData && videosData.length > 0 ? (
            <Box sx={styles.videoWrapper}>
              {videosData.map((video) => (
                <Card
                  key={video._id}
                  sx={styles.cardContainer}
                  onClick={() => handleVideoClick(video._id)}
                  elevation={0}
                >
                  <Box sx={styles.thumbnailWrapper}>
                    <CardMedia
                      component="img"
                      image={`${video.thumbnail}?t=0`}
                      alt={video.title}
                      sx={styles.thumbnail}
                    />
                    <Box sx={styles.durationOverlay}>
                      {formatVideoDuration(video.duration)}
                    </Box>
                  </Box>
                  <CardContent sx={{ padding: "8px 8px" }}>
                    <Typography sx={styles.title}>
                      {video.title}
                    </Typography>
                    <Typography sx={styles.metadata}>
                      {getRelativeTime(new Date(video.createdAt))}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
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
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
        <PaginationTable
          handlePageChange={handlePageChange}
          page={currentPage}
          totalPages={totalPages}
        />
      </Box>
    </>
  );
};

export default TrainerVideosGrid;