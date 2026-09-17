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
import ReusableLineChart from "../../components/dashboard/LineChart";
import ReusablePieChart from "../../components/dashboard/ReuseablePieChart";
import Error from "../../components/shared/Error";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTrainerDashBoardData } from "../../redux/dashboard/dashboardThunk";
import { SelectChangeEvent } from "@mui/material/Select";

const DBPageTrainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimePeriod, setSelectedTimePeriod] =
    useState<string>("This week");

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
    dispatch(getTrainerDashBoardData({ period: selectedTimePeriod }));
  }, [dispatch, selectedTimePeriod]);

  const handleTimePeriodChange = (event: SelectChangeEvent<string>) => {
    setSelectedTimePeriod(event.target.value);
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
    const periodData = pieChartData?.find((item) => item.id === period);
    return {
      name: period,
      value: periodData ? periodData.value : 0,
      color: colorMapping[period] || "#8884d8",
    };
  });

  if (isLoading) {
    return <LoadingSpinner size={60} thickness={4} />;
  }

  if (error) {
    return <Error message={error} />;
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
                Not available for the selected time period
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
