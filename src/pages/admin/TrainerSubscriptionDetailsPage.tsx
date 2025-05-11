import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import useSubscription from "../../hooks/useSubscription";
import ReuseTable from "../../components/table/ReuseTable";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTrainerSubscriptionById } from "../../redux/subscription/subscriptionThunk";
import { TableColumn } from "../../types/tableTypes";
import Error from "../../components/shared/Error";
import ShimmerTableLoader from "../../components/table/ShimmerTable";
import NavigationTabs from "../../components/Tabs";

const tabItems = [{ label: "Trainer-Subscriptions" }];

const TrainerSubscriptionDetailsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { subscriptions } = useSubscription();

  const { _id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const trainerSubscriptionData = useSelector(
    (state: RootState) => state.subscription.subscriptions
  );

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );

  useEffect(() => {
    if (_id) {
      dispatch(getTrainerSubscriptionById(_id));
    }
  }, [dispatch, _id]);

  const columns: TableColumn[] = [
    { label: "Sl No", field: "slno" },
    { label: "Subscription Period", field: "subPeriod" },
    { label: "Price", field: "price" },
    { label: "Duration in Weeks", field: "durationInWeeks" },
    { label: "Sessions Per Week", field: "sessionsPerWeek" },
    { label: "Total Sessions", field: "totalSessions" },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setSelectedTab(newValue);
  };
  const fetchedTrainerSubscriptionData =
    trainerSubscriptionData && trainerSubscriptionData.length > 0
      ? subscriptions.map((sub, index) => {
          return {
            ...sub,
            slno: index + 1,
            subPeriod:
              sub.subPeriod.charAt(0).toUpperCase() + sub.subPeriod.slice(1),
            price: `USD : ${sub.price}`,
          };
        })
      : [];

  return (
    <>
     <NavigationTabs
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      {selectedTab === 0 && (
        <Box sx={{ mt: 3 }}>
          {isLoading ? (
            <ShimmerTableLoader columns={columns} />
          ) : error ? (
            <Error message={error} />
          ) : (
            <ReuseTable columns={columns} data={fetchedTrainerSubscriptionData} />
          )}
        </Box>
      )}
    </>
  );
};

export default TrainerSubscriptionDetailsPage;
