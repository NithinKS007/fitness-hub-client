import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchBookingRequests } from "../../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../../components/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../../components/ShimmerTable";
import DateAndTimeFilter from "../../../components/DateAndTimeFilter";
import useAppointments from "../../../hooks/useAppointments";
import useSearchFilter from "../../../hooks/useSearchFilterTable";
import SearchBarTable from "../../../components/SearchBarTable";
import TableFilter from "../../../components/TableFilter";
import PaginationTable from "../../../components/PaginationTable";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/ConfirmationModalDialog";
import { TableColumn } from "../../../types/tableTypes";
import { Dayjs } from "dayjs";

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

interface BookingRequestsTabProps {
  isActive: boolean;
}
const BookingRequestsTab: React.FC<BookingRequestsTabProps> = ({isActive}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointMentRequests, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.bookingSlot
  );
  const { totalPages, currentPage } = pagination;
  const [selectedBookingRequest, setSelectedBookingRequest] =
    useState<any>(null);
  const [anchorBookingRequestEl, setAnchorBookingRequestEl] =
    useState<null | HTMLElement>(null);
  const [selectedBookingRequestId, setSelectedBookingRequestId] = useState<
    string | null
  >(null);

  const { handleAppointmentApproveOrReject } = useAppointments();

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
    dispatch(fetchBookingRequests(getQueryParams()));
  }, [
    dispatch,
    isActive,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const handleBookingRequestMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setAnchorBookingRequestEl(event.currentTarget);
    setSelectedBookingRequestId(id);
  };

  const handleBookingRequestCloseMenu = () => {
    setAnchorBookingRequestEl(null);
    setSelectedBookingRequestId(null);
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

  const fetchedBookingAppointmentRequests = appointMentRequests.map(
    (req, index) => {
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
        appointmentCreatedAt: `${formattedReqDate} ${formattedReqTime}`,
        actions: (
          <>
            <IconButton
              onClick={(event) => handleBookingRequestMenuClick(event, req._id)}
              sx={{ minWidth: "0", width: "20px", height: "20px" }}
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
      <ConfirmationModalDialog
        open={approveModalOpen as boolean}
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
        open={rejectModalOpen as boolean}
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
    </>
  );
};

export default BookingRequestsTab;
