import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { TrainersQuery } from "./userType";

export const getApprovedTrainers = createAsyncThunk(
  "user/getApprovedTrainers",
  async (params: TrainersQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("public/trainers", {
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
export const getTrainerWithSubscription = createAsyncThunk(
  "user/getTrainerWithSubscription",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`public/trainers/${id}`);
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
