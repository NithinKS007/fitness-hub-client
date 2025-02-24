import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionState } from "./subscriptionTypes";
import { addSubscription, getTrainerSubscriptions } from "./subscriptionThunk"; 

const initialState: SubscriptionState = {
  isLoading: false,
  error: null,
  subscriptions: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //add subscriptions
      .addCase(addSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.subscriptions.push(action.payload.data);
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add subscription";
      })

      //get trainer subscriptions
      .addCase(getTrainerSubscriptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainerSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.subscriptions = action.payload.data
      })
      .addCase(getTrainerSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer subscriptions";
      });
  },
});

export default subscriptionSlice.reducer;
