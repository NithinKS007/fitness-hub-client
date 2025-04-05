import React, { useEffect, useState } from "react";
import ReuseTable from "../../components/ReuseTable";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { User } from "../../redux/auth/authTypes";
import SearchBarTable from "../../components/SearchBarTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import useUpdateBlockStatus from "../../hooks/useUpdateBlockStatus";
import { Box, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableFilter from "../../components/TableFilter";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import PaginationTable from "../../components/PaginationTable";
import ConfirmationModalDialog from "../../components/ConfirmationModalDialog";
import { useModal } from "../../hooks/useModal";
import { TableColumn,Filter } from "../../types/tableTypes";

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Account Status", field: "isBlocked" },
  { label: "Date Joined", field: "createdAt" },
  { label: "Verification status", field: "verified" },
  { label: "More", field: "details" },
];

const filter: Filter[] = [
  { value: "All" },
  { value: "Block" },
  { value: "Unblock" },
  { value: "verified" },
  { value: "Not verified" },
];
const UsersListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, error } = useSelector(
    (state: RootState) => state.admin
  );

  const { handleUpdateBlockStatus } = useUpdateBlockStatus();
  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.admin.pagination
  );

  const {
    open: confirmationModalOpen,
    handleOpen: handleConfirmationModalOpen,
    handleClose: handleConfirmationModalClose,
  } = useModal();

  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    getQueryParams,
  } = useSearchFilter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
  ]);

  const handleUserDetails = (_id: string) => {
    navigate(`/admin/user-details/${_id}`);
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, _id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrainerId(_id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTrainerId(null);
  };

  const handleBlockAction = (user: User) => {
    setSelectedUser(user);
    handleConfirmationModalOpen();
    handleClose();
  };

  const handleConfirmBlockStatus = () => {
    if (selectedUser) {
      handleUpdateBlockStatus({
        _id: selectedUser._id,
        isBlocked: !selectedUser.isBlocked,
      });
      handleConfirmationModalClose();
      handleClose();
    }
  };

  const usersData =
    users?.length > 0
      ? users.map((user: User, index: number) => {
          const dateObj = new Date(user.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...user,
            name: `${user.fname} ${user.lname}`,
            slno: index + 1 + (currentPage - 1) * 9,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: user.otpVerified || user.googleVerified,
            details: (
              <>
                <IconButton
                  onClick={(event) => handleClick(event, user?._id as string)}
                  aria-label="More options"
                  sx={{
                    padding: "2px", 
                    minWidth: "0",  
                    width: "37px",  
                    height: "37px",
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={open && selectedTrainerId === user?._id}
                    onClose={handleClose}
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
                      onClick={() => handleUserDetails(user?._id as string)}
                    >
                      Details
                    </MenuItem>
                    <MenuItem onClick={() => handleBlockAction(user)}>
                      {user.isBlocked ? "Unblock" : "Block"}
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
      <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
        <SearchBarTable
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }} gap={1}>
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
        <Box>{error}</Box>
      ) : (
        <>
          <ReuseTable columns={columns} data={usersData} />
          {usersData.length > 5 ? (
            <PaginationTable
              handlePageChange={handlePageChange}
              page={currentPage}
              totalPages={totalPages}
            />
          ) : (
            ""
          )}
        </>
      )}
      <ConfirmationModalDialog
        open={confirmationModalOpen}
        content={
          selectedUser &&
          `Are you sure you want to ${
            selectedUser.isBlocked ? "unblock" : "block"
          } ${selectedUser.fname} ${selectedUser.lname} ?`
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

export default UsersListPage;
