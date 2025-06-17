import { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAppointmentVideoCallLogsUser } from "../../../redux/booking/bookingThunk";
import ReuseTable from "../../../components/table/ReuseTable";
import ShimmerTableLoader from "../../../components/table/ShimmerTable";
import DateAndTimeFilter from "../../../components/table/DateFilter";
import SearchBarTable from "../../../components/table/SearchBarTable";
import { formatTime, getFormattedTimeRange } from "../../../utils/conversion";
import useSearchFilter from "../../../hooks/useSearchFilter";
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
  { label: "Name", field: "trainerName" },
  { label: "Email", field: "trainerEmail" },
  { label: "Scheduled Date", field: "appointmentDate" },
  { label: "Scheduled Time", field: "appointmentTime" },
  { label: "Current Status", field: "appointmentStatus" },
  { label: "Call Start Time", field: "callStartTime" },
  { label: "Call End Time", field: "callEndTime" },
  { label: "Call Duration", field: "callDuration" },
  { label: "Call Status", field: "callStatus" },
];

interface CallLogsTabProps {
  isActive: boolean;
}

const CallLogsTab: React.FC<CallLogsTabProps> = ({ isActive }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { appointmentVideoCallLogsUser, isLoading, error, pagination } =
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
    if (isActive) {
      dispatch(getAppointmentVideoCallLogsUser(getQueryParams()));
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

  const fetchedUserVideoCallLogs = appointmentVideoCallLogsUser.map(
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
      trainerName: `${log.trainerData.fname} ${log.trainerData.lname}`,
      trainerEmail: log.trainerData.email,
      profilePic: GetProfilePic(log.trainerData.profilePic as string),
    })
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
        <ShimmerTableLoader columns={videoCallLogColumns} />
      ) : error ? (
        <Error message={error} />
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
};

export default CallLogsTab;
