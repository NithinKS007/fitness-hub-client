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
import { Box, IconButton } from "@mui/material";
import TableFilter from "../../components/TableFilter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommissionDetailsModal from "../../components/modals/CommissionDetailsModal";
import { formatCurrency } from "../../utils/conversion";

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
  { label: "Amount (USD)", field: "amountPaid" },
  { label: "Commission (USD)", field: "commission" },
  { label: "Platform (USD)", field: "platformRevenue" },
  { label: "Trainer (USD)", field: "trainerRevenue" },
  { label: "Status", field: "subscriptionStatus" },
  { label: "Period", field: "subscriptionPeriod" },
  { label: "More", field: "actions" },
];

interface ModalData {
  providedBy: { label: string; value: string }[];
  takenBy: { label: string; value: string }[];
  financial: { label: string; value: string }[];
}

interface SubscriptionItem {
  amountPaid: number;
  commission: number;
  platformRevenue: number;
  trainerRevenue: number;
  subscriptionProvidedBy: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
  subscriptionTakenBy: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
}

const CommissionHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

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

  const handleOpenModal = (item: SubscriptionItem) => {
    const values = [
      item.amountPaid,
      item.commission,
      item.platformRevenue,
      item.trainerRevenue,
    ];
    const maxLength = Math.max(...values.map((val) => val.toString().length));

    const preparedData: ModalData = {
      providedBy: [
        {
          label: "Name",
          value:
            `${item.subscriptionProvidedBy?.fname || ""} ${
              item.subscriptionProvidedBy?.lname || ""
            }`.trim() || "-",
        },
        {
          label: "Email",
          value: item.subscriptionProvidedBy?.email || "-",
        },
        {
          label: "Phone",
          value: item.subscriptionProvidedBy?.phone || "-",
        },
      ],
      takenBy: [
        {
          label: "Name",
          value:
            `${item.subscriptionTakenBy?.fname || ""} ${
              item.subscriptionTakenBy?.lname || ""
            }`.trim() || "-",
        },
        {
          label: "Email",
          value: item.subscriptionTakenBy?.email || "-",
        },
        {
          label: "Phone",
          value: item.subscriptionTakenBy?.phone || "-",
        },
      ],

      financial: [
        {
          label: "Amount Paid",
          value: formatCurrency(item.amountPaid, maxLength),
        },
        {
          label: "Commission",
          value: formatCurrency(item.commission, maxLength),
        },
        {
          label: "Platform",
          value: formatCurrency(item.platformRevenue, maxLength),
        },
        {
          label: "Trainer",
          value: formatCurrency(item.trainerRevenue, maxLength),
        },
      ],
    };

    setModalData(preparedData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(null);
  };

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
      <IconButton
        onClick={() => handleOpenModal(item)}
        sx={{ padding: "8px", minWidth: "0", width: "24px", height: "35px" }}
      >
        <MoreVertIcon sx={{ fontSize: "18px" }} />
      </IconButton>
    ),
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 1,
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
      <CommissionDetailsModal
        open={openModal}
        onClose={handleCloseModal}
        modalData={modalData}
      />
    </>
  );
};

export default CommissionHistory;
