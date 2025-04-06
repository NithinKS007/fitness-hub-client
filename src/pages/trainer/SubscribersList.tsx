import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTrainerSubscribedUsers } from "../../redux/subscription/subscriptionThunk";
import { useSelector } from "react-redux";
import ReuseTable from "../../components/ReuseTable";
import SearchBarTable from "../../components/SearchBarTable";
import ShimmerTableLoader from "../../components/ShimmerTable";
import { Box } from "@mui/material";
import TableFilter from "../../components/TableFilter";
import useSearchFilter from "../../hooks/useSearchFilterTable";
import PaginationTable from "../../components/PaginationTable";
import { TableColumn,Filter } from "../../types/tableTypes";

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Profile", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Amount", field: "price" },
  { label: "Start Date", field: "startDate" },
  { label: "Expiry Date", field: "endDate" },
  { label: "status", field: "isActive" },
  { label: "Period", field: "subPeriod" },
  { label: "Duration (Weeks)", field: "durationInWeeks" },
  { label: "Sessions/Week", field: "sessionsPerWeek" },
  { label: "Total Sessions", field: "totalSessions" },
];

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
  { value: "HalfYearly" }
];

const SubscribersListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    subscribersOfTrainer: userSubscribedPlans,
    isLoading,
    error,
    pagination: { totalPages, currentPage },
  } = useSelector((state: RootState) => state.subscription);

  const {
    handlePageChange,
    searchTerm,
    handleSearchChange,
    selectedFilter,
    handleFilterChange,
    getQueryParams,
  } = useSearchFilter();

  useEffect(() => {
    dispatch(getTrainerSubscribedUsers(getQueryParams()));
  }, [
    dispatch,
    getQueryParams().page,
    getQueryParams().search,
    getQueryParams().filters,
  ]);

  const fetchedUserSubscriptionsData =
    userSubscribedPlans.length > 0
      ? userSubscribedPlans.map((sub, index) => {
          const name = `${sub.subscribedUserData?.fname?.charAt(0).toUpperCase() + sub.subscribedUserData?.fname?.slice(1).toLowerCase()} ${sub.subscribedUserData?.lname?.charAt(0).toUpperCase() + sub.subscribedUserData?.lname?.slice(1).toLowerCase()}`;
          const price = `$${sub.price.toFixed(0)}`;
          const subPeriod =
            sub.subPeriod.charAt(0).toUpperCase() +
            sub.subPeriod.slice(1).toLowerCase();
          const isActive =
            sub.isActive.charAt(0).toUpperCase() + sub.isActive.slice(1);
          return {
            ...sub,
            slno: index + 1 + (currentPage - 1) * 9,
            image: sub.subscribedUserData.profilePic,
            name: name,
            email: sub.subscribedUserData.email,
            price: price,
            startDate: sub.startDate,
            endDate: sub.endDate,
            isActive: isActive,
            subPeriod: subPeriod,
          };
        })
      : [];

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between",mt:5}}>
        <SearchBarTable
          searchTerm={searchTerm as string}
          handleSearchChange={handleSearchChange}
        />
        <TableFilter
          filter={filter}
          selectedFilter={selectedFilter as string[]}
          handleFilterChange={handleFilterChange}
        />
      </Box>

      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : error ? (
        <Box>{error}</Box>
      ) : (
        <>
          <ReuseTable columns={columns} data={fetchedUserSubscriptionsData} />
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

export default SubscribersListPage;
