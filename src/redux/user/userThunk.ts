import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { ListApprovedTrainersQuery } from "./userType";

export const getApprovedTrainers = createAsyncThunk(
  "user/getApprovedTrainers",
  async (params: ListApprovedTrainersQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("user/trainers", {
        params,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get approved trainers list");
      }
    }
  }
);
export const getTrainerDetailsWithSubscription = createAsyncThunk(
  "user/getTrainerDetailsWithSubscription",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`user/trainers/${_id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get approved trainers list");
      }
    }
  }
);
