import React, { useEffect } from "react";
import { TableColumn } from "../../../types/tableTypes";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import useSearchFilter from "../../../hooks/useSearchFilter";
import { getUserTrainersList } from "../../../redux/subscription/subscriptionThunk";
import { useSelector } from "react-redux";
import PaginationTable from "../../../components/Pagination";
import ReuseTable from "../../../components/table/ReuseTable";
import ShimmerTableLoader from "../../../components/table/ShimmerTable";
import { Box } from "@mui/material";
import SearchBarTable from "../../../components/table/SearchBarTable";
import Button from "@mui/material/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useNavigate } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { GetProfilePic } from "../../../components/icons/IconIndex";
import Error from "../../../components/shared/Error";

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Subscription Status", field: "isActive" },
  { label: "Watch Videos", field: "watchVideos" },
  { label: "Book Appointment", field: "BookAppointment" },
];

interface MyTrainersTabProp {
  isActive: boolean;
}

const MyTrainersTab: React.FC<MyTrainersTabProp> = ({ isActive }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { handlePageChange, searchTerm, handleSearchChange, getQueryParams } =
    useSearchFilter();

  const handleShowTrainerVideos = async (trainerId: string) => {
    navigate(`/user/trainer-videos/${trainerId}`);
  };

  const handleShowTrainerSlots = async (trainerId: string) => {
    navigate(`/user/trainer-booking-slot/${trainerId}`);
  };

  useEffect(() => {
    if (isActive) {
      dispatch(getUserTrainersList(getQueryParams()));
    }
  }, [dispatch, isActive, getQueryParams().page, getQueryParams().search]);
  const {
    isLoading,
    error,
    userTrainersList,
    pagination: { totalPages, currentPage },
  } = useSelector((state: RootState) => state.subscription);

  const fetchedUserTrainersList =
    userTrainersList.length > 0
      ? userTrainersList.map((sub, index) => {
          const fname = sub.subscribedTrainerData?.fname || "";
          const lname = sub.subscribedTrainerData?.lname || "";
          const name = `${
            fname.charAt(0).toUpperCase() + fname.slice(1).toLowerCase()
          } ${lname.charAt(0).toUpperCase() + lname.slice(1).toLowerCase()}`;
          const isSubscriptionActive =
            sub.stripeSubscriptionStatus === "active";
          const isActive =
            sub.stripeSubscriptionStatus.charAt(0).toUpperCase() +
            sub.stripeSubscriptionStatus.slice(1);

          return {
            ...sub,
            slno: index + 1 + (currentPage - 1) * 9,
            name: name,
            email: sub.subscribedTrainerData?.email || "",
            profilePic: GetProfilePic(
              sub.subscribedTrainerData?.profilePic || ""
            ),
            isActive: isActive,
            watchVideos: (
              <Button
                variant="contained"
                size="small"
                startIcon={<PlayCircleOutlineIcon />}
                disabled={!isSubscriptionActive}
                onClick={() => handleShowTrainerVideos(sub.trainerId)}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  backgroundColor: "#1f2937",
                  "&:hover": {
                    backgroundColor: "#111827",
                  },
                  color: "#fff",
                }}
              >
                Watch
              </Button>
            ),
            BookAppointment: (
              <Button
                variant="contained"
                size="small"
                startIcon={<EventNoteIcon />}
                disabled={!isSubscriptionActive}
                onClick={() => handleShowTrainerSlots(sub.trainerId)}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  fontSize: "0.75rem",
                  minWidth: "auto",
                  backgroundColor: "#1f2937",
                  "&:hover": {
                    backgroundColor: "#111827",
                  },
                  color: "#fff",
                }}
              >
                Book Now
              </Button>
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
          alignItems: "center",
          marginTop: 2,
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
        ></Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }} />
      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
          <ReuseTable columns={columns} data={fetchedUserTrainersList} />
          <PaginationTable
            handlePageChange={handlePageChange}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
};

export default MyTrainersTab;
