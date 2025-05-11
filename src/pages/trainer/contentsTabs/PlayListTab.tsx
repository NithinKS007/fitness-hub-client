import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useContent from "../../../hooks/useTrainerContent";
import PlayListModal from "../../../components/modals/PlayListModal";
import ReuseTable from "../../../components/table/ReuseTable";
import ShimmerTableLoader from "../../../components/table/ShimmerTable";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { TableColumn } from "../../../types/tableTypes";
import SearchBarTable from "../../../components/table/SearchBarTable";
import TableFilter from "../../../components/table/TableFilter";
import DateAndTimeFilter from "../../../components/table/DateFilter";
import useSearchFilter from "../../../hooks/useSearchFilterTable";
import { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { getPlayListsOfTrainer, updatePlayListPrivacyStatus } from "../../../redux/content/contentThunk";
import PaginationTable from "../../../components/PaginationTable";
import { PlayList } from "../../../redux/content/contentTypes";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/modals/ConfirmationModalDialog";

const playListColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Title", field: "title" },
  { label: "Date Of Publishing", field: "dateOfPublishing" },
  { label: "Public Access", field: "isBlocked" },
  { label: "No of videos", field: "videoCount" },
  { label: "Actions", field: "actions" },
];

const playListfilter = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
];

const PlaylistSection = () => {
  const [anchorPlayListEl, setAnchorPlayListEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlayList | null>(null)
  const { isLoading, error, playLists, pagination } = useSelector(
    (state: RootState) => state.content
  );

  const {
    open: confirmationModalOpen,
    handleOpen: handleConfirmationModalOpen,
    handleClose: handleConfirmationModalClose,
  } = useModal();

  const dispatch = useDispatch<AppDispatch>();

  const { totalPages, currentPage } = pagination;

  const {
    playListFormik,
    modalPlayListHandleClose,
    modalPlayListHandleOpen,
    modalPlayListOpen,
    isEditMode, 
    handleEditPlayList,
  } = useContent();
  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
    getQueryParams,
  } = useSearchFilter();

  const openMenuPlayList = Boolean(anchorPlayListEl);

  const handlePlayListMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorPlayListEl(event.currentTarget);
    setSelectedPlaylistId(id);
  };

  const handlePlayListCloseMenu = () => {
    setAnchorPlayListEl(null);
    setSelectedPlaylistId(null);
  };

  const editPlaylist = (id: string) => {
    const playlistToEdit = playLists.find((p) => p._id === id);
    if (playlistToEdit) {
      handleEditPlayList(playlistToEdit);
    }
    handlePlayListCloseMenu();
  };

  const handleBlockAction = (playlist: PlayList) => {
    setSelectedPlaylist(playlist);
    handleConfirmationModalOpen();
    handlePlayListCloseMenu();
  };

  const handleConfirmBlockStatus = async () => {
    if (selectedPlaylist) {
      try {
        const response = await dispatch(
          updatePlayListPrivacyStatus({
            playListId: selectedPlaylist._id,
            privacy: !selectedPlaylist.privacy,
          })
        ).unwrap();

        console.log("Playlist privacy toggle successful:", response);
        handleConfirmationModalClose();
      } catch (error) {
        console.error("Error toggling playlist privacy:", error);
      }
    }
  };

  useEffect(() => {
    dispatch(getPlayListsOfTrainer(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const fetchedPlayLists =
    playLists.length > 0
      ? playLists.map((list, index) => {
          const dateObj = new Date(list?.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...list,
            slno: index + 1 + (currentPage - 1) * 9,
            title: list.title,
            isBlocked:list.privacy,
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
                  <MenuItem onClick={() => handleBlockAction(list)}>
                    {list?.privacy ? "Make Public" : "Make Private"}
                  </MenuItem>
                </Menu>
              </>
            ),
          };
        })
      : [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 1.5,
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
            filter={playListfilter}
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
            onClick={modalPlayListHandleOpen}
            sx={{
              backgroundColor: "#1f2937",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
              minWidth: "150px",
              minHeight: "41px",
            }}
          >
            Create Playlist
          </Button>
        </Box>
      </Box>
      {isLoading ? (
        <ShimmerTableLoader columns={playListColumns} />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <ReuseTable columns={playListColumns} data={fetchedPlayLists} />
      )}
      <PlayListModal
        formik={playListFormik}
        open={modalPlayListOpen as boolean}
        onClose={modalPlayListHandleClose}
        isEditMode={isEditMode as boolean}
      />
      <PaginationTable
        handlePageChange={handlePageChange}
        page={currentPage}
        totalPages={totalPages}
      />
      <ConfirmationModalDialog
        open={confirmationModalOpen as boolean}
        content={
          (selectedPlaylist &&
            `Are you sure you want to make ${
              selectedPlaylist.privacy ? "public" : "private"
            } ${selectedPlaylist.title}?`) as string
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

export default PlaylistSection;
