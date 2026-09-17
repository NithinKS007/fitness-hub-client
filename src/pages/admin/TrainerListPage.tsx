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
import PaginationTable from "../../components/Pagination";
import useSearchFilter from "../../hooks/useSearchFilter";
import Box from "@mui/material/Box";
import { useModal } from "../../hooks/useModal";
import ConfirmationModalDialog from "../../components/modals/ConfirmationModalDialog";
import { TableColumn, Filter } from "../../types/tableTypes";
import NavigationTabs from "../../components/Tabs";
import Error from "../../components/shared/Error";
import {
  GetApprovalStatusIcon,
  GetBlockStatusIcon,
  GetProfilePic,
  GetVerificationStatusIcon,
} from "../../components/icons/IconIndex";

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
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrainerId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTrainerId(null);
  };

  const handleTrainerDetails = async (id: string) => {
    navigate(`/admin/trainer-details/${id}`);
    handleMenuClose();
  };

  const handleTrainerSubscriptions = (id: string) => {
    navigate(`/admin/trainer-subscriptions/${id}`);
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
        id: selectedTrainer.trainerDetails.userId,
        isBlocked: !selectedTrainer.isBlocked,
      });
      handleConfirmationModalClose();
      handleMenuClose();
    }
  };
  const fetchedTrainersData =
    trainers?.length > 0
      ? trainers.map((trainer: Trainer, index: number) => {
          const dateObj = trainer?.createdAt
            ? new Date(trainer.createdAt)
            : null;

          const formattedDate = dateObj
            ? dateObj.toLocaleDateString("en-GB")
            : "N/A";
          const formattedTime = dateObj
            ? dateObj.toLocaleTimeString("en-GB")
            : "N/A";
          const isBlocked =
            typeof trainer?.isBlocked === "boolean"
              ? GetBlockStatusIcon(trainer?.isBlocked)
              : "N/A";

          const verified =
            trainer?.otpVerified || trainer?.googleVerified
              ? GetVerificationStatusIcon(true)
              : "N/A";

          const isApproved =
            trainer?.trainerDetails?.isApproved !== undefined
              ? GetApprovalStatusIcon(trainer.trainerDetails.isApproved)
              : "N/A";
          const profilePic = GetProfilePic(trainer.profilePic);
          return {
            ...trainer,
            profilePic: profilePic,
            name: `${trainer.fname} ${trainer.lname}`,
            slno: index + 1 + (currentPage - 1) * 9,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: verified,
            isApproved: isApproved,
            isBlocked: isBlocked,
            details: (
              <>
                <IconButton
                  onClick={(e) => handleMenuClick(e, trainer.id)}
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
                    open={isMenuOpen && selectedTrainerId === trainer?.id}
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
                      onClick={() => handleTrainerDetails(trainer?.trainerDetails.userId)}
                    >
                      Details
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleTrainerSubscriptions(trainer?.id)}
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
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <SearchBarTable
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              gap={1}
            >
              <TableFilter
                filter={filter}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
              />
            </Box>
          </Box>

          {isLoading ? (
            <ShimmerTableLoader columns={columns} />
          ) : error ? (
            <Error message={error} />
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
            open={confirmationModalOpen}
            content={
              selectedTrainer
                ? `Are you sure you want to ${
                    selectedTrainer.isBlocked ? "unblock" : "block"
                  } ${selectedTrainer.fname} ${selectedTrainer.lname}?`
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
