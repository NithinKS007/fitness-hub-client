import React, { useEffect } from "react";
import { Box } from "@mui/material";
import useSubscription from "../../hooks/useSubscription";
import ReuseTable from "../../components/ReuseTable";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getTrainerSubscriptionById } from "../../redux/subscription/subscriptionThunk";
import { TableColumn } from "../../types/tableTypes";
import Error from "../../components/Error";
import ShimmerTableLoader from "../../components/ShimmerTable";

const TrainerSubscriptionDetailsPage: React.FC = () => {
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

  if (isLoading) {
    return <ShimmerTableLoader columns={columns} />;
  }

  if (error) {
    return <Error message={error} />;
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: 4,
          marginBottom: "10px",
        }}
      ></Box>
      <ReuseTable columns={columns} data={fetchedTrainerSubscriptionData} />
    </>
  );
};

export default TrainerSubscriptionDetailsPage;
