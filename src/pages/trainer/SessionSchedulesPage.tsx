import React, { useEffect, useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import SlotModal from "../../components/SlotModal";
import useSlot from "../../hooks/useSlot";
import Tabs from "../../components/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchAvailableSlots,
  fetchBookingRequests,
  getScheduledAppointments,
} from "../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../components/ShimmerTable";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";
import SearchBarTable from "../../components/SearchBarTable";
import ChatIcon from "@mui/icons-material/Chat";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import useAppointments from "../../hooks/useAppointments";

interface TableColumn {
  label: string;
  field: string;
}

const availableSlotColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Date", field: "date" },
  { label: "Time", field: "time" },
  { label: "Slot Status", field: "status" },
  { label: "Date Of Publishing", field: "dateOfPublishing" },
  { label: "Actions", field: "actions" },
];

const bookingRequestsColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile Picture", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Phone", field: "phone" },
  { label: "Slot Creation Date", field: "bookingSlotCreatedAt" },
  { label: "Booking Date", field: "appointmentCreatedAt" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Current Appointment Status", field: "appointmentStatus" },
  { label: "Manage Actions", field: "actions" },
];

const scheduledAppointmentsColumn: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile Picture", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Phone", field: "phone" },
  { label: "Slot Creation Date", field: "bookingSlotCreatedAt" },
  { label: "Booking Date", field: "appointmentCreatedAt" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Current Appointment Status", field: "appointmentStatus" },
  { label: "Manage Actions", field: "actions" },
];

const SessionSchedulesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const {
    modalHandleOpen,
    modalHandleClose,
    modalOpen,
    slotFormik,
    timeOptions,
    handleDateChange,
    deleteAvailableSlot,
    anchorAvailableSlotEl,
    selectedAvailableSlotId,
    handleAvailableSlotMenuClick,
    handleAvailableSlotCloseMenu,
  } = useSlot();

  const {
    anchorAppointmentSchedulesEl,
    selectedAppointmentScheduleId,
    open,
    handleAppointmentSchedulesMenuClick,
    handleAppointmentSchedulesCloseMenu,
    handleCancelAppointmentSchedule,
    handleAppointmentApproveOrReject,
  } = useAppointments();

  const tabItems = [
    { label: "Available Slots" },
    { label: "Booking Requests" },
    { label: "Booking Schedules" },
  ];

  const dispatch = useDispatch<AppDispatch>();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    switch (selectedTab) {
      case 0:
        dispatch(fetchAvailableSlots());
        break;
      case 1:
        dispatch(fetchBookingRequests());
        break;
      case 2:
        dispatch(getScheduledAppointments());
        break;
      default:
        break;
    }
  }, [selectedTab, dispatch]);

  const {
    slots,
    isLoading,
    error,
    appointMentRequests,
    scheduledAppointmentsTrainer,
  } = useSelector((state: RootState) => state.bookingSlot);

  const fetchedscheduledAppointments =
    scheduledAppointmentsTrainer?.length > 0
      ? scheduledAppointmentsTrainer?.map((appointmentData, index: number) => {
          const reqDateObj = new Date(appointmentData?.createdAt as string);
          const formattedReqDate = reqDateObj.toLocaleDateString("en-GB");
          const formattedReqTime = reqDateObj.toLocaleTimeString("en-GB");

          const bookingSlotCreatedAt = new Date(
            appointmentData?.bookingSlotData.createdAt as string
          );
          const formattedbookingSlotDate =
            bookingSlotCreatedAt.toLocaleDateString("en-GB");
          const formattedbookingSlotTime =
            bookingSlotCreatedAt.toLocaleTimeString("en-GB");

          const appointmentDate = new Date(
            appointmentData?.appointmentDate as string
          );
          const formattedAppointmentDate =
            appointmentDate.toLocaleDateString("en-GB");

          return {
            ...appointmentData,
            slno: index + 1,
            profilePic: appointmentData.userData.profilePic,
            name: `${appointmentData.userData.fname} ${appointmentData.userData.lname}`,
            email: appointmentData.userData.email,
            phone: appointmentData.userData.phone,
            bookingSlotCreatedAt: `${formattedbookingSlotDate} ${formattedbookingSlotTime}`,
            appointmentDate: `${formattedAppointmentDate}`,
            appointmentTime: appointmentData.appointmentTime,
            appointmentStatus:
              appointmentData.status.charAt(0).toUpperCase() +
              appointmentData.status.slice(1),
            appointmentCreatedAt: `${formattedReqDate} ${formattedReqTime} `,
            actions: (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <ChatIcon
                    sx={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "#1976d2",
                      fontSize: "30px",
                    }}
                  />
                  <VideoChatIcon
                    sx={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "#1976d2",
                      fontSize: "30px",
                    }}
                  />
                  <IconButton
                    onClick={(event) =>
                      handleAppointmentSchedulesMenuClick(
                        event,
                        appointmentData?._id as string
                      )
                    }
                    aria-label="More options"
                    sx={{
                      padding: 0,
                      paddingTop: 0,
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Paper>
                  <Menu
                    anchorEl={anchorAppointmentSchedulesEl}
                    open={
                      open &&
                      selectedAppointmentScheduleId === appointmentData?._id
                    }
                    onClose={handleAppointmentSchedulesCloseMenu}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: 1,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                        handleCancelAppointmentSchedule(
                          appointmentData?._id as string
                        )
                      }
                    >
                      Cancel
                    </MenuItem>
                  </Menu>
                </Paper>
              </>
            ),
          };
        })
      : [];

  const fetchedAddedSlots =
    slots.length > 0
      ? slots.map((slot, index) => {
          const dateObj = new Date(slot?.createdAt as string);
          const formattedDate = dateObj.toLocaleDateString("en-GB");
          const formattedTime = dateObj.toLocaleTimeString("en-GB");

          const slotDate = new Date(slot?.date);
          const formattedSlotDate = slotDate.toLocaleDateString("en-GB");

          return {
            ...slot,
            slno: index + 1,
            time: slot?.time,
            status: slot.status.charAt(0).toUpperCase() + slot.status.slice(1),
            date: formattedSlotDate,
            dateOfPublishing: `${formattedDate} ${formattedTime}`,
            actions: (
              <>
                <IconButton
                  onClick={(event) =>
                    handleAvailableSlotMenuClick(event, slot._id)
                  }
                  sx={{ color: "gray" }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorAvailableSlotEl}
                  open={
                    Boolean(anchorAvailableSlotEl) &&
                    selectedAvailableSlotId === slot._id
                  }
                  onClose={handleAvailableSlotCloseMenu}
                  sx={{
                    "& .MuiPaper-root": {
                      boxShadow: "none",
                      border: "1px solid",
                      borderColor: "grey.400",
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem onClick={() => deleteAvailableSlot(slot._id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </>
            ),
          };
        })
      : [];

  const fetchedBookingAppointmentRequests =
    appointMentRequests.length > 0
      ? appointMentRequests.map((req, index) => {
          const reqDateObj = new Date(req?.createdAt as string);
          const formattedReqDate = reqDateObj.toLocaleDateString("en-GB");
          const formattedReqTime = reqDateObj.toLocaleTimeString("en-GB");

          const bookingSlotCreatedAt = new Date(
            req?.bookingSlotData.createdAt as string
          );
          const formattedbookingSlotDate =
            bookingSlotCreatedAt.toLocaleDateString("en-GB");
          const formattedbookingSlotTime =
            bookingSlotCreatedAt.toLocaleTimeString("en-GB");

          const appointmentDate = new Date(req?.appointmentDate as string);
          const formattedAppointmentDate =
            appointmentDate.toLocaleDateString("en-GB");

          return {
            ...req,
            slno: index + 1,
            profilePic: req.userData.profilePic,
            name: `${req.userData.fname} ${req.userData.lname}`,
            email: req.userData.email,
            phone: req.userData.phone,
            bookingSlotCreatedAt: `${formattedbookingSlotDate} ${formattedbookingSlotTime}`,
            appointmentDate: `${formattedAppointmentDate}`,
            appointmentTime: req.appointmentTime,
            appointmentStatus:
              req.status.charAt(0).toUpperCase() + req.status.slice(1),
            appointmentCreatedAt: `${formattedReqDate} ${formattedReqTime} `,
            actions: (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "8px",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() =>
                      handleAppointmentApproveOrReject(
                        req?._id as string,
                        req.bookingSlotData._id,
                        "approved"
                      )
                    }
                    sx={{
                      fontSize: "14px",
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkgreen",
                      },
                    }}
                    variant="contained"
                  >
                    Approve
                  </Button>

                  <Button
                    size="small"
                    onClick={() =>
                      handleAppointmentApproveOrReject(
                        req?._id as string,
                        req.bookingSlotData._id,
                        "rejected"
                      )
                    }
                    sx={{
                      fontSize: "14px",
                      color: "white",
                      borderColor: "red",
                      backgroundColor: "red",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }}
                    variant="contained"
                  >
                    Reject
                  </Button>
                </Box>
              </>
            ),
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
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={modalHandleOpen}
                sx={{
                  backgroundColor: "#1d4ed8",
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Add New Slot
              </Button>
              <DateAndTimeFilter />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={availableSlotColumns} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <ReuseTable
                columns={availableSlotColumns}
                data={fetchedAddedSlots}
              />
            )}

            <SlotModal
              open={modalOpen}
              handleClose={modalHandleClose}
              formik={slotFormik}
              timeOptions={timeOptions}
              handleDateChange={handleDateChange}
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
              }}
            >
              <SearchBarTable />
              <DateAndTimeFilter />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={bookingRequestsColumns} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <ReuseTable
                columns={bookingRequestsColumns}
                data={fetchedBookingAppointmentRequests}
              />
            )}
          </>
        );
      case 2:
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <SearchBarTable />
              <DateAndTimeFilter />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={scheduledAppointmentsColumn} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <ReuseTable
                columns={scheduledAppointmentsColumn}
                data={fetchedscheduledAppointments}
              />
            )}
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
      <Box sx={{ mt: 2 }}>{renderContent()}</Box>
    </>
  );
};

export default SessionSchedulesPage;
