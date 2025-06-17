import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAppointmentVideoCallLogsTrainer } from "../../../redux/booking/bookingThunk";
import ReuseTable from "../../../components/table/ReuseTable";
import ShimmerTableLoader from "../../../components/table/ShimmerTable";
import DateAndTimeFilter from "../../../components/table/DateFilter";
import { formatTime, getFormattedTimeRange } from "../../../utils/conversion";
import useSearchFilter from "../../../hooks/useSearchFilter";
import SearchBarTable from "../../../components/table/SearchBarTable";
import TableFilter from "../../../components/table/TableFilter";
import PaginationTable from "../../../components/Pagination";
import { TableColumn } from "../../../types/tableTypes";
import { Dayjs } from "dayjs";
import { GetProfilePic } from "../../../components/icons/IconIndex";
import { filters } from "../../../utils/timeOptions";
import Error from "../../../components/shared/Error";

const videoCallLogColumns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "userName" },
  { label: "Email", field: "userEmail" },
  { label: "Scheduled Date", field: "appointmentDate" },
  { label: "Scheduled Time", field: "appointmentTime" },
  { label: "Status", field: "appointmentStatus" },
  { label: "Call Start", field: "callStartTime" },
  { label: "Call End", field: "callEndTime" },
  { label: "Duration", field: "callDuration" },
  { label: "Call Status", field: "callStatus" },
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
      profilePic: GetProfilePic(log.userData.profilePic),
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
        <Error message={error} />
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
