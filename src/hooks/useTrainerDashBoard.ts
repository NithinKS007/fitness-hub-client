import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getTrainerDashBoardData } from "../redux/dashboard/dashboardThunk";
import { SelectChangeEvent } from "@mui/material/Select";


const useTrainerDashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("Today");

  const {
    trainerDashboard: {
      totalSubscribersCount,
      activeSubscribersCount,
      canceledSubscribersCount,
      chartData,
      pieChartData,
    },
    isLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(getTrainerDashBoardData({ period: selectedTimePeriod as string }));
  }, [dispatch, selectedTimePeriod]);

  const handleTimePeriodChange = (
    event: SelectChangeEvent<string>
  ) => {

    console.log(event.target.value,"i am target")
    setSelectedTimePeriod(event.target.value as string);
  };

  const transformedChartData = chartData.map((item) => ({
    ...item,
    Total: item.total,
    Active: item.active,
    Canceled: item.canceled,
  }));

  const colorMapping: Record<string, string> = {
    quarterly: "#8884d8",
    monthly: "#82ca9d",
    halfYearly: "#ff7300",
    yearly: "#d0ed57",
  };
  const timePeriods = ["Today", "This week", "This month", "This year"];
  const allPeriods = ["quarterly", "monthly", "halfYearly", "yearly"];
  const pieChartFormattedData = allPeriods.map((period) => {
    const periodData = pieChartData?.find((item) => item._id === period);

    return {
      name: period,
      value: periodData ? periodData.value : 0,
      color: colorMapping[period] || "#8884d8",
    };
  });

  return {
    selectedTimePeriod,
    handleTimePeriodChange,
    totalSubscribersCount,
    activeSubscribersCount,
    canceledSubscribersCount,
    transformedChartData,
    pieChartFormattedData,
    isLoading,
    error,
    timePeriods,
  };
};

export default useTrainerDashBoard;
