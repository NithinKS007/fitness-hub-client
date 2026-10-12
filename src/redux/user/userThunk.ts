import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { TrainersQuery } from "./userType";
import { getApiErrorMessage } from "../../api/contracts";
import type { ApiResponse, TrainerListData } from "../../api/contracts";
import type { Trainer, TrainerWithSubscriptionDetails } from "../auth/authTypes";

export const getApprovedTrainers = createAsyncThunk(
  "user/getApprovedTrainers",
  async (params: TrainersQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ApiResponse<TrainerListData<Trainer>>>("public/trainers", {
        params,
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Failed to get approved trainers list")
      );
    }
  }
);
export const getTrainerWithSubscription = createAsyncThunk(
  "user/getTrainerWithSubscription",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<ApiResponse<TrainerWithSubscriptionDetails>>(`public/trainers/${id}`);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Failed to get trainer details")
      );
    }
  }
);
