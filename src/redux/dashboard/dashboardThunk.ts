import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import {
  AdminDateRangeQuery,
  TrainerDateRangeQuery,
  UserDashboardQuery,
} from "./dashboardTypes";

export const getTrainerDashBoardData = createAsyncThunk(
  "dashboard/getTrainerDashBoardData",
  async (period: TrainerDateRangeQuery, { rejectWithValue }) => {
    console.log("query", period);
    try {
      const response = await axiosInstance.get(`trainers/dashboard/`, {
        params: { period: period },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get trainer dashboard details");
      }
    }
  }
);

export const getAdminDashBoardData = createAsyncThunk(
  "dashboard/getAdminDashBoardData",
  async (period: AdminDateRangeQuery, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`admins/dashboard/`, {
        params: { period: period },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get admin dashboard details");
      }
    }
  }
);

export const getUserDashBoardData = createAsyncThunk(
  "dashboard/getUserDashBoardData",
  async (QueryFilterData: UserDashboardQuery, { rejectWithValue }) => {
    try {
      const { period, bodyPart } = QueryFilterData;
      const response = await axiosInstance.get(`users/dashBoard/`, {
        params: { period: period, bodyPart: bodyPart },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get user dashboard details");
      }
    }
  }
);
