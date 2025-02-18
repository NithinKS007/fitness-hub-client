import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../config/axios";
import { Role } from "../auth/authTypes";
import { RequestTrainerVerification, updateBlockStatus } from "./adminTypes";

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (role: Role, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/users?role=${role}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch users");
      }
    }
  }
);
export const updateUserBlockStatus = createAsyncThunk(
  "admin/updateUserBlockStatus",
  async ({ _id, isBlocked }: updateBlockStatus, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.patch(`/admin/users/${_id}`, {
        isBlocked,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update block");
      }
    }
  }
);

export const updatedApprovalStatus = createAsyncThunk(
  "admin/updatedApprovalStatus",
  async ({ _id, action }: RequestTrainerVerification, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.patch(`/admin/trainers/${_id}`, {
        action,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update trainer approval status");
      }
    }
  }
)

export const userDetails = createAsyncThunk(
  "admin/userDetails",
  async (_id : string, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/users/${_id}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to retrieve user details");
      }
    }
  }
);
