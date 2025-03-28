import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTrainerDashBoardData } from "../../redux/dashboard/dashboardThunk";
import DashBoardBox from "../../components/DashBoardBox";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {

  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { Box, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

const DBPageTrainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("Today");

  useEffect(() => {
    dispatch(getTrainerDashBoardData({ period: selectedTimePeriod }));
  }, [dispatch, selectedTimePeriod]);
  const handleTimePeriodChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTimePeriod(event.target.value as string);
  };

  const {
    totalSubscribersCount,
    activeSubscribersCount,
    canceledSubscribersCount,
  } = useSelector(
    (state: RootState) =>
      state.dashboard.trainerDashboard ?? {
        totalSubscribersCount: 0,
        activeSubscribersCount: 0,
        canceledSubscribersCount: 0,
      }
  );
  const chartData = useSelector((state: RootState) =>
    state.dashboard.trainerDashboard?.chartData
  );

  const pieChartData = useSelector((state: RootState) =>
    state.dashboard.trainerDashboard?.pieChartData
  );
  
  console.log("chart data",pieChartData)

  const { isLoading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <> {error}</>;
  }

  const colorMapping: Record<string, string> = {
    "quarterly": "#8884d8",  
    "monthly": "#82ca9d",   
    "halfYearly": "#ff7300",     
    "yearly": "#d0ed57",   
  };
  const allPeriods = ["quarterly", "monthly", "halfYearly", "yearly"];
  const pieChartFormattedData = allPeriods.map((period) => {
    const periodData = pieChartData?.find((item) => item._id === period);

    return {
      name: period,
      value: periodData ? periodData.value : 0,
      color: colorMapping[period] || "#8884d8",
    };
  });
  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <DashBoardBox
            content="Total subscribers"
            number={totalSubscribersCount}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DashBoardBox
            content="Active subscribers"
            number={activeSubscribersCount}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DashBoardBox
            content="Canceled subscribers"
            number={canceledSubscribersCount}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Time Period</InputLabel>
          <Select
            label="Time Period"
            value={selectedTimePeriod}
            onChange={handleTimePeriodChange}
           
          >
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This week">This week</MenuItem>
            <MenuItem value="This month">This month</MenuItem>
            <MenuItem value="This year">This year</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 1.5, height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="canceled"
                stroke="#ff7300"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <Box sx={{ flex: 1, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                  data={pieChartFormattedData}
                  dataKey="value"
                  outerRadius="80%"
                  fill="#8884d8"
                  labelLine={false}
                >
                  {pieChartFormattedData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", paddingLeft: 2 }}>
          <List sx={{ fontSize: 12 }}>
              {pieChartFormattedData?.map((entry, index) => (
                <ListItem key={index} sx={{ padding: "4px 0" }}>
                  <ListItemText
                    primary={`${entry.name.charAt(0).toUpperCase()}${entry.name.split("").splice(1).join("")}`}
                    secondary={`Number of subscribers : ${entry.value}`}
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
