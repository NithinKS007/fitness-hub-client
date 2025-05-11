import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getRevenueData } from "../../redux/admin/adminThunk";
import { useSelector } from "react-redux";
import ReuseTable from "../../components/table/ReuseTable";
import ShimmerTableLoader from "../../components/table/ShimmerTable";
import SearchBarTable from "../../components/table/SearchBarTable";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import DateAndTimeFilter from "../../components/table/DateFilter";
import PaginationTable from "../../components/PaginationTable";
import { Filter, TableColumn } from "../../types/tableTypes";
import { Dayjs } from "dayjs";
import { Box } from "@mui/material";
import TableFilter from "../../components/table/TableFilter";
import NavigationTabs from "../../components/Tabs";
import { formatDateTodddMMMDYYYY, formatPlanPeriod } from "../../utils/conversion";

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
  { label: "Date", field: "applicationDate" },
  { label: "Amount Paid", field: "amountPaid" },
  { label: "Commission", field: "commission" },
  { label: "Platform Revenue", field: "platformRevenue" },
  { label: "Trainer Revenue", field: "trainerRevenue" },
  { label: "Subscription Status", field: "subscriptionStatus" },
  { label: "Trainer Email", field: "subscriptionProvidedByEmail" },
  { label: "Trainer Ph No.", field: "subscriptionProvidedByPhone" },
  { label: "Subscriber Email", field: "subscriptionTakenByEmail" },
  { label: "Subscriber Phone", field: "subscriptionTakenByPhone" },
];

const tabItems = [{ label: "Commission history" }];
const CommissionHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
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
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("event", event);
    setSelectedTab(newValue);
  };
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

  const { revenueData, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.admin
  );

  const { currentPage, totalPages } = pagination;

  console.log("",revenueData)
  const transformedData = revenueData.map((item, index) => {
    const amountPaid = item.amountPaid;
    const commission = item.commission;
    const platformRevenue = item.platformRevenue;
    const trainerRevenue = item.trainerRevenue;

    return {
      slno: index + 1,
      applicationDate: formatDateTodddMMMDYYYY( item.createdAt),
      amountPaid: amountPaid,
      commission: commission,
      platformRevenue: platformRevenue,
      trainerRevenue: trainerRevenue,
      subscriptionStatus: formatPlanPeriod(
        item.subscriptionPlanData?.stripeSubscriptionStatus || "-"
      ),
      subscriptionPeriod: item.subscriptionPlanData?.subPeriod || "-",
      subscriptionProvidedBy:
        `${item.subscriptionProvidedBy?.fname || ""} ${item.subscriptionProvidedBy?.lname || ""}`.trim() ||
        "-",
      subscriptionProvidedByEmail: item.subscriptionProvidedBy?.email || "-",
      subscriptionProvidedByPhone: item.subscriptionProvidedBy?.phone || "-",
      subscriptionTakenBy:
        `${item.subscriptionTakenBy?.fname || ""} ${item.subscriptionTakenBy?.lname || ""}`.trim() ||
        "-",
      subscriptionTakenByEmail: item.subscriptionTakenBy?.email || "-",
      subscriptionTakenByPhone: item.subscriptionTakenBy?.phone || "-",
    };
  });

  return (
    <>
      <NavigationTabs
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      {selectedTab === 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              mt: 1.5,
              width: "100%",
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
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            gap={1}
            />
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
      )}
    </>
  );
};

export default CommissionHistory;
