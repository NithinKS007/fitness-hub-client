import React, { useEffect, useState } from "react";
import ReuseTable from "../../components/ReuseTable";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { User } from "../../redux/auth/authTypes";
import Filter from "../../components/Filter";
import SearchBarTable from "../../components/SearchBarTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import useUpdateBlockStatus from "../../hooks/useUpdateBlockStatus";
import { IconButton, Menu, MenuItem, Paper } from "@mui/material"; // Added Menu and MenuItem
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface TableColumn {
  label: string;
  field: string;
}
interface SortOption {
  value: string;
}

interface FilterOption {
  value: string;
}

interface DirectionOption {
  value: string;
}

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Image", field: "profilePic" },
  { label: "First Name", field: "fname" },
  { label: "Last Name", field: "lname" },
  { label: "Email", field: "email" },
  { label: "Status", field: "isBlocked" },
  { label: "Join Date", field: "createdAt" },
  { label: "Verified", field: "verified" },
  { label: "Details", field: "details" },
];

const sort: SortOption[] = [
  { value: "First Name" },
  { value: "Last Name" },
  { value: "Email" },
  { value: "Join Date" },
];
const filter: FilterOption[] = [
  { value: "All" },
  { value: "Block" },
  { value: "Unblock" },
  { value: "verified" },
  { value: "Not verified" },
];
const direction: DirectionOption[] = [{ value: "A to Z" }, { value: "Z to A" }];
const UsersListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: any) => state.admin);

  const handleUpdateBlockStatus = useUpdateBlockStatus();
  const fetchUsers = async () => {
    await dispatch(getUsers());
  };

    // State for menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
      null
    );
    const open = Boolean(anchorEl);

  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, [dispatch]);

  const handleUserDetails = (_id: string) => {
    navigate(`/admin/user-details/${_id}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, _id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrainerId(_id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTrainerId(null);
  };


  if (loading) return <ShimmerTableLoader columns={columns} />;
  if (error) return <div>{error}</div>;

  const usersData =
    users.length > 0
      ? users.map((user: User, index: number) => {
          const dateObj = new Date(user.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...user,
            slno: index + 1,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: user.otpVerified || user.googleVerified,
            details: (
              <>
                <IconButton
                  onClick={(event) =>
                    handleClick(event, user?._id as string)
                  }
                  aria-label="More options"
                >
                  <MoreVertIcon />
                </IconButton>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={open && selectedTrainerId === user?._id}
                    onClose={handleClose}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        handleUserDetails(user?._id as string)                      }
                    >
                      Details
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBarTable />
        <Filter sort={sort} filter={filter} direction={direction} />
      </div>
      <ReuseTable
        columns={columns}
        data={usersData}
        handleUpdateBlockStatus={handleUpdateBlockStatus}
      />
    </>
  );
};

export default UsersListPage;
