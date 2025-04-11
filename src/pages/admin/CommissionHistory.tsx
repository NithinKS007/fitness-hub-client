import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
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
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import TableFilter from "../../components/TableFilter";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  { label: "Amount", field: "amountPaid" },
  { label: "Commission", field: "commission" },
  { label: "Platform", field: "platformRevenue" },
  { label: "Trainer", field: "trainerRevenue" },
  { label: "Status", field: "subscriptionStatus" },
  { label: "Period", field: "subscriptionPeriod" },
  { label: "More", field: "actions" },
];

const CommissionHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const openMenu = Boolean(anchorEl);

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

  const { revenueData, isLoading, error, pagination } = useSelector(
    (state: RootState) => state.admin
  );

  const { currentPage, totalPages } = pagination;
  const transformedData = revenueData.map((item, index) => ({
    slno: index + 1,
    amountPaid: item.amountPaid,
    commission: item.commission,
    platformRevenue: item.platformRevenue,
    trainerRevenue: item.trainerRevenue,
    subscriptionStatus:
      item.subscriptionPlanData?.stripeSubscriptionStatus || "-",
    subscriptionPeriod: item.subscriptionPlanData?.subPeriod || "-",
    applicationDate: new Date(item.createdAt).toLocaleDateString("en-GB"),
    actions: (
      <>
        <IconButton
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            setSelectedItem(item);
          }}
          sx={{ padding: "8px", minWidth: "0", width: "24px", height: "35px" }}
        >
          <MoreVertIcon sx={{ fontSize: "18px" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu && selectedItem === item}
          onClose={() => {
            setAnchorEl(null);
            setSelectedItem(null);
          }}
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
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: "100%",
                maxWidth: "600px",
                padding: 3,
                backgroundColor: "#f9fafb",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1f2937",
                    letterSpacing: "0.5px",
                  }}
                >
                  Provided By
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    "& > div": {
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        minWidth: "150px",
                        fontWeight: 500,
                        color: "#4b5563",
                      }}
                    >
                      Name:
                    </Typography>
                    <Typography sx={{ color: "#111827" }}>
                      {`${item.subscriptionProvidedBy?.fname || ""} ${
                        item.subscriptionProvidedBy?.lname || ""
                      }`.trim() || "-"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        minWidth: "150px",
                        fontWeight: 500,
                        color: "#4b5563",
                      }}
                    >
                      Email:
                    </Typography>
                    <Typography sx={{ color: "#111827" }}>
                      {item.subscriptionProvidedBy?.email || "-"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        minWidth: "150px",
                        fontWeight: 500,
                        color: "#4b5563",
                      }}
                    >
                      Phone:
                    </Typography>
                    <Typography sx={{ color: "#111827" }}>
                      {item.subscriptionProvidedBy?.phone || "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1f2937",
                    letterSpacing: "0.5px",
                  }}
                >
                  Taken By
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    "& > div": {
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        minWidth: "150px",
                        fontWeight: 500,
                        color: "#4b5563",
                      }}
                    >
                      Name:
                    </Typography>
                    <Typography sx={{ color: "#111827" }}>
                      {`${item.subscriptionTakenBy?.fname || ""} ${
                        item.subscriptionTakenBy?.lname || ""
                      }`.trim() || "-"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        minWidth: "150px",
                        fontWeight: 500,
                        color: "#4b5563",
                      }}
                    >
                      Email:
                    </Typography>
                    <Typography sx={{ color: "#111827" }}>
                      {item.subscriptionTakenBy?.email || "-"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        minWidth: "150px",
                        fontWeight: 500,
                        color: "#4b5563",
                      }}
                    >
                      Phone:
                    </Typography>
                    <Typography sx={{ color: "#111827" }}>
                      {item.subscriptionTakenBy?.phone || "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </MenuItem>
        </Menu>
      </>
    ),
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
