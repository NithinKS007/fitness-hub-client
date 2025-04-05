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
  getAppointmentVideoCallLogsTrainer,
  getScheduledAppointments,
} from "../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../components/ShimmerTable";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import useAppointments from "../../hooks/useAppointments";
import { socket } from "../../config/socket";
import ZegoCloudVideoCall from "../../components/VideoCallZego";
import { formatTime, getFormattedTimeRange } from "../../utils/conversion";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import SearchBarTable from "../../components/SearchBarTable";
import TableFilter from "../../components/TableFilter";
import PaginationTable from "../../components/PaginationTable";
import { useModal } from "../../hooks/useModal";
import ConfirmationModalDialog from "../../components/ConfirmationModalDialog";
import { TableColumn } from "../../types/tableTypes";

const videoCallLogColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "userName" },
  { label: "Email", field: "userEmail" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Appointment Status", field: "appointmentStatus" },
  { label: "Call Start Time", field: "callStartTime" },
  { label: "Call End Time", field: "callEndTime" },
  { label: "Call Duration", field: "callDuration" },
  { label: "Call Status", field: "callStatus" },
];

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
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Phone", field: "phone" },
  { label: "Slot Creation Date", field: "bookingSlotCreatedAt" },
  { label: "Booking Date", field: "appointmentCreatedAt" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Current Status", field: "appointmentStatus" },
  { label: "Manage Actions", field: "actions" },
];

const scheduledAppointmentsColumn: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Phone", field: "phone" },
  { label: "Slot Creation Date", field: "bookingSlotCreatedAt" },
  { label: "Booking Date", field: "appointmentCreatedAt" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Current Status", field: "appointmentStatus" },
  { label: "More", field: "actions" },
];

const filters = [
  { value: "12:00 AM" },
  { value: "12:30 AM" },
  { value: "01:00 AM" },
  { value: "01:30 AM" },
  { value: "02:00 AM" },
  { value: "02:30 AM" },
  { value: "03:00 AM" },
  { value: "03:30 AM" },
  { value: "04:00 AM" },
  { value: "04:30 AM" },
  { value: "05:00 AM" },
  { value: "05:30 AM" },
  { value: "06:00 AM" },
  { value: "06:30 AM" },
  { value: "07:00 AM" },
  { value: "07:30 AM" },
  { value: "08:00 AM" },
  { value: "08:30 AM" },
  { value: "09:00 AM" },
  { value: "09:30 AM" },
  { value: "10:00 AM" },
  { value: "10:30 AM" },
  { value: "11:00 AM" },
  { value: "11:30 AM" },
  { value: "12:00 PM" },
  { value: "12:30 PM" },
  { value: "01:00 PM" },
  { value: "01:30 PM" },
  { value: "02:00 PM" },
  { value: "02:30 PM" },
  { value: "03:00 PM" },
  { value: "03:30 PM" },
  { value: "04:00 PM" },
  { value: "04:30 PM" },
  { value: "05:00 PM" },
  { value: "05:30 PM" },
  { value: "06:00 PM" },
  { value: "06:30 PM" },
  { value: "07:00 PM" },
  { value: "07:30 PM" },
  { value: "08:00 PM" },
  { value: "08:30 PM" },
  { value: "09:00 PM" },
  { value: "09:30 PM" },
  { value: "10:00 PM" },
  { value: "10:30 PM" },
  { value: "11:00 PM" },
  { value: "11:30 PM" },
];

const tabItems = [
  { label: "Available Slots" },
  { label: "Booking Requests" },
  { label: "Booking Schedules" },
  { label: "Appointment Call Logs" },
];

const SessionSchedulesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [callActive, setCallActive] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedBookingRequest, setSelectedBookingRequest] =
    useState<any>(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const trainer = useSelector((state: RootState) => state.auth.trainer);

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

  const {
    open: deleteModalOpen,
    handleOpen: handleDeleteModalOpen,
    handleClose: handleDeleteModalClose,
  } = useModal();
  const {
    open: approveModalOpen,
    handleOpen: handleApproveModalOpen,
    handleClose: handleApproveModalClose,
  } = useModal();

  const {
    open: rejectModalOpen,
    handleOpen: handleRejectModalOpen,
    handleClose: handleRejectModalClose,
  } = useModal();

  const {
    open: cancelModalOpen,
    handleOpen: handleCancelModalOpen,
    handleClose: handleCancelModalClose,
  } = useModal();

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

  const dispatch = useDispatch<AppDispatch>();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const handleEndCall = () => {
    if (roomId) {
      socket.emit("videoCallEnded", { roomId: roomId });
    }
    setCallActive(false);
    setRoomId(null);
  };
  useEffect(() => {
    switch (selectedTab) {
      case 0:
        dispatch(fetchAvailableSlots(getQueryParams()));
        break;
      case 1:
        dispatch(fetchBookingRequests(getQueryParams()));
        break;
      case 2:
        dispatch(getScheduledAppointments(getQueryParams()));
        break;
      case 3:
        dispatch(getAppointmentVideoCallLogsTrainer(getQueryParams()));
        break;
      default:
        break;
    }
  }, [
    selectedTab,
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const handleVideoCallClick = async (
    userId: string,
    appointmentId: string
  ) => {
    if (trainer?._id) {
      const randomNum = Math.floor(Math.random() * 1000000);
      const newRoomId = `${randomNum}`;
      setRoomId(newRoomId);
      setCallActive(true);
      socket.emit("initiateVideoCall", {
        callerId: trainer._id,
        receiverId: userId,
        roomId: newRoomId,
        appointmentId: appointmentId,
      });
    } else {
      console.log("Trainer ID not available");
    }
  };

  const {
    slots,
    isLoading,
    error,
    appointMentRequests,
    scheduledAppointmentsTrainer,
    appointmentVideoCallLogsTrainer,
  } = useSelector((state: RootState) => state.bookingSlot);

  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.bookingSlot.pagination
  );

  const handleDeleteSlot = (slot: any) => {
    setSelectedSlot(slot);
    handleDeleteModalOpen();
  };

  const handleConfirmDelete = () => {
    if (selectedSlot) {
      deleteAvailableSlot(selectedSlot._id);
      handleDeleteModalClose();
      handleAvailableSlotCloseMenu();
    }
  };
  const handleApproveBooking = (booking: any) => {
    setSelectedBookingRequest(booking);
    handleApproveModalOpen();
  };

  const handleConfirmApprove = () => {
    if (selectedBookingRequest) {
      handleAppointmentApproveOrReject(
        selectedBookingRequest._id,
        selectedBookingRequest.bookingSlotData._id,
        "approved"
      );
      handleApproveModalClose();
    }
  };

  const handleRejectBooking = (booking: any) => {
    setSelectedBookingRequest(booking);
    handleRejectModalOpen();
  };

  const handleConfirmReject = () => {
    if (selectedBookingRequest) {
      handleAppointmentApproveOrReject(
        selectedBookingRequest._id,
        selectedBookingRequest.bookingSlotData._id,
        "rejected"
      );
      handleRejectModalClose();
    }
  };

  const handleCancelAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    handleCancelModalOpen();
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      handleCancelAppointmentSchedule(selectedAppointment._id);
      handleCancelModalClose();
      handleAppointmentSchedulesCloseMenu();
    }
  };

const [anchorBookingRequestEl, setAnchorBookingRequestEl] = useState<null | HTMLElement>(null);
const [selectedBookingRequestId, setSelectedBookingRequestId] = useState<string | null>(null);

const handleBookingRequestMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
  setAnchorBookingRequestEl(event.currentTarget);
  setSelectedBookingRequestId(id);
};

