import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { getRevenueData } from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";

import ReuseTable from "../../components/ReuseTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import SearchBarTable from "../../components/SearchBarTable";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import DateAndTimeFilter from "../../components/DateAndTimeFilter";
import PaginationTable from "../../components/PaginationTable";
import { Filter, TableColumn } from "../../types/tableTypes";
import { Dayjs } from "dayjs";
import { Box} from "@mui/material";
import TableFilter from "../../components/TableFilter";

const filter: Filter[] = [
  { value: "Active" },
  { value: "Canceled" },
  { value: "Incomplete" },
  { value: "Incomplete expired" },
  { value: "Trialing" },
  { value: "Past due" },
  { value: "Unpaid" },
  { value: "Paused" },
  { value: "Monthly" },
  { value: "Quarterly" },
  { value: "Yearly" },
  { value: "HalfYearly" },
];

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Subscription Taken Date", field: "applicationDate" },
  { label: "Amount Paid", field: "amountPaid" },
  { label: "Commission", field: "commission" },
  { label: "Platform Revenue", field: "platformRevenue" },
  { label: "Trainer Revenue", field: "trainerRevenue" },
  { label: "Sub. Status", field: "subscriptionStatus" },
  { label: "Sub. Period", field: "subscriptionPeriod" },
  { label: "Sub. Provided By", field: "providedByDetails" },
  { label: "Sub. Taken By", field: "takenByDetails" },
];


const CommissionHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(getRevenueData(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
    getQueryParams().fromDate,
    getQueryParams().toDate,
  ]);

  const { revenueData, isLoading, error,pagination } = useSelector(
    (state: RootState) => state.admin
  );

  const {currentPage,totalPages} = pagination
  console.log("state dat", revenueData, isLoading, error,currentPage,totalPages);


  const transformedData = revenueData.map((item, index) => ({
    slno: index + 1,
    amountPaid: item.amountPaid,
    commission: item.commission,
    platformRevenue: item.platformRevenue,
    trainerRevenue: item.trainerRevenue,
    subscriptionStatus: item.subscriptionPlanData?.stripeSubscriptionStatus,
    subscriptionPeriod: item.subscriptionPlanData?.subPeriod,
    providedByDetails: `${item.subscriptionProvidedBy?.fname} ${item.subscriptionProvidedBy?.lname}\n` +
                       `${item.subscriptionProvidedBy?.email}\n` +
                       `${item.subscriptionProvidedBy?.phone}\n`,
    takenByDetails: ` ${item.subscriptionTakenBy?.fname} ${item.subscriptionTakenBy?.lname}\n` +
                    `${item.subscriptionTakenBy?.email}\n` +
                    `${item.subscriptionTakenBy?.phone}\n`,
    applicationDate: new Date(item.createdAt).toLocaleString(), 
    userSubscriptionPlanId: item.userSubscriptionPlanId,
  }));
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 0,
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
            handleFilterChange={handleFilterChange}
            filter={filter}
          />
          <DateAndTimeFilter
            fromDate={fromDate as Dayjs | null}
            toDate={toDate as Dayjs | null}
            onFromDateChange={handleFromDateChange}
            onToDateChange={handleToDateChange}
            onReset={handleResetDates}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
            }}
          >
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }} />
      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <>
          <ReuseTable columns={columns} data={transformedData} />
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

export default CommissionHistory;
