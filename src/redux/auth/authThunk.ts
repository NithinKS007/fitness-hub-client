import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { User } from "./authTypes";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ userData }: { userData: User }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/signup", userData);
      return response.data
    } catch (error: any) {
        console.log(error)
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to create user");
      }
    }
  }
);
