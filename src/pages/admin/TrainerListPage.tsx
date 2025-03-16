import React, { useEffect, useState } from "react";
import ReuseTable from "../../components/ReuseTable";
import { useDispatch } from "react-redux";
import { getTrainers } from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Trainer } from "../../redux/auth/authTypes";
import Filter from "../../components/Filter";
import SearchBarTable from "../../components/SearchBarTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import useUpdateBlockStatus from "../../hooks/useUpdateBlockStatus";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, Paper } from "@mui/material"; 
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
  { label: "Approved", field: "isApproved" },
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
  { value: "Approved" },
  { value: "Not Approved" },
];
const direction: DirectionOption[] = [{ value: "A to Z" }, { value: "Z to A" }];

const TrainerListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trainers, loading, error } = useSelector((state: any) => state.admin);
  const navigate = useNavigate();
  const handleUpdateBlockStatus = useUpdateBlockStatus();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(
    null
  );
  const open = Boolean(anchorEl);

  const fetchTrainers = async () => {
    await dispatch(getTrainers());
  };

  useEffect(() => {
    fetchTrainers();
  }, [dispatch]);

  const handleTrainerDetails = (_id: string) => {
    navigate(`/admin/trainer-details/${_id}`);
    handleClose();
  };

  const handleTrainerSubscriptions = (_id: string) => {
    navigate(`/admin/trainer-subscriptions/${_id}`);
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

  if (loading) return <ShimmerTableLoader columns={columns} />;
  if (error) return <div>{error}</div>;

  

  const fetchedTrainersData =
    trainers.length > 0
      ? trainers.map((trainer: Trainer, index: number) => {
          const dateObj = new Date(trainer.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          return {
            ...trainer,
            slno: index + 1,
            createdAt: `${formattedDate} ${formattedTime}`,
            verified: trainer.otpVerified || trainer.googleVerified,
            isApproved: trainer?.isApproved,
            details: (
              <>
                <IconButton
                  onClick={(event) => handleClick(event, trainer?._id as string)}
                  aria-label="More options"
                >
                  <MoreVertIcon />
                </IconButton>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={open && selectedTrainerId === trainer?._id}
                    onClose={handleClose}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => handleTrainerDetails(trainer?._id as string)}
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
                    <MenuItem
                      onClick={() =>
                        handleUpdateBlockStatus({
                          _id: trainer.userId,
                          isBlocked: !trainer.isBlocked,
                        })
                      }
                    >
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBarTable />
        <Filter sort={sort} filter={filter} direction={direction} />
      </div>
      <ReuseTable
        columns={columns}
        data={fetchedTrainersData}
      />
    </>
  );
};

export default TrainerListPage;
