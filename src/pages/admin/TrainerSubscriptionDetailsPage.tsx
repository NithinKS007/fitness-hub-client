import React, { useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import useSubscription from "../../hooks/useSubscription";
import ReuseTable from "../../components/ReuseTable";
import Filter from "../../components/Filter";
import SearchBarTable from "../../components/SearchBarTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTrainerSubscriptionById } from "../../redux/subscription/subscriptionThunk";

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

const TrainerSubscriptionDetailsPage: React.FC = () => {
  const { subscriptions, UpdateSubsBlockstatus } =
    useSubscription();

  const { _id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const fetchTrainerSubscriptionData = async () => {
    await dispatch(getTrainerSubscriptionById(_id!!));
  };

  const trainerSubscriptionData = useSelector(
    (state: RootState) => state.subscription.subscriptions
  );

  useEffect(() => {
    fetchTrainerSubscriptionData();
  }, [dispatch]);

  const columns: TableColumn[] = [
    { label: "Sl No", field: "slno" },
    { label: "Subscription Period", field: "subPeriod" },
    { label: "Price", field: "price" },
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

  const fetchedTrainerSubscriptionData =
    trainerSubscriptionData && trainerSubscriptionData.length > 0
      ? subscriptions.map((sub, index) => {
          return {
            ...sub,
            slno: index + 1,
            subPeriod:
              sub.subPeriod.charAt(0).toUpperCase() + sub.subPeriod.slice(1),
          };
        })
      : [];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      ></Box>
      <div className="flex justify-between ml-15 ">
        <SearchBarTable />
        <Filter sort={sort} filter={filter} />
      </div>
      <div className="ml-15">
        <ReuseTable
          columns={columns}
          data={fetchedTrainerSubscriptionData}
          handleUpdateBlockStatus={UpdateSubsBlockstatus}
        />
      </div>
    </>
  );
};

export default TrainerSubscriptionDetailsPage;
