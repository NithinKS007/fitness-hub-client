import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./adminTypes";
import {
  getApprovalPendingList,
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
  trainerDetails: {}
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch users
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch users";
      })
      //fetch trainers
      .addCase(getTrainers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainers = action.payload.data;
        state.error = null;
      })
      .addCase(getTrainers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch trainers";
      })
      //update  block status
      .addCase(updateUserBlockStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserBlockStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload.data;
        if (updatedUser.role === "user") {
          state.users = state?.users?.map((user) =>
            user._id === updatedUser._id ? {...user,isBlocked:updatedUser.isBlocked}: user
          );
        } else if (updatedUser.role === "trainer") {
          state.trainers = state?.trainers?.map((trainer) =>
            trainer.userId === updatedUser._id ?{...trainer,isBlocked:updatedUser.isBlocked}: trainer
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

      //fetch trainer approval list
      .addCase(getApprovalPendingList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApprovalPendingList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainers = action.payload.data
        state.error = null
      })
      .addCase(getApprovalPendingList.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainers list for approval";
      })

      //fetch  approve or reject trainer
      .addCase(updatedApprovalStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedApprovalStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const { action: trainerAction } = action.meta.arg;
        const updatedTrainer = action.payload.data;

        if (trainerAction === "rejected") {
          state.trainers = state.trainers.filter(
            (trainer) => trainer._id !== updatedTrainer._id
          );
        } else {
          state.trainers = state?.trainers?.map((trainer) =>
            trainer._id === updatedTrainer._id ? updatedTrainer : trainer
          );
          state.error = null;
        }
      })
      .addCase(updatedApprovalStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update trainer approval status";
      })
      //fetching user details
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
      });

  },
});

export default adminSlice.reducer;
