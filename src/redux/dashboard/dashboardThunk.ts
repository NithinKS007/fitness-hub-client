import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";

export const getTrainerDashBoardData = createAsyncThunk(
    "dashboard/getTrainerDashBoardData",
    async ({ period }: { period: string }, { rejectWithValue }) => {

      console.log("query",period)
      try {
        const response = await axiosInstance.get(`trainer/dashboard/`,{params: { period }});
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
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`admin/dashboard/`);
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
