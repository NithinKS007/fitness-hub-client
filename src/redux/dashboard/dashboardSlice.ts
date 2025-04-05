import { createSlice } from "@reduxjs/toolkit";
import { DashboardState } from "./dashboardTypes";
import { getAdminDashBoardData, getTrainerDashBoardData, getUserDashBoardData } from "./dashboardThunk";
const initialState: DashboardState = {
  isLoading: false,
  error: null,
  trainerDashboard: {
    totalSubscribersCount: 0,
    activeSubscribersCount: 0,
    canceledSubscribersCount: 0,
    chartData: [],
    pieChartData: [],
  },
  adminDashboard: {
    totalUsersCount: 0,
    totalTrainersCount: 0,
    pendingTrainerApprovalCount: 0,
    totalPlatFormFee:0,
    totalCommission:0,
    totalRevenue:0,
    chartData:[],
    topTrainersList:[]
  },
  userDashboard: {
    totalWorkoutTime: 0,
    todaysTotalPendingWorkouts: 0,
    todaysTotalCompletedWorkouts: 0,
    chartData:[],
    pieChartData:[]
  }
}

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder

    // get trainer dashboard slice
      .addCase(getTrainerDashBoardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainerDashBoardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null
        state.trainerDashboard.totalSubscribersCount = action.payload.data.totalSubscribersCount;
        state.trainerDashboard.activeSubscribersCount = action.payload.data.activeSubscribersCount;
        state.trainerDashboard.canceledSubscribersCount = action.payload.data.canceledSubscribersCount;
        state.trainerDashboard.chartData = action.payload.data.chartData;
        state.trainerDashboard.pieChartData = action.payload.data.pieChartData;

      })
      .addCase(getTrainerDashBoardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get user dashboard data";
      })

      .addCase(getAdminDashBoardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminDashBoardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null
        state.adminDashboard.totalUsersCount = action.payload.data.totalUsersCount;
        state.adminDashboard.totalTrainersCount = action.payload.data.totalTrainersCount;
        state.adminDashboard.pendingTrainerApprovalCount = action.payload.data.pendingTrainerApprovalCount;
        state.adminDashboard.totalPlatFormFee = action.payload.data.totalPlatFormFee;
        state.adminDashboard.totalRevenue = action.payload.data.totalRevenue;
        state.adminDashboard.totalCommission = action.payload.data.totalCommission;
        state.adminDashboard.chartData = action.payload.data.chartData;
        state.adminDashboard.topTrainersList = action.payload.data.topTrainersList;
      })
      .addCase(getAdminDashBoardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get admin dashboard data";
      })

      //get user dashboard data
      .addCase(getUserDashBoardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDashBoardData.fulfilled, (state, action) => {

        console.log("action",action.payload.data)
        state.isLoading = false;
        state.error = null
        state.userDashboard.totalWorkoutTime = action.payload.data.totalWorkoutTime;
        state.userDashboard.todaysTotalPendingWorkouts = action.payload.data.todaysTotalPendingWorkouts;
        state.userDashboard.todaysTotalCompletedWorkouts = action.payload.data.todaysTotalCompletedWorkouts;
        state.userDashboard.chartData = action.payload.data.chartData
      })
      .addCase(getUserDashBoardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get user dashboard data";
      })
  },
});

export default dashboard.reducer;
