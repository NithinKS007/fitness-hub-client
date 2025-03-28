import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getAppointmentVideoCallLogsUser,
  getScheduledAppointmentsUser,
} from "../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../components/ShimmerTable";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";
import SearchBarTable from "../../components/SearchBarTable";
import useAppointments from "../../hooks/useAppointments";
import Tabs from "../../components/Tabs";
import { formatTime } from "../../utils/conversion";
import useSearchFilter from "../../hooks/useSearchFilter";
import TableFilter from "../../components/TableFilter";
import PaginationTable from "../../components/PaginationTable";
import { useModal } from "../../hooks/useModal";
import ConfirmationModalDialog from "../../components/ConfirmationModalDialog";

interface TableColumn {
  label: string;
  field: string;
}

const videoCallLogColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "trainerName" },
  { label: "Email", field: "trainerEmail" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Appointment Status", field: "appointmentStatus" },
  { label: "Call Start Time", field: "callStartTime" },
  { label: "Call End Time", field: "callEndTime" },
  { label: "Call Duration", field: "callDuration" },
  { label: "Call Status", field: "callStatus" },
];

const scheduledAppointmentsColumn: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Booking Date", field: "appointmentCreatedAt" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "Current Appointment Status", field: "appointmentStatus" },
  { label: "Actions", field: "actions" },
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

const UserBookingsPage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const {
    anchorAppointmentSchedulesEl,
    selectedAppointmentScheduleId,
    open,
    handleAppointmentSchedulesMenuClick,
    handleAppointmentSchedulesCloseMenu,
    handleCancelAppointmentScheduleUser,
  } = useAppointments();
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const {
    open: confirmationModalOpen,
    handleOpen: handleConfirmationModalOpen,
    handleClose: handleConfirmationModalClose,
  } = useModal();


  const dispatch = useDispatch<AppDispatch>();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const tabItems = [
    { label: "Bookings" },
    { label: "Call logs" },
  ];

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

  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.bookingSlot.pagination
  );

  useEffect(() => {
    switch (selectedTab) {
      case 0:
        dispatch(getScheduledAppointmentsUser(getQueryParams()));
        break;
      case 1:
        dispatch(getAppointmentVideoCallLogsUser(getQueryParams()));
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

  const {
    isLoading,
    error,
    scheduledAppointmentsUser,
    appointmentVideoCallLogsUser,
  } = useSelector((state: RootState) => state.bookingSlot);

  console.log("updated ", appointmentVideoCallLogsUser);

  const handleCancelAction = (appointment: any) => {
    setSelectedAppointment(appointment);
    handleConfirmationModalOpen();
    handleAppointmentSchedulesCloseMenu();
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      handleCancelAppointmentScheduleUser(selectedAppointment._id);
      handleConfirmationModalClose();
      handleAppointmentSchedulesCloseMenu();
    }
  };

  const fetchedUserVideoCallLogs =
    appointmentVideoCallLogsUser.length > 0
      ? appointmentVideoCallLogsUser.map((log, index) => ({
          ...log,
          slno: index + 1,
          _id: log._id,
          appointmentDate: new Date(
            log.appointmentData.appointmentDate
          ).toLocaleDateString(),
          appointmentTime: log.appointmentData.appointmentTime,
          appointmentStatus:
            log.appointmentData.status.charAt(0).toUpperCase() +
            log.appointmentData.status.slice(1).toLowerCase(),
          callDuration: formatTime(log.callDuration),
          callStartTime: new Date(log.callStartTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          callEndTime: log.callEndTime
            ? new Date(log.callEndTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "",
          callStatus:
            log.callStatus.charAt(0).toUpperCase() +
            log.callStatus.slice(1).toLowerCase(),
          trainerName: `${log.trainerData.fname} ${log.trainerData.lname}`,
          trainerEmail: log.trainerData.email,
          profilePic: log.trainerData.profilePic,
        }))
      : [];

  const fetchedscheduledAppointments =
    scheduledAppointmentsUser.length > 0
      ? scheduledAppointmentsUser.map((appointmentData, index) => {
          const reqDateObj = new Date(appointmentData?.createdAt as string);
          const formattedReqDate = reqDateObj.toLocaleDateString("en-GB");
          const formattedReqTime = reqDateObj.toLocaleTimeString("en-GB");

          const appointmentDate = new Date(
            appointmentData?.appointmentDate as string
          );
          const formattedAppointmentDate =
            appointmentDate.toLocaleDateString("en-GB");

          return {
            ...appointmentData,
            slno: index + 1,
            profilePic: appointmentData.trainerData.profilePic,
            name: `${appointmentData.trainerData.fname} ${appointmentData.trainerData.lname}`,
            email: appointmentData.trainerData.email,
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
                        border: "1px solid",
                        borderColor: "grey.400",
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() =>
                      handleCancelAction(appointmentData)
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
                marginTop: 3,
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
                marginTop: 3,
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
              <ShimmerTableLoader columns={videoCallLogColumns} />
            ) : error ? (
              <Box>{error}</Box>
            ) : (
              <>
                <ReuseTable
                  columns={videoCallLogColumns}
                  data={fetchedUserVideoCallLogs}
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
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      <Box sx={{ mt: 2 }}>{renderContent()}</Box>
      <ConfirmationModalDialog
        open={confirmationModalOpen}
        // title="Cancel Appointment"
        content={
          selectedAppointment &&
          `Are you sure you want to cancel your appointment with ${selectedAppointment.trainerData.fname} ${selectedAppointment.trainerData.lname} scheduled for ${new Date(selectedAppointment.appointmentDate).toLocaleDateString()} at ${selectedAppointment.appointmentTime}?`
        }
        onConfirm={handleConfirmCancel}
        onCancel={handleConfirmationModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="error"
        cancelColor="primary"
      />
    </>
  );
};

export default UserBookingsPage;
