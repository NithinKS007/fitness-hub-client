import React, { useEffect, useState } from "react";
import ReuseTable from "../../components/table/ReuseTable";
import { useDispatch } from "react-redux";
import { getTrainers } from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Trainer } from "../../redux/auth/authTypes";
import SearchBarTable from "../../components/table/SearchBarTable";
import ShimmerTableLoader from "../../components/table/ShimmerTable";
import useUpdateBlockStatus from "../../hooks/useUpdateBlockStatus";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, Paper } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableFilter from "../../components/table/TableFilter";
import PaginationTable from "../../components/PaginationTable";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import Box from "@mui/material/Box";
import { useModal } from "../../hooks/useModal";
import ConfirmationModalDialog from "../../components/modals/ConfirmationModalDialog";
import { TableColumn, Filter } from "../../types/tableTypes";
import NavigationTabs from "../../components/Tabs";
import Error from "../../components/shared/Error";

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Account Status", field: "isBlocked" },
  { label: "Date Joined", field: "createdAt" },
  { label: "Verification Status", field: "verified" },
  { label: "Approval Status", field: "isApproved" },
  { label: "More", field: "details" },
];

const filter: Filter[] = [
  { value: "All" },
  { value: "Block" },
  { value: "Unblock" },
  { value: "verified" },
  { value: "Not verified" },
  { value: "Approved" },
  { value: "Not Approved" },
];

const tabItems = [{ label: "Trainers" }];
const TrainerListPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setSelectedTab(newValue);
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { handleUpdateBlockStatus } = useUpdateBlockStatus();
  const { trainers, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.admin.pagination
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
    null
  );
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const isMenuOpen = Boolean(anchorEl);

  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    getQueryParams,
  } = useSearchFilter();
  const {
    open: confirmationModalOpen,
    handleOpen: handleConfirmationModalOpen,
    handleClose: handleConfirmationModalClose,
  } = useModal();

  useEffect(() => {
    dispatch(getTrainers(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
  ]);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    _id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrainerId(_id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTrainerId(null);
  };

  const handleTrainerDetails = async (_id: string) => {
    navigate(`/admin/trainer-details/${_id}`);
    handleMenuClose();
  };

  const handleTrainerSubscriptions = (_id: string) => {
    navigate(`/admin/trainer-subscriptions/${_id}`);
    handleMenuClose();
  };

  const handleBlockAction = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    handleConfirmationModalOpen();
    handleMenuClose();
  };
  const handleConfirmBlockStatus = () => {
    if (selectedTrainer) {
      handleUpdateBlockStatus({
        _id: selectedTrainer.userId,
        isBlocked: !selectedTrainer.isBlocked,
      });
      handleConfirmationModalClose();
      handleMenuClose();
    }
  };
  const fetchedTrainersData =
    trainers?.length > 0
      ? trainers.map((trainer: Trainer, index: number) => {
          const dateObj = new Date(trainer.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...trainer,
            name: `${trainer.fname} ${trainer.lname}`,
            slno: index + 1 + (currentPage - 1) * 9,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: trainer.otpVerified || trainer.googleVerified,
            isApproved: trainer?.isApproved,
            details: (
              <>
                <IconButton
                  onClick={(e) => handleMenuClick(e, trainer._id as string)}
                  aria-label="More options"
                  sx={{
                    padding: "16px",
                    minWidth: "0",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen && selectedTrainerId === trainer?._id}
                    onClose={handleMenuClose}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: "1px solid",
                        borderColor: "grey.400",
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        handleTrainerDetails(trainer?._id as string)
                      }
                    >
                      Details
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleTrainerSubscriptions(trainer?._id as string)
                      }
                    >
                      Subscriptions
                    </MenuItem>
                    <MenuItem onClick={() => handleBlockAction(trainer)}>
                      {trainer.isBlocked ? "Unblock" : "Block"}
                    </MenuItem>
                  </Menu>
                </Paper>
              </>
            ),
          };
        })
      : [];

  return (
    <>
      <NavigationTabs
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      {selectedTab === 0 && (
        <>
          <Box sx={{mt:3, display: "flex", justifyContent: "space-between" }}>
            <SearchBarTable
              searchTerm={searchTerm as string}
              handleSearchChange={handleSearchChange}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              gap={1}
            >
              <TableFilter
                filter={filter}
                selectedFilter={selectedFilter as string[]}
                handleFilterChange={handleFilterChange}
              />
            </Box>
          </Box>

          {isLoading ? (
            <ShimmerTableLoader columns={columns} />
          ) : error ? (
            <Error message={error as string} />
          ) : (
            <>
              <ReuseTable columns={columns} data={fetchedTrainersData} />
              <PaginationTable
                handlePageChange={handlePageChange}
                page={currentPage}
                totalPages={totalPages}
              />
            </>
          )}

          <ConfirmationModalDialog
            open={confirmationModalOpen as boolean}
            content={
              selectedTrainer
                ? `Are you sure you want to ${selectedTrainer.isBlocked ? "unblock" : "block"} ${selectedTrainer.fname} ${selectedTrainer.lname}?`
                : "Are you sure you want to proceed?"
            }
            onConfirm={handleConfirmBlockStatus}
            onCancel={handleConfirmationModalClose}
            confirmText="Yes"
            cancelText="No"
            confirmColor="success"
            cancelColor="error"
          />
        </>
      )}
    </>
  );
};

export default TrainerListPage;
