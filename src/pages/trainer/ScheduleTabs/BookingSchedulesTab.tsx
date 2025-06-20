import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getScheduledAppointments } from "../../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../../components/table/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../../components/table/ShimmerTable";
import DateAndTimeFilter from "../../../components/table/DateFilter";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import useAppointments from "../../../hooks/useAppointments";
import useSearchFilter from "../../../hooks/useSearchFilter";
import SearchBarTable from "../../../components/table/SearchBarTable";
import TableFilter from "../../../components/table/TableFilter";
import PaginationTable from "../../../components/Pagination";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/modals/ConfirmationModalDialog";
import { TableColumn } from "../../../types/tableTypes";
import { Dayjs } from "dayjs";
import { GetProfilePic } from "../../../components/icons/IconIndex";
import { filters } from "../../../utils/timeOptions";
import Error from "../../../components/shared/Error";

const scheduledAppointmentsColumn: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Phone", field: "phone" },
  { label: "Slot Created On", field: "bookingSlotCreatedAt" },
  { label: "Booked On", field: "appointmentCreatedAt" },
  { label: "Scheduled Date", field: "appointmentDate" },
  { label: "Scheduled Time", field: "appointmentTime" },
  { label: "Current Status", field: "appointmentStatus" },
  { label: "Manage Actions", field: "actions" },
];

interface BookingSchedulesTabProps {
  onVideoCallClick: (userId: string, appointmentId: string) => void;
  isActive: boolean;
}

const BookingSchedulesTab: React.FC<BookingSchedulesTabProps> = ({
  onVideoCallClick,
  isActive,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { scheduledAppointmentsTrainer, isLoading, error, pagination } =
    useSelector((state: RootState) => state.bookingSlot);
  const { totalPages, currentPage } = pagination;
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const {
    anchorAppointmentSchedulesEl,
    selectedAppointmentScheduleId,
    open,
    handleAppointmentSchedulesMenuClick,
    handleAppointmentSchedulesCloseMenu,
    handleCancelAppointmentSchedule,
  } = useAppointments();

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

  useEffect(() => {
    dispatch(getScheduledAppointments(getQueryParams()));
  }, [
    dispatch,
    isActive,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

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

  const fetchedScheduledAppointments = scheduledAppointmentsTrainer.map(
    (appointmentData, index) => {
      const reqDateObj = new Date(appointmentData?.createdAt as string);
      const formattedReqDate = reqDateObj.toLocaleDateString("en-GB");
      const formattedReqTime = reqDateObj.toLocaleTimeString("en-GB");
      const bookingSlotCreatedAt = new Date(
        appointmentData?.bookingSlotData.createdAt as string
      );
      const formattedBookingSlotDate =
        bookingSlotCreatedAt.toLocaleDateString("en-GB");
      const formattedBookingSlotTime =
        bookingSlotCreatedAt.toLocaleTimeString("en-GB");
      const appointmentDate = new Date(
        appointmentData?.appointmentDate as string
      );
      const formattedAppointmentDate =
        appointmentDate.toLocaleDateString("en-GB");

      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      const isAppointmentInPast = appointmentDate < today;

      return {
        ...appointmentData,
        slno: index + 1 + (currentPage - 1) * 9,
        profilePic: GetProfilePic(appointmentData.userData.profilePic),
        name: `${appointmentData.userData.fname} ${appointmentData.userData.lname}`,
        email: appointmentData.userData.email,
        phone: appointmentData.userData.phone,
        bookingSlotCreatedAt: `${formattedBookingSlotDate} ${formattedBookingSlotTime}`,
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
              <VideoChatIcon
                sx={{
                  cursor: isAppointmentInPast ? "not-allowed" : "pointer",
                  marginRight: "10px",
                  color: isAppointmentInPast ? "grey.400" : "#1976d2",
                  fontSize: "30px",
                  opacity: isAppointmentInPast ? 0.5 : 1,
                }}
                onClick={() =>
                  !isAppointmentInPast &&
                  onVideoCallClick(
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
                sx={{ minWidth: "0", width: "25px", height: "25px" }}
              >
                <MoreVertIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
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
              <MenuItem
                onClick={() =>
                  !isAppointmentInPast &&
                  handleCancelAppointment(appointmentData)
                }
                disabled={isAppointmentInPast}
              >
                Cancel
              </MenuItem>
            </Menu>
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
          mt: 1,
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
          }}
        >
          <TableFilter
            filter={filters}
            selectedFilter={selectedFilter as string[]}
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
      {isLoading ? (
        <ShimmerTableLoader columns={scheduledAppointmentsColumn} />
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
          <ReuseTable
            columns={scheduledAppointmentsColumn}
            data={fetchedScheduledAppointments}
          />
          <PaginationTable
            handlePageChange={handlePageChange}
            page={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
      <ConfirmationModalDialog
        open={cancelModalOpen as boolean}
        content={
          selectedAppointment &&
          `Are you sure you want to cancel the appointment with ${
            selectedAppointment.userData.fname
          } ${selectedAppointment.userData.lname} scheduled for ${new Date(
            selectedAppointment.appointmentDate
          ).toLocaleDateString()} at ${selectedAppointment.appointmentTime}?`
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

export default BookingSchedulesTab;