const handleBookingRequestCloseMenu = () => {
  setAnchorBookingRequestEl(null);
  setSelectedBookingRequestId(null);
};

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
            slno:index + 1 + (currentPage - 1) * 9,
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
                  <VideoChatIcon
                    sx={{
                      cursor: "pointer",
                      marginRight: "10px",
                      color: "#1976d2",
                      fontSize: "30px",
                    }}
                    onClick={() =>
                      handleVideoCallClick(
                        appointmentData.userData._id,
                        appointmentData._id
                      )
                    }
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
                      minWidth: "0",
                      width: "25px",
                      height: "25px", 
                    }}
                  >
                    <MoreVertIcon sx={{ fontSize: "20px" }} />
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
                        border: "1px solid",
                        borderColor: "grey.400",
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => handleCancelAppointment(appointmentData)}
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

  const fetchedTrainerVideoCallLogs =
    appointmentVideoCallLogsTrainer.length > 0
      ? appointmentVideoCallLogsTrainer.map((log, index) => ({
          ...log,
          slno:index + 1 + (currentPage - 1) * 9,
          _id: log._id,
          appointmentDate: new Date(
            log.appointmentData.appointmentDate
          ).toLocaleDateString(),
          appointmentTime: log.appointmentData.appointmentTime,
          appointmentStatus:
            log.appointmentData.status.charAt(0).toUpperCase() +
            log.appointmentData.status.slice(1).toLowerCase(),
          callDuration: formatTime(log.callDuration),
          callStartTime: getFormattedTimeRange(log.callStartTime),
          callEndTime: getFormattedTimeRange(log.callEndTime),
          callStatus:
            log.callStatus.charAt(0).toUpperCase() +
            log.callStatus.slice(1).toLowerCase(),
          userName: `${log.userData.fname} ${log.userData.lname}`,
          userEmail: log.userData.email,
          profilePic: log.userData.profilePic,
        }))
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
            slno:index + 1 + (currentPage - 1) * 9,
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
                  sx={{
                    minWidth: "0", 
                    width: "25px", 
                    height: "25px", 
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "20px" }} />
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
                  <MenuItem onClick={() => handleDeleteSlot(slot)}>
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
            slno: index + 1 + (currentPage - 1) * 9,
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
                <IconButton
                  onClick={(event) => handleBookingRequestMenuClick(event, req._id)}
                  sx={{
                    minWidth: "0",
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorBookingRequestEl}
                  open={
                    Boolean(anchorBookingRequestEl) &&
                    selectedBookingRequestId === req._id
                  }
                  onClose={handleBookingRequestCloseMenu}
                  sx={{
                    "& .MuiPaper-root": {
                      boxShadow: "none",
                      border: "1px solid",
                      borderColor: "grey.400",
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem onClick={() => handleApproveBooking(req)}>
                    Approve
                  </MenuItem>
                  <MenuItem onClick={() => handleRejectBooking(req)}>
                    Reject
                  </MenuItem>
                </Menu>
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
                marginTop: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={modalHandleOpen}
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Add New Slot
              </Button>
              <DateAndTimeFilter
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={handleFromDateChange}
                onToDateChange={handleToDateChange}
                onReset={handleResetDates}
              />
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={availableSlotColumns} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <>
                <ReuseTable
                  columns={availableSlotColumns}
                  data={fetchedAddedSlots}
                />
                <PaginationTable
                  handlePageChange={handlePageChange}
                  page={currentPage}
                  totalPages={totalPages}
                />
              </>
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
                  filter={filters}
                  handleFilterChange={handleFilterChange}
                />
                <DateAndTimeFilter
                  fromDate={fromDate}
                  toDate={toDate}
                  onFromDateChange={handleFromDateChange}
                  onToDateChange={handleToDateChange}
                  onReset={handleResetDates}
                />
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={bookingRequestsColumns} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <>
                <ReuseTable
                  columns={bookingRequestsColumns}
                  data={fetchedBookingAppointmentRequests}
                />
                <PaginationTable
                  handlePageChange={handlePageChange}
                  page={currentPage}
                  totalPages={totalPages}
                />
              </>
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
                  filter={filters}
                  selectedFilter={selectedFilter as string[]}
                  handleFilterChange={handleFilterChange}
                />
                <DateAndTimeFilter
                  fromDate={fromDate!!}
                  toDate={toDate!!}
                  onFromDateChange={handleFromDateChange}
                  onToDateChange={handleToDateChange}
                  onReset={handleResetDates}
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={scheduledAppointmentsColumn} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <>
                <ReuseTable
                  columns={scheduledAppointmentsColumn}
                  data={fetchedscheduledAppointments}
                />
                <PaginationTable
                  handlePageChange={handlePageChange}
                  page={currentPage}
                  totalPages={totalPages}
                />
              </>
            )}
            {callActive && roomId && (
              <Box sx={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
                <ZegoCloudVideoCall
                  roomId={roomId}
                  userId={trainer?._id as string}
                  userName={trainer?.fname as string}
                  onEndCall={handleEndCall}
                />
              </Box>
            )}
          </>
        );

      case 3:
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
                  selectedFilter={selectedFilter!!}
                  filter={filters!!}
                  handleFilterChange={handleFilterChange}
                />
                <DateAndTimeFilter
                  fromDate={fromDate!!}
                  toDate={toDate!!}
                  onFromDateChange={handleFromDateChange}
                  onToDateChange={handleToDateChange}
                  onReset={handleResetDates}
                />
              </Box>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between" ,mt:1}}
            />
            {isLoading ? (
              <ShimmerTableLoader columns={videoCallLogColumns} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <>
                <ReuseTable
                  columns={videoCallLogColumns}
                  data={fetchedTrainerVideoCallLogs}
                />
                <PaginationTable
                  handlePageChange={handlePageChange}
                  page={currentPage}
                  totalPages={totalPages}
                />
              </>
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
        tabItems={tabItems!!}
        value={selectedTab!!}
        handleChange={handleTabChange}
      />
      {renderContent()}
      <ConfirmationModalDialog
        open={deleteModalOpen!!}
        content={
          selectedSlot &&
          `Are you sure you want to delete the slot for ${new Date(selectedSlot.date).toLocaleDateString()} at ${selectedSlot.time}?`
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleDeleteModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="error"
        cancelColor="primary"
      />

      <ConfirmationModalDialog
        open={approveModalOpen!!}
        content={
          selectedBookingRequest &&
          `Are you sure you want to approve the booking request from ${selectedBookingRequest.userData.fname} ${selectedBookingRequest.userData.lname} for ${new Date(selectedBookingRequest.appointmentDate).toLocaleDateString()} at ${selectedBookingRequest.appointmentTime}?`
        }
        onConfirm={handleConfirmApprove}
        onCancel={handleApproveModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="success"
        cancelColor="primary"
      />
      <ConfirmationModalDialog
        open={rejectModalOpen!!}
        content={
          selectedBookingRequest &&
          `Are you sure you want to reject the booking request from ${selectedBookingRequest.userData.fname} ${selectedBookingRequest.userData.lname} for ${new Date(selectedBookingRequest.appointmentDate).toLocaleDateString()} at ${selectedBookingRequest.appointmentTime}?`
        }
        onConfirm={handleConfirmReject}
        onCancel={handleRejectModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="error"
        cancelColor="primary"
      />
      <ConfirmationModalDialog
        open={cancelModalOpen!!}
        content={
          selectedAppointment &&
          `Are you sure you want to cancel the appointment with ${selectedAppointment.userData.fname} ${selectedAppointment.userData.lname} scheduled for ${new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at ${selectedAppointment.appointmentTime}?`
        }
        onConfirm={handleConfirmCancel}
        onCancel={handleCancelModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="error"
        cancelColor="primary"
      />
    </>
  );
};

export default SessionSchedulesPage;
