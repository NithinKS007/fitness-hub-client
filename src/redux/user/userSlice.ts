import { createSlice } from "@reduxjs/toolkit";
import { userState } from "./userType";
import {
  getTrainerDetailsWithSubscription,
  getApprovedTrainers,
} from "./userThunk";

const initialState: userState = {
  isLoading: false,
  error: null,
  trainersList: [],
  trainerDetailsWithSubscription: null,
  trainerSuggestions: [],
  pagination: { totalPages: 0, currentPage: 1 },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //get approved trainers
      .addCase(getApprovedTrainers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApprovedTrainers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.trainersList = action.payload.data.trainersList;
        state.pagination.currentPage =
          action.payload.data.paginationData.currentPage;
        state.pagination.totalPages =
          action.payload.data.paginationData.totalPages;
      })
      .addCase(getApprovedTrainers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get approved trainers list";
      })

      //get approved trainer details
      .addCase(getTrainerDetailsWithSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainerDetailsWithSubscription.fulfilled, (state, action) => {
        console.log("payloaddata", action.payload.data);
        state.isLoading = false;
        state.error = null;
        state.trainerDetailsWithSubscription = action.payload.data;
      })
      .addCase(getTrainerDetailsWithSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer details with subscription";
      });
  },
});

export default user.reducer;
