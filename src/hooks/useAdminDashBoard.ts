import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState} from "../redux/store"
import { getAdminDashBoardData } from "../redux/dashboard/dashboardThunk";
import { SelectChangeEvent } from "@mui/material";

const useAdminDashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("This week");
  const timePeriods = ["Today", "This week", "This month", "This year"];

  const {
    adminDashboard: {
      totalUsersCount,
      totalTrainersCount,
      pendingTrainerApprovalCount,
      totalPlatFormFee,
      totalCommission,
      totalRevenue,
      chartData,
      topTrainersList,
    },
    isLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(getAdminDashBoardData({ period: selectedTimePeriod as string }));
  }, [dispatch, selectedTimePeriod]);

  const handleTimePeriodChange = (
    event: SelectChangeEvent<string>
  ) => {
    setSelectedTimePeriod(event.target.value as string);
  };

  const transformedChartData = chartData.map((item) => ({
    ...item,
    PlatformRevenue: item.platformRevenue,
    Commission: item.commission,
    TotalRevenue: item.totalRevenue,
  }));

  return {
    selectedTimePeriod,
    handleTimePeriodChange,
    totalUsersCount,
    totalTrainersCount,
    pendingTrainerApprovalCount,
    totalPlatFormFee,
    totalCommission,
    totalRevenue,
    transformedChartData,
    topTrainersList,
    isLoading,
    error,
    timePeriods
  };

}

export default useAdminDashBoard