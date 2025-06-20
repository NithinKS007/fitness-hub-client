import { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getScheduledAppointmentsUser } from "../../../redux/booking/bookingThunk";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ReuseTable from "../../../components/table/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShimmerTableLoader from "../../../components/table/ShimmerTable";
import DateAndTimeFilter from "../../../components/table/DateFilter";
import SearchBarTable from "../../../components/table/SearchBarTable";
import useAppointments from "../../../hooks/useAppointments";
import useSearchFilter from "../../../hooks/useSearchFilter";
import TableFilter from "../../../components/table/TableFilter";
import PaginationTable from "../../../components/Pagination.tsx";
import { useModal } from "../../../hooks/useModal";
import ConfirmationModalDialog from "../../../components/modals/ConfirmationModalDialog";
import { TableColumn } from "../../../types/tableTypes";
import { Dayjs } from "dayjs";
import { ScheduledAppointmentsUser } from "../../../redux/booking/bookingTypes";
import { GetProfilePic } from "../../../components/icons/IconIndex.tsx";
import { filters } from "../../../utils/timeOptions.ts";
import Error from "../../../components/shared/Error.tsx";

const scheduledAppointmentsColumn: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Booked On", field: "appointmentCreatedAt" },
  { label: "Scheduled Date", field: "appointmentDate" },
  { label: "Scheduled Time", field: "appointmentTime" },
  { label: "Current Status", field: "appointmentStatus" },
  { label: "More", field: "actions" },
];

interface BookingsTabProps {
  isActive: boolean;
}

const BookingsTab: React.FC<BookingsTabProps> = ({ isActive }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { scheduledAppointmentsUser, isLoading, error, pagination } =
    useSelector((state: RootState) => state.bookingSlot);
  const { totalPages, currentPage } = pagination;
  const [selectedAppointment, setSelectedAppointment] =
    useState<ScheduledAppointmentsUser | null>(null);

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
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      appointmentDate.setHours(0, 0, 0, 0);
      const isCancelDisabled = appointmentDate < today;
      const profilePic = GetProfilePic(
        appointmentData.trainerData.profilePic as string
      );
      return {
        ...appointmentData,
        slno: index + 1 + (currentPage - 1) * 9,
        profilePic: profilePic,
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
                <MenuItem
                  onClick={() => handleCancelAction(appointmentData)}
                  disabled={isCancelDisabled}
                >
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
        <Error message={error} />
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
          selectedAppointment
            ? `Are you sure you want to cancel your appointment with ${
                selectedAppointment.trainerData.fname
              } ${
                selectedAppointment.trainerData.lname
              } scheduled for ${new Date(
                selectedAppointment.appointmentDate
              ).toLocaleDateString()} at ${
                selectedAppointment.appointmentTime
              }?`
            : ""
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
