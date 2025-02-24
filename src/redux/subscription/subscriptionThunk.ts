import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { subscription } from "./subscriptionTypes";


export const addSubscription = createAsyncThunk(
    "auth/addSubscription",
    async (subscription: subscription, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("trainer/add-subscription", subscription);
        return response.data;
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Failed to add subscription");
        }
      }
    }
  );

  export const getTrainerSubscriptions = createAsyncThunk(
    "auth/getTrainerSubscriptions",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("trainer/subscriptions");
        return response.data;
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Failed to get trainer subscriptions");
        }
      }
    }
  );

  