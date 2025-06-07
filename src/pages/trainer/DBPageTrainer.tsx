import DashBoardBox from "../../components/dashboard/DashBoardBox";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { People } from "@mui/icons-material";
import LoadingSpinner from "../../components/LoadingSpinner";
import useTrainerDashBoard from "../../hooks/useTrainerDashBoard";
import ReusableLineChart from "../../components/dashboard/LineChart";
import ReusablePieChart from "../../components/dashboard/ReuseablePieChart";

const DBPageTrainer = () => {
  const {
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
  } = useTrainerDashBoard();

  if (isLoading) {
    return <LoadingSpinner size={60} thickness={4} />;
  }

  if (error) {
    return <> {error}</>;
  }

  const dashboardItems = [
    {
      content: "Total subscriptions",
      number: totalSubscribersCount,
      icon: <People className="text-gray-600" />,
    },
    {
      content: "Active subscriptions",
      number: activeSubscribersCount,
      icon: <People className="text-gray-600" />,
    },
    {
      content: "Canceled subscrptions",
      number: canceledSubscribersCount,
      icon: <People className="text-gray-600" />,
    },
  ];

  const lines = [
    { dataKey: "Total", stroke: "#8884d8" },
    { dataKey: "Active", stroke: "#82ca9d" },
    { dataKey: "Canceled", stroke: "#ff7300" },
  ];

  return (
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
                fontSize: "20px",
                color: "gray",
              }}
            >
              <Typography variant="h6">
                No data available for the selected time period
              </Typography>
            </Box>
          ) : (
            <ReusableLineChart
              data={transformedChartData}
              lines={lines}
              xAxisKey={"_id"}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <Box sx={{ flex: 1, height: 300 }}>
            <ReusablePieChart
              data={pieChartFormattedData}
              dataKey={"value"}
              outerRadius={"80%"}
              fill={"#8884d8"}
              labelLine={false}
            />
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", paddingLeft: 2 }}>
            <List sx={{ fontSize: 12 }}>
              {pieChartFormattedData?.map((entry, index) => (
                <ListItem key={index} sx={{ padding: "4px 0" }}>
                  <ListItemText
                    primary={`${entry.name.charAt(0).toUpperCase()}${entry.name
                      .split("")
                      .splice(1)
                      .join("")}`}
                    secondary={`Subscribers Count : ${entry.value}`}
                    sx={{ color: entry.color, fontSize: 12 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DBPageTrainer;
