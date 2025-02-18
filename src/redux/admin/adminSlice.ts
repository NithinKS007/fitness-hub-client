import { createSlice } from "@reduxjs/toolkit";
import { AdminState } from "./adminTypes";
import {
  getUsers,
  updatedApprovalStatus,
  updateUserBlockStatus,
  userDetails,
} from "./adminThunk";

const initialState: AdminState = {
  users: [],
  trainers: [],
  isLoading: false,
  error: null,
  userDetails : {}
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch users based on the role data
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg === "user") {
          state.users = action.payload.data;
        } else if (action.meta.arg === "trainer") {
          state.trainers = action.payload.data;
        }
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch users";
      })
      //update user block status
      .addCase(updateUserBlockStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserBlockStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUser = action.payload.data;
        if (updatedUser.role === "user") {
          state.users = state?.users?.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          );
        } else if (updatedUser.role === "trainer") {
          state.trainers = state?.trainers?.map((trainer) =>
            trainer._id === updatedUser._id ? updatedUser : trainer
          );
        }
        state.error = null;
      })
      //fetch list to approve or reject trainer
      .addCase(updateUserBlockStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update block status";
      })
      .addCase(updatedApprovalStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedApprovalStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const { action:trainerAction } = action.meta.arg;
        const updatedUser = action.payload.data;

        if(trainerAction==="rejected"){
           state.trainers = state.trainers.filter((trainer)=>trainer._id!==updatedUser._id)
        } else {
          state.trainers = state?.trainers?.map((trainer) =>
            trainer._id === updatedUser._id ? updatedUser : trainer
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
        //fetching user or trainers details
        .addCase(userDetails.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(userDetails.fulfilled, (state,action) => {
          state.isLoading = false;
          state.userDetails = action.payload.data
          state.error = null;
        })
        .addCase(userDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.error =
            typeof action.payload === "string"
              ? action.payload
              : "Failed to retrieve userDetails";
        })
  },
});

export default adminSlice.reducer;
