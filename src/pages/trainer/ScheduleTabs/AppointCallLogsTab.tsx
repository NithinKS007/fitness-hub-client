import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAppointmentVideoCallLogsTrainer } from "../../../redux/booking/bookingThunk";
import ReuseTable from "../../../components/ReuseTable";
import ShimmerTableLoader from "../../../components/ShimmerTable";
import DateAndTimeFilter from "../../../components/DateAndTimeFilter";
import { formatTime, getFormattedTimeRange } from "../../../utils/conversion";
import useSearchFilter from "../../../hooks/useSearchFilterTable";
import SearchBarTable from "../../../components/SearchBarTable";
import TableFilter from "../../../components/TableFilter";
import PaginationTable from "../../../components/PaginationTable";
import { TableColumn } from "../../../types/tableTypes";
import { Dayjs } from "dayjs";

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
interface AppointmentCallLogsTabProps {
  isActive: boolean;
}

const AppointmentCallLogsTab: React.FC<AppointmentCallLogsTabProps> = ({
  isActive,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointmentVideoCallLogsTrainer, isLoading, error, pagination } =
    useSelector((state: RootState) => state.bookingSlot);
  const { totalPages, currentPage } = pagination;

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
    dispatch(getAppointmentVideoCallLogsTrainer(getQueryParams()));
  }, [
    dispatch,
    isActive,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const fetchedTrainerVideoCallLogs = appointmentVideoCallLogsTrainer.map(
    (log, index) => ({
      ...log,
      slno: index + 1 + (currentPage - 1) * 9,
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
    })
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
};

export default AppointmentCallLogsTab;
