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

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import { Box, List, ListItem, ListItemText } from "@mui/material";
import { People } from "@mui/icons-material";
import LoadingSpinner from "../../components/LoadingSpinner";
import useTrainerDashBoard from "../../hooks/useTrainerDashBoard";

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
      content: "Total subscribers",
      number: totalSubscribersCount,
      icon: <People className="text-gray-600" />,
    },
    {
      content: "Active subscribers",
      number: activeSubscribersCount,
      icon: <People className="text-gray-600" />,
    },
    {
      content: "Canceled subscribers",
      number: canceledSubscribersCount,
      icon: <People className="text-gray-600" />,
    },
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={transformedChartData}
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
                dataKey="Total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Active"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Canceled"
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
