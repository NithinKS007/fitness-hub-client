import DashBoardBox from "../../components/dashboard/DashBoardBox";
import { Box, Typography } from "@mui/material";
import {
  People,
  Work,
  PendingActions,
  MonetizationOn,
  AccountBalanceWallet,
  TrendingUp,
} from "@mui/icons-material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReusableLineChart from "../../components/dashboard/LineChart";
import ProgressBar from "../../components/dashboard/ProgressBar";
import Error from "../../components/shared/Error";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAdminDashBoardData } from "../../redux/dashboard/dashboardThunk";
import { SelectChangeEvent } from "@mui/material";

const DBPageAdmin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<string>("This week");
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
    dispatch(getAdminDashBoardData({ period: selectedTimePeriod }));
  }, [dispatch, selectedTimePeriod]);

  const handleTimePeriodChange = (event: SelectChangeEvent<string>) => {
    setSelectedTimePeriod(event.target.value);
  };

  const transformedChartData = chartData.map((item) => ({
    ...item,
    PlatformRevenue: item.platformRevenue,
    Commission: item.commission,
    TotalRevenue: item.totalRevenue,
  }));

  const dashboardItems = [
    {
      content: "Total users",
      number: totalUsersCount,
      icon: <People className="text-gray-600" />,
    },
    {
      content: "Total trainers",
      number: totalTrainersCount,
      icon: <Work className="text-gray-600" />,
    },
    {
      content: "Pending Approvals",
      number: pendingTrainerApprovalCount,
      icon: <PendingActions className="text-gray-600" />,
    },
    {
      content: "Total Platform Fee",
      number: totalPlatFormFee,
      icon: <AccountBalanceWallet className="text-gray-600" />,
    },
    {
      content: "Total Commission",
      number: totalCommission,
      icon: <MonetizationOn className="text-gray-600" />,
    },
    {
      content: "Total Revenue",
      number: totalRevenue,
      icon: <TrendingUp className="text-gray-600" />,
    },
  ];

  const lines = [
    { dataKey: "PlatformRevenue", stroke: "#8884d8" },
    { dataKey: "Commission", stroke: "#82ca9d" },
    { dataKey: "TotalRevenue", stroke: "#ff7300" },
  ];

  const trainersWithPercentages = topTrainersList.map((trainer) => ({
    ...trainer,
    activePercentage:
      (trainer?.totalActiveSubscriptions / trainer?.totalSubscriptions) * 100 ||
      0,
    canceledPercentage:
      (trainer?.totalCanceledSubscriptions / trainer?.totalSubscriptions) *
        100 || 0,
  }));

  if (isLoading) {
    return <LoadingSpinner size={60} thickness={4} />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {dashboardItems.map((item, index) => (
            <Box key={index} sx={{ flex: 1 }}>
              <DashBoardBox
                content={item?.content}
                number={item?.number}
                icon={item?.icon}
              />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Time Period</InputLabel>
            <Select
              label="Time Period"
              value={selectedTimePeriod}
              onChange={handleTimePeriodChange}
            >
              {timePeriods.map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1.5, height: 300 }}>
            {transformedChartData.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: "16px",
                  color: "gray",
                }}
              >
                <Typography variant="h6">
                  Not available for the selected time period.
                </Typography>
              </Box>
            ) : (
              <ReusableLineChart
                data={transformedChartData}
                lines={lines}
                xAxisKey={"id"}
              />
            )}
          </Box>
          <Box sx={{ flex: 1, height: 300 }}>
            <Typography variant="h6">Top 5 Trainers</Typography>
            {trainersWithPercentages.map((trainer) => (
              <Box key={trainer?.id} sx={{ mb: 2 }}>
                <Typography>
                  {trainer?.fname} {trainer?.lname} (Total:{" "}
                  {trainer?.totalSubscriptions})
                </Typography>
                <ProgressBar
                  label="Active"
                  value={trainer?.activePercentage}
                  count={trainer?.totalActiveSubscriptions}
                  color="success"
                  labelWidth={100}
                  height={10}
                />
                <ProgressBar
                  label="Canceled"
                  value={trainer?.canceledPercentage}
                  count={trainer?.totalCanceledSubscriptions}
                  color="error"
                  labelWidth={100}
                  height={10}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DBPageAdmin;
