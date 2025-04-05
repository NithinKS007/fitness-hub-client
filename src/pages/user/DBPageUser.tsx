import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Timer, Pending, DirectionsRun } from "@mui/icons-material";
import DashBoardBox from "../../components/DashBoardBox";
import useUserDashBoard from "../../hooks/useUserDashBoard";
import LoadingSpinner from "../../components/LoadingSpinner";

const DBPageUser = () => {
  const {
    selectedTimePeriod,
    selectedBodyPart,
    handleTimePeriodChange,
    handleBodyPartChange,
    lineChartData,
    todaysTotalCompletedWorkouts,
    todaysTotalPendingWorkouts,
    totalWorkoutTime,
    isLoading,
    error,
    timePeriods,
    bodyParts,
  } = useUserDashBoard();

  if (isLoading) {
    return <LoadingSpinner size={60} thickness={4}/>
  }

  if (error) {
    return <> {error}</>;
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

  return (
    <>
      <Box sx={{ padding: 2 }}>
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
          <Box
            sx={{ display: "flex", justifyContent: "center", mb: 2, gap: 2 }}
          >
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
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
              Workout Progress (Completed Workouts)
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LineChart
                width={600}
                height={300}
                data={lineChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  label={{
                    value: "Weight Lifted (kg)",
                    angle: -90,
                    position: "insideLeft",
                    textAnchor: "middle",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Total weight"
                  stroke="#A9A9A9"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DBPageUser;
