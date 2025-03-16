import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../config/axios";
import { RequestTrainerDetails, RequestTrainerVerification, RequestUserDetails, updateBlockStatus } from "./adminTypes";

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/users`);
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
export const getTrainers = createAsyncThunk(
  "admin/getTrainers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/trainers`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to fetch trainers");
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

export const getApprovalPendingList = createAsyncThunk(
  "admin/getApprovalPendingList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/pending-approval/`)
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get trainers list for approval");
      }
    }
  }
)

export const updatedApprovalStatus = createAsyncThunk(
  "admin/updatedApprovalStatus",
  async ({ _id, action }: RequestTrainerVerification, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.patch(`/admin/pending-approval/${_id}`, {
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
  async ({_id }: RequestUserDetails, { rejectWithValue }) => {
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

export const trainerDetails = createAsyncThunk(
  "admin/trainerDetails",
  async ({_id }: RequestTrainerDetails, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/trainers/${_id}`);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to retrieve trainer details");
      }
    }
  }
);