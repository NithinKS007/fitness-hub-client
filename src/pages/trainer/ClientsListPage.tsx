import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTrainerSubscribedUsers } from "../../redux/subscription/subscriptionThunk";
import { useSelector } from "react-redux";
import ReuseTable from "../../components/ReuseTable";
import SearchBarTable from "../../components/SearchBarTable";
import Filter from "../../components/Filter";
import ShimmerTableLoader from "../../components/ShimmerTable";

interface TableColumn {
  label: string;
  field: string;
}
interface SortOption {
  value: string;
}

interface FilterOption {
  value: string;
}
const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Image", field: "profilePic" },
  { label: "Name", field: "name" },
  { label: "Email", field: "email" },
  { label: "Price", field: "price" },
  { label: "Start Date", field: "startDate" },
  { label: "Expiry Date", field: "endDate" },
  { label: "Subscription status", field: "isActive" },
  { label: "Subscription Period", field: "subPeriod" },
  { label: "Duration in Weeks", field: "durationInWeeks" },
  { label: "Sessions Per Week", field: "sessionsPerWeek" },
  { label: "Total Sessions", field: "totalSessions" },
];

const sort: SortOption[] = [
  { value: "10000 - 25000" },
  { value: "25000 - 50000" },
  { value: "50000 - 75000" },
  { value: "75000 - 100000" },
  { value: "above - 100000" },
];
const filter: FilterOption[] = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
  { value: "Monthly" },
  { value: "Quarterly" },
  { value: "Yearly" },
  { value: "Half Yearly" },
];
const ClientsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchSubscribersOfTrainer = async () => {
    dispatch(getTrainerSubscribedUsers());
  };

  useEffect(() => {
    fetchSubscribersOfTrainer();
  }, [dispatch]);

  const userSubscribedPlans = useSelector(
    (state: RootState) => state.subscription.subscribersOfTrainer
  );

  const { isLoading } = useSelector((state: RootState) => state.subscription);
  console.log("my plans", userSubscribedPlans);

  const isCheckBoxButtonNeeded = false;

  const fetchedUserSubscriptionsData =
    userSubscribedPlans.length > 0
      ? userSubscribedPlans.map((sub, index) => {
          const name = `${sub.subscribedUserDetails?.fname?.charAt(0).toUpperCase() + sub.subscribedUserDetails?.fname?.slice(1).toLowerCase()} ${sub.subscribedUserDetails?.lname?.charAt(0).toUpperCase() + sub.subscribedUserDetails?.lname?.slice(1).toLowerCase()}`;
          const price = `RS ${sub.price.toFixed(2)}`;
          const subPeriod =
            sub.subPeriod.charAt(0).toUpperCase() +
            sub.subPeriod.slice(1).toLowerCase();
          return {
            ...sub,
            slno: index + 1,
            image: sub.subscribedUserDetails.profilePic,
            name: name,
            email: sub.subscribedUserDetails.email,
            price: price,
            startDate: sub.startDate,
            endDate: sub.endDate,
            isActive: sub.isActive,
            subPeriod: subPeriod,
            durationInWeeks: sub.durationInWeeks,
            sessionsPerWeek: sub.sessionsPerWeek,
            totalSessions: sub.totalSessions,
          };
        })
      : [];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBarTable />
        <Filter filter={filter} />
      </div>

      {isLoading ? (
        <ShimmerTableLoader columns={columns} />
      ) : (
        <ReuseTable columns={columns} data={fetchedUserSubscriptionsData} />
      )}
    </>
  );
};

export default ClientsListPage;
