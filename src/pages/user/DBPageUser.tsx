import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { Timer, Pending, DirectionsRun } from "@mui/icons-material";
import DashBoardBox from "../../components/dashboard/DashBoardBox";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReusableLineChart from "../../components/dashboard/LineChart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUserDashBoardData } from "../../redux/dashboard/dashboardThunk";
import { SelectChangeEvent } from "@mui/material/Select";

const DBPageUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<string>("This month");
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("All");
  const timePeriods = ["Today", "This week", "This month", "This year"];
  const bodyParts = [
    "All",
    "Chest",
    "Back",
    "Legs",
    "Arms",
    "Shouldrs",
    "Core",
  ];

  const {
    userDashboard: {
      chartData,
      todaysTotalCompletedWorkouts,
      todaysTotalPendingWorkouts,
      totalWorkoutTime,
    },
    isLoading,
    error,
  } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(
      getUserDashBoardData({
        period: selectedTimePeriod,
        bodyPart: selectedBodyPart,
      })
    );
  }, [dispatch, selectedTimePeriod, selectedBodyPart]);

  const handleTimePeriodChange = (event: SelectChangeEvent<string>) => {
    setSelectedTimePeriod(event.target.value);
  };

  const handleBodyPartChange = (event: SelectChangeEvent<string>) => {
    setSelectedBodyPart(event.target.value);
  };

  const lineChartData =
    chartData?.map((item: { id: string; totalWeight: number }) => ({
      date: item.id,
      "Total weight": item.totalWeight,
    })) || [];

  if (isLoading) {
    return <LoadingSpinner size={60} thickness={4} />;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography color="error">
          {typeof error === "string"
            ? error
            : "Unable to load your dashboard. Please try again later."}
        </Typography>
      </Box>
    );
  }

  const dashboardItems = [
    {
      content: "Total Duration (minutes)",
      number: totalWorkoutTime,
      icon: <Timer className="text-gray-600" />,
    },
    {
      content: "Today's Pending Workouts",
      number: todaysTotalPendingWorkouts,
      icon: <Pending className="text-gray-600" />,
    },
    {
      content: "Today's Completed Workouts",
      number: todaysTotalCompletedWorkouts,
      icon: <DirectionsRun className="text-gray-600" />,
    },
  ];

  const lines = [{ dataKey: "Total weight", stroke: "#A9A9A9" }];
  return (
    <>
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          {dashboardItems.map((item, index) => (
            <Box key={index} sx={{ flex: 1 }}>
              <DashBoardBox
                content={item.content}
                number={item.number}
                icon={item.icon}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2, gap: 2 }}>
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

          <FormControl sx={{ width: 200 }}>
            <InputLabel>Body Part</InputLabel>
            <Select
              label="Body Part"
              value={selectedBodyPart}
              onChange={handleBodyPartChange}
            >
              {bodyParts.map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {lineChartData && lineChartData.length > 0 ? (
          <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
            Workout Progress (Completed)
          </Typography>
        ) : (
          ""
        )}

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1.5, height: 300 }}>
            {lineChartData && lineChartData.length === 0 ? (
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
                data={lineChartData}
                xAxisKey="date"
                yAxisValue="Weight Lifted (kg)"
                lines={lines}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DBPageUser;
