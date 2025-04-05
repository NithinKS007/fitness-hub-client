import DashBoardBox from "../../components/DashBoardBox";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import {
  People,
  Work,
  PendingActions,
  MonetizationOn,
  AccountBalanceWallet,
  TrendingUp,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { motion } from "framer-motion";
import useAdminDashBoard from "../../hooks/useAdminDashBoard";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReusableLineChart from "../../components/LineChart";

const DBPageAdmin = () => {
  const {
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
    timePeriods,
  } = useAdminDashBoard();

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

  const progressVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: "100%",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return <LoadingSpinner size={60} thickness={4} />;
  }

  if (error) {
    return <> {error}</>;
  }

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
              <ReusableLineChart
                data={transformedChartData}
                lines={[
                  { dataKey: "PlatformRevenue", stroke: "#8884d8" },
                  { dataKey: "Commission", stroke: "#82ca9d" },
                  { dataKey: "TotalRevenue", stroke: "#ff7300" },
                ]}
                xAxisKey={"_id"}
              />
              {/* <ResponsiveContainer width="100%" height="100%">
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
                    dataKey="PlatformRevenue"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Commission"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="TotalRevenue"
                    stroke="#ff7300"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer> */}
            </Box>
            <Box sx={{ flex: 1, height: 300 }}>
              <Typography variant="h6">Top 5 Trainers</Typography>
              {topTrainersList.map((trainer) => {
                const activePercentage =
                  (trainer.totalActiveSubscriptions /
                    trainer.totalSubscriptions) *
                    100 || 0;
                const canceledPercentage =
                  (trainer.totalCanceledSubscriptions /
                    trainer.totalSubscriptions) *
                    100 || 0;

                return (
                  <Box key={trainer._id} sx={{ mb: 2 }}>
                    <Typography>
                      {trainer.fname} {trainer.lname} (Total:{" "}
                      {trainer.totalSubscriptions})
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ width: 100 }}>
                        Active:
                      </Typography>
                      <Box sx={{ width: "100%", flexGrow: 1 }}>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={progressVariants}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={activePercentage}
                            sx={{
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: "#e0e0e0",
                            }}
                            color="success"
                          />
                        </motion.div>
                      </Box>
                      <Typography variant="body2">
                        {trainer.totalActiveSubscriptions}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ width: 100 }}>
                        Canceled:
                      </Typography>
                      <Box sx={{ width: "100%", flexGrow: 1 }}>
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={progressVariants}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={canceledPercentage}
                            sx={{
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: "#e0e0e0",
                            }}
                            color="error"
                          />
                        </motion.div>
                      </Box>
                      <Typography variant="body2">
                        {trainer.totalCanceledSubscriptions}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DBPageAdmin;
