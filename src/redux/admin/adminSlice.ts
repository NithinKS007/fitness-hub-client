import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./adminTypes";
import {
  getApprovalPendingList,
  getRevenueData,
  getTrainers,
  getUsers,
  trainerDetails,
  updatedApprovalStatus,
  updateUserBlockStatus,
  userDetails,
} from "./adminThunk";

const initialState: AdminState = {
  users: [],
  trainers: [],
  isLoading: false,
  error: null,
  userDetails: {},
  trainerDetails: {},
  revenueData: [],
  pagination: { totalPages: 0, currentPage: 1 },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //get users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.usersList;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch users";
      })
      //get trainers
      .addCase(getTrainers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainers.fulfilled, (state, action) => {
        console.log("actions", action.payload.data);
        state.isLoading = false;
        state.trainers = action.payload.data.trainersList;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
        state.error = null;
      })
      .addCase(getTrainers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch trainers";
      })
      //update  block status for trainer and user
      .addCase(updateUserBlockStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserBlockStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload.data;
        if (updatedUser.role === "user") {
          state.users = state?.users?.map((user) =>
            user._id === updatedUser._id
              ? { ...user, isBlocked: updatedUser.isBlocked }
              : user
          );
        } else if (updatedUser.role === "trainer") {
          state.trainers = state?.trainers?.map((trainer) =>
            trainer.userId === updatedUser._id
              ? { ...trainer, isBlocked: updatedUser.isBlocked }
              : trainer
          );
        }
        state.error = null;
      })

      .addCase(updateUserBlockStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update block status";
      })

      //get trainer approval list
      .addCase(getApprovalPendingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApprovalPendingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainers = action.payload.data.trainersList;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
        state.error = null;
      })
      .addCase(getApprovalPendingList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainers list for approval";
      })

      //approve or reject trainer
      .addCase(updatedApprovalStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedApprovalStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTrainer = action.payload.data;
        state.trainers = state.trainers.filter(
          (trainer) => trainer._id !== updatedTrainer._id
        );
        state.error = null;
      })
      .addCase(updatedApprovalStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update trainer approval status";
      })
      //get user details
      .addCase(userDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload.data;
        state.error = null;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to retrieve userDetails";
      })
      //get trainer details
      .addCase(trainerDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trainerDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainerDetails = action.payload.data;
        state.error = null;
      })
      .addCase(trainerDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to retrieve trainerDetails";
      })

      //get revenue history
      .addCase(getRevenueData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRevenueData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenueData = action.payload.data.revenueData;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
        state.error = null;
      })
      .addCase(getRevenueData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to retrieve revenueData";
      });
  },
});

export default adminSlice.reducer;
