import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import PlayList from "../../components/PlayListModal";
import useContent from "../../hooks/useTrainerContent";
import Tabs from "../../components/Tabs";
import ReuseTable from "../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getPlayListsOfTrainer,
  getUploadedVideosOfTrainer,
} from "../../redux/content/contentThunk";
import ShimmerTableLoader from "../../components/ShimmerTable";
import VideoUpload from "../../components/VideoUploadModal";
import { TableColumn, Filter } from "../../types/tableTypes";
import TableFilter from "../../components/TableFilter";
import SearchBarTable from "../../components/SearchBarTable";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";

const videoColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Thumbnail", field: "thumbnail" },
  { label: "Title", field: "title" },
  { label: "Publicly Accessible", field: "isBlocked" },
  { label: "Description", field: "description" },
  { label: "Date Of Publishing", field: "dateOfPublishing" },
  { label: "Actions", field: "actions" },
];
const videofilter: Filter[] = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
];

const playListColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Title", field: "title" },
  { label: "Date Of Publishing", field: "dateOfPublishing" },
  { label: "No of videos", field: "videoCount" },
  { label: "Actions", field: "actions" },
];

const playListfilter: Filter[] = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
];

const tabItems = [{ label: "Videos" }, { label: "Playlists" }];

const AddContentsPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [anchorVideoEl, setAnchorVideoEl] = useState<null | HTMLElement>(null);
  const [anchorPlayListEl, setAnchorPlayListEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { playLists, isLoading, error, videos } = useSelector(
    (state: RootState) => state.content
  );
  const {
    videoFormik,
    modalVideoHandleClose,
    modalVideoHandleOpen,
    modalVideoOpen,

    playListFormik,
    modalPlayListHandleClose,
    modalPlayListHandleOpen,
    modalPlayListOpen,

    handleVideoChange,
    handleThumbnailChange,
  } = useContent();

  const isEditMode = false;
  const openMenuPlayList = Boolean(anchorPlayListEl);
  const openMenuVideo = Boolean(anchorVideoEl);

  useEffect(() => {
    switch (selectedTab) {
      case 0:
        dispatch(getUploadedVideosOfTrainer());
        dispatch(getPlayListsOfTrainer());
        break;
      case 1:
        dispatch(getPlayListsOfTrainer());
        break;
      default:
        break;
    }
  }, [selectedTab, dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handlePlayListMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorPlayListEl(event.currentTarget);
    setSelectedPlaylistId(id);
  };

  const handleVideoMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorVideoEl(event.currentTarget);
    setSelectedVideoId(id);
  };

  const handlePlayListCloseMenu = () => {
    setAnchorPlayListEl(null);
    setSelectedPlaylistId(null);
  };

  const handleVideoCloseMenu = () => {
    setAnchorVideoEl(null);
    setSelectedVideoId(null);
  };

  const editPlaylist = (id: string) => {
    console.log("Edit playlist", id);
    handlePlayListCloseMenu();
  };

  const editVideo = (id: string) => {
    console.log("Edit Video", id);
    handleVideoCloseMenu();
  };

  const togglePlayListBlockStatus = (id: string, isBlocked: boolean) => {
    console.log("Toggle block", id, !isBlocked);
    handlePlayListCloseMenu();
  };
  const toggleVideoBlockStatus = (id: string, isBlocked: boolean) => {
    console.log("Toggle block", id, !isBlocked);
    handleVideoCloseMenu();
  };

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
                  <MenuItem
                    onClick={() => toggleVideoBlockStatus(v?._id, v?.privacy)}
                  >
                    {v?.privacy ? "Public" : "Private"}
                  </MenuItem>
                </Menu>
              </>
            ),
          };
        })
      : [];

  const fetchedPlayLists =
    playLists?.length > 0
      ? playLists.map((list, index) => {
          const dateObj = new Date(list?.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...list,
            slno: index + 1,
            title: list.title,
            videoCount: list?.videoCount ? list.videoCount : 0,
            dateOfPublishing: `${formattedDate} ${formattedTime}`,
            actions: (
              <>
                <IconButton
                  onClick={(event) => handlePlayListMenuClick(event, list._id)}
                  sx={{
                    padding: "16px", 
                    minWidth: "0", 
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorPlayListEl}
                  open={openMenuPlayList && selectedPlaylistId === list._id}
                  onClose={handlePlayListCloseMenu}
                  sx={{
                    "& .MuiPaper-root": {
                      boxShadow: "none",
                      border: "1px solid",
                      borderColor: "grey.400",
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem onClick={() => editPlaylist(list._id)}>
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      togglePlayListBlockStatus(list?._id, list?.privacy)
                    }
                  >
                    {list?.privacy ? "Public" : "Private"}
                  </MenuItem>
                </Menu>
              </>
            ),
          };
        })
      : [];

  const fetchedPlayListsIdAndNames =
    playLists?.length > 0
      ? playLists.map((list) => {
          return {
            ...list,
            _id: list._id,
            title: list.title,
          };
        })
      : [];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
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
                searchTerm={searchTerm}
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
                  selectedFilter={selectedFilter}
                  handleFilterChange={handleFilterChange}
                  filter={playListfilter}
                />
                <DateAndTimeFilter
                  fromDate={fromDate}
                  toDate={toDate}
                  onToDateChange={handleToDateChange}
                  onFromDateChange={handleFromDateChange}
                />
                <Button
                  variant="contained"
                  onClick={modalVideoHandleOpen}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    textTransform: "none",
                    borderRadius: 2,
                      minWidth:"150px",
                  minHeight:"41px"
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
              <ReuseTable columns={videoColumns} data={fetchedVideos} />
            )}

            <VideoUpload
              formik={videoFormik}
              open={modalVideoOpen}
              onClose={modalVideoHandleClose}
              isEditMode={isEditMode}
              playLists={fetchedPlayListsIdAndNames}
              handleVideoChange={handleVideoChange}
              handleThumbnailChange={handleThumbnailChange}
            />
          </>
        );

      case 1:
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginTop: 1,
              }}
            >
              <SearchBarTable
                searchTerm={searchTerm}
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
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
                filter={playListfilter}
              />
              <DateAndTimeFilter
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
                onReset={handleResetDates}
              />
              <Button
                variant="contained"
                onClick={modalPlayListHandleOpen}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                  minWidth:"150px",
                  minHeight:"41px"
                }}
              >
                Create Playlist
              </Button>
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={playListColumns} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <ReuseTable columns={playListColumns} data={fetchedPlayLists} />
            )}
            <PlayList
              formik={playListFormik}
              open={modalPlayListOpen}
              onClose={modalPlayListHandleClose}
              isEditMode={isEditMode}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Tabs
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      {renderContent()}
    </>
  );
};

export default AddContentsPage;
