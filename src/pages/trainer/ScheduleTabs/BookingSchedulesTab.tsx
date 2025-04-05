import React, { useEffect, useState } from "react";
import { Box} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getScheduledAppointments,
} from "../../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../../components/ShimmerTable";
import DateAndTimeFilter from "../../../components/DateAndTimeFilter";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import useAppointments from "../../../hooks/useAppointments";
import useSearchFilter from "../../../hooks/useSearchFilterTable";
import SearchBarTable from "../../../components/SearchBarTable";
import TableFilter from "../../../components/TableFilter";
import PaginationTable from "../../../components/PaginationTable";
import { useModal } from "../../../hooks/useModal"
import ConfirmationModalDialog from "../../../components/ConfirmationModalDialog";
import { TableColumn } from "../../../types/tableTypes"


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

  

interface BookingSchedulesTabProps {
onVideoCallClick: (userId: string, appointmentId: string) => void;
isActive:boolean
}

const BookingSchedulesTab: React.FC<BookingSchedulesTabProps> = ({ onVideoCallClick,isActive }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { scheduledAppointmentsTrainer, isLoading, error, pagination } = useSelector(
      (state: RootState) => state.bookingSlot
    );
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
  
    const fetchedScheduledAppointments = scheduledAppointmentsTrainer.map((appointmentData, index) => {
      const reqDateObj = new Date(appointmentData?.createdAt as string);
      const formattedReqDate = reqDateObj.toLocaleDateString("en-GB");
      const formattedReqTime = reqDateObj.toLocaleTimeString("en-GB");
      const bookingSlotCreatedAt = new Date(appointmentData?.bookingSlotData.createdAt as string);
      const formattedBookingSlotDate = bookingSlotCreatedAt.toLocaleDateString("en-GB");
      const formattedBookingSlotTime = bookingSlotCreatedAt.toLocaleTimeString("en-GB");
      const appointmentDate = new Date(appointmentData?.appointmentDate as string);
      const formattedAppointmentDate = appointmentDate.toLocaleDateString("en-GB");
  
      return {
        ...appointmentData,
        slno: index + 1 + (currentPage - 1) * 9,
        profilePic: appointmentData.userData.profilePic,
        name: `${appointmentData.userData.fname} ${appointmentData.userData.lname}`,
        email: appointmentData.userData.email,
        phone: appointmentData.userData.phone,
        bookingSlotCreatedAt: `${formattedBookingSlotDate} ${formattedBookingSlotTime}`,
        appointmentDate: `${formattedAppointmentDate}`,
        appointmentTime: appointmentData.appointmentTime,
        appointmentStatus: appointmentData.status.charAt(0).toUpperCase() + appointmentData.status.slice(1),
        appointmentCreatedAt: `${formattedReqDate} ${formattedReqTime}`,
        actions: (
          <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
              <VideoChatIcon
                sx={{ cursor: "pointer", marginRight: "10px", color: "#1976d2", fontSize: "30px" }}
                onClick={() => onVideoCallClick(appointmentData.userData._id, appointmentData._id)}
              />
              <IconButton
                onClick={(event) => handleAppointmentSchedulesMenuClick(event, appointmentData?._id as string)}
                sx={{ minWidth: "0", width: "25px", height: "25px" }}
              >
                <MoreVertIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorAppointmentSchedulesEl}
              open={open && selectedAppointmentScheduleId === appointmentData?._id}
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
              <MenuItem onClick={() => handleCancelAppointment(appointmentData)}>Cancel</MenuItem>
            </Menu>
          </>
        ),
      };
    });
  
    return (
      <>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <SearchBarTable searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
          <Box sx={{ display: "flex", justifyContent: "end", gap: 2, alignItems: "center" }}>
            <TableFilter
              filter={filters}
              selectedFilter={selectedFilter}
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
        {isLoading ? (
          <ShimmerTableLoader columns={scheduledAppointmentsColumn} />
        ) : error ? (
          <Box>{error}</Box>
        ) : (
          <>
            <ReuseTable columns={scheduledAppointmentsColumn} data={fetchedScheduledAppointments} />
            <PaginationTable
              handlePageChange={handlePageChange}
              page={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
        <ConfirmationModalDialog
          open={cancelModalOpen}
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
  
  export default BookingSchedulesTab;