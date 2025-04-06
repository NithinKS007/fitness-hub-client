import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useContent from "../../../hooks/useTrainerContent";
import VideoUpload from "../../../components/VideoUploadModal";
import ReuseTable from "../../../components/ReuseTable";
import ShimmerTableLoader from "../../../components/ShimmerTable";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { TableColumn } from "../../../types/tableTypes";
import SearchBarTable from "../../../components/SearchBarTable";
import TableFilter from "../../../components/TableFilter";
import DateAndTimeFilter from "../../../components/DateAndTimeFilter";
import useSearchFilter from "../../../hooks/useSearchFilterTable";
import {
  getUploadedVideosOfTrainer,
  getPlayListsOfTrainer,
  updateVideoPrivacyStatus,
} from "../../../redux/content/contentThunk";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import PaginationTable from "../../../components/PaginationTable";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/ConfirmationModalDialog";
import { Video } from "../../../redux/content/contentTypes";

const videoColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Thumbnail", field: "thumbnail" },
  { label: "Title", field: "title" },
  { label: "Publicly Accessible", field: "isBlocked" },
  { label: "Description", field: "description" },
  { label: "Date Of Publishing", field: "dateOfPublishing" },
  { label: "Actions", field: "actions" },
];

const videofilter = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
];

const VideoSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorVideoEl, setAnchorVideoEl] = useState<null | HTMLElement>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { isLoading, error, videos, playLists, pagination } = useSelector(
    (state: RootState) => state.content
  );

  const { totalPages, currentPage } = pagination;
  const {
    videoFormik,
    modalVideoHandleClose,
    modalVideoHandleOpen,
    modalVideoOpen,
    handleVideoChange,
    handleThumbnailChange,
  } = useContent();

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

  const {
    open: confirmationModalOpen,
    handleOpen: handleConfirmationModalOpen,
    handleClose: handleConfirmationModalClose,
  } = useModal();

  const openMenuVideo = Boolean(anchorVideoEl);

  const handleVideoMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorVideoEl(event.currentTarget);
    setSelectedVideoId(id);
  };

  const handleVideoCloseMenu = () => {
    setAnchorVideoEl(null);
    setSelectedVideoId(null);
  };

  const editVideo = (id: string) => {
    console.log("Edit Video", id);
    handleVideoCloseMenu();
  };
  const handleBlockAction = (video: Video) => {
    setSelectedVideo(video);
    handleConfirmationModalOpen();
    handleVideoCloseMenu();
  };

  const handleConfirmBlockStatus = async () => {
    if (selectedVideo) {
      try {
        const response = await dispatch(
          updateVideoPrivacyStatus({
            videoId: selectedVideo._id,
            privacy: !selectedVideo.privacy,
          })
        ).unwrap();

        console.log("Video privacy toggle successful:", response);
        handleConfirmationModalClose();
      } catch (error) {
        console.error("Error toggling video privacy:", error);
      }
    }
  };

  useEffect(() => {
    dispatch(getUploadedVideosOfTrainer(getQueryParams()));
    dispatch(getPlayListsOfTrainer(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const fetchedVideos =
    videos.length > 0
      ? videos.map((v, index) => {
          const dateObj = new Date(v?.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...v,
            slno: index + 1,
            title: v.title,
            privacy: v.privacy,
            description: v.description,
            isBlocked: v.privacy,
            dateOfPublishing: `${formattedDate} ${formattedTime}`,
            thumbnail: (
              <img
                src={v.thumbnail}
                alt={v.title}
                style={{ width: "54px", height: "auto", borderRadius: "4px" }}
              />
            ),
            actions: (
              <>
                <IconButton
                  onClick={(event) => handleVideoMenuClick(event, v._id)}
                  sx={{
                    padding: "2px",
                    minWidth: "0",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorVideoEl}
                  open={openMenuVideo && selectedVideoId === v._id}
                  onClose={handleVideoCloseMenu}
                  sx={{
                    "& .MuiPaper-root": {
                      boxShadow: "none",
                      border: "1px solid",
                      borderColor: "grey.400",
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem onClick={() => editVideo(v._id)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleBlockAction(v)}>
                    {v?.privacy ? "Make Public" : "Make Private"}
                  </MenuItem>
                </Menu>
              </>
            ),
          };
        })
      : [];

  const fetchedPlayListsIdAndNames =
    playLists.length > 0
      ? playLists.map((list) => ({
          _id: list._id,
          title: list.title,
        }))
      : [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 1,
          alignItems: "center",
          width: "100%",
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
            handleFilterChange={handleFilterChange}
            filter={videofilter}
          />
          <DateAndTimeFilter
            fromDate={fromDate as Dayjs | null}
            toDate={toDate as Dayjs | null}
            onFromDateChange={handleFromDateChange}
            onToDateChange={handleToDateChange}
            onReset={handleResetDates}
          />
          <Button
            variant="contained"
            onClick={modalVideoHandleOpen}
            sx={{
              backgroundColor: "black",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
              minWidth: "150px",
              minHeight: "41px",
            }}
          >
            Create Video
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <ShimmerTableLoader columns={videoColumns} />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <>
          <ReuseTable columns={videoColumns} data={fetchedVideos} />
          <PaginationTable
            handlePageChange={handlePageChange}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
      <VideoUpload
        formik={videoFormik}
        open={modalVideoOpen as boolean}
        onClose={modalVideoHandleClose}
        isEditMode={false}
        playLists={fetchedPlayListsIdAndNames}
        handleVideoChange={handleVideoChange}
        handleThumbnailChange={handleThumbnailChange}
      />
      <ConfirmationModalDialog
        open={confirmationModalOpen as boolean}
        content={
          (selectedVideo &&
            `Are you sure you want to ${
              selectedVideo.privacy ? "public" : "private"
            } ${selectedVideo.title} ?`) as string
        }
        onConfirm={handleConfirmBlockStatus}
        onCancel={handleConfirmationModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="success"
        cancelColor="error"
      />
    </>
  );
};

export default VideoSection;
