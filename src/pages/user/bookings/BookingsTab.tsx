import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getScheduledAppointmentsUser } from "../../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../../components/ShimmerTable";
import DateAndTimeFilter from "../../../components/DateAndTimeFilter";
import SearchBarTable from "../../../components/SearchBarTable";
import useAppointments from "../../../hooks/useAppointments";
import useSearchFilter from "../../../hooks/useSearchFilterTable";
import TableFilter from "../../../components/TableFilter";
import PaginationTable from "../../../components/PaginationTable";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/modals/ConfirmationModalDialog";
import { TableColumn } from "../../../types/tableTypes";
import { Dayjs } from "dayjs";

const scheduledAppointmentsColumn: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Booking Date", field: "appointmentCreatedAt" },
  { label: "Appointment Date", field: "appointmentDate" },
  { label: "Appointment Time", field: "appointmentTime" },
  { label: "status", field: "appointmentStatus" },
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

interface BookingsTabProps {
  isActive: boolean;
}

const BookingsTab: React.FC<BookingsTabProps> = ({ isActive }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { scheduledAppointmentsUser, isLoading, error, pagination } =
    useSelector((state: RootState) => state.bookingSlot);
  const { totalPages, currentPage } = pagination;
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const {
    anchorAppointmentSchedulesEl,
    selectedAppointmentScheduleId,
    open,
    handleAppointmentSchedulesMenuClick,
    handleAppointmentSchedulesCloseMenu,
    handleCancelAppointmentScheduleUser,
  } = useAppointments();

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
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleResetDates,
  } = useSearchFilter();

  useEffect(() => {
    if (isActive) {
      dispatch(getScheduledAppointmentsUser(getQueryParams()));
    }
  }, [
    dispatch,
    isActive,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const handleCancelAction = (appointment: any) => {
    setSelectedAppointment(appointment);
    handleConfirmationModalOpen();
  };

  const handleConfirmCancel = () => {
    if (selectedAppointment) {
      handleCancelAppointmentScheduleUser(selectedAppointment._id);
      handleConfirmationModalClose();
      handleAppointmentSchedulesCloseMenu();
      setSelectedAppointment(null);
    }
  };

  const fetchedscheduledAppointments = scheduledAppointmentsUser.map(
    (appointmentData, index) => {
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
        slno: index + 1 + (currentPage - 1) * 9,
        profilePic: appointmentData.trainerData.profilePic,
        name: `${appointmentData.trainerData.fname} ${appointmentData.trainerData.lname}`,
        email: appointmentData.trainerData.email,
        appointmentDate: `${formattedAppointmentDate}`,
        appointmentTime: appointmentData.appointmentTime,
        appointmentStatus:
          appointmentData.status.charAt(0).toUpperCase() +
          appointmentData.status.slice(1),
        appointmentCreatedAt: `${formattedReqDate} ${formattedReqTime}`,
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
                sx={{ minWidth: "0", width: "25px", height: "20px" }}
              >
                <MoreVertIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
            <Paper>
              <Menu
                anchorEl={anchorAppointmentSchedulesEl}
                open={
                  open && selectedAppointmentScheduleId === appointmentData?._id
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
                <MenuItem onClick={() => handleCancelAction(appointmentData)}>
                  Cancel
                </MenuItem>
              </Menu>
            </Paper>
          </>
        ),
      };
    }
  );

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
        >
          <TableFilter
            selectedFilter={selectedFilter as string[]}
            filter={filters}
            handleFilterChange={handleFilterChange}
          />
          <DateAndTimeFilter
            fromDate={fromDate as Dayjs | null}
            toDate={toDate as Dayjs | null}
            onFromDateChange={handleFromDateChange}
            onToDateChange={handleToDateChange}
            onReset={handleResetDates}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }} />
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
      <ConfirmationModalDialog
        open={confirmationModalOpen as boolean}
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

export default BookingsTab;
