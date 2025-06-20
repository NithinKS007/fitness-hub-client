import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "../../config/axios";
import {
  TrainersListQueryParams,
  UsersListQueryParams,
  InboxListQueryParams,
  RequestTrainerDetails,
  RequestTrainerVerification,
  RequestUserDetails,
  updateBlockStatus,
  RevenueDataQueryParams,
} from "./adminTypes";

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (params: UsersListQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/users`, { params });
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
  async (params: TrainersListQueryParams, { rejectWithValue }) => {
    try {
      console.log("params for searching and filtering", params);
      const response = await axiosinstance.get(`/admin/trainers`, { params });
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
  async (params: InboxListQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/trainers/approval/`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get trainers list for approval");
      }
    }
  }
);

export const updatedApprovalStatus = createAsyncThunk(
  "admin/updatedApprovalStatus",
  async ({ _id, action }: RequestTrainerVerification, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.patch(
        `/admin/trainers/${_id}/approval`,
        {
          action,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update trainer approval status");
      }
    }
  }
);

export const userDetails = createAsyncThunk(
  "admin/userDetails",
  async ({ _id }: RequestUserDetails, { rejectWithValue }) => {
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
  async ({ _id }: RequestTrainerDetails, { rejectWithValue }) => {
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

export const getRevenueData = createAsyncThunk(
  "admin/getRevenueData",
  async (params: RevenueDataQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get(`/admin/revenue/`, { params });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to retrieve revenue data");
      }
    }
  }
);
