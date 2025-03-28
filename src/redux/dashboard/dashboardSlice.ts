import { createSlice } from "@reduxjs/toolkit";
import { DashboardState } from "./dashboardTypes";
import { getAdminDashBoardData, getTrainerDashBoardData } from "./dashboardThunk";
const initialState: DashboardState = {
  isLoading: false,
  error: null,
  trainerDashboard:null,
  adminDashboard:null,
  userDashboard:null
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
        if (state.trainerDashboard === null) {
          state.trainerDashboard = {
            chartData:[],
            pieChartData:[],
            totalSubscribersCount: 0,
            activeSubscribersCount: 0,
            canceledSubscribersCount: 0,
          };
        }
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
            : "Failed to create playlist";
      })

      .addCase(getAdminDashBoardData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminDashBoardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null
        if (state.adminDashboard === null) {
          state.adminDashboard = {
            
            totalUsersCount: 0,
            totalTrainersCount: 0,
            pendingTrainerApprovalCount: 0,
          };
        }
        state.adminDashboard.totalUsersCount = action.payload.data.totalUsersCount;
        state.adminDashboard.totalTrainersCount = action.payload.data.totalTrainersCount;
        state.adminDashboard.pendingTrainerApprovalCount = action.payload.data.pendingTrainerApprovalCount;

      })
      .addCase(getAdminDashBoardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to create playlist";
      })
    
  },
});

export default dashboard.reducer;
