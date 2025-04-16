import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { RequestChatMessages } from "./chatTypes";

export const fetchChatMessages = createAsyncThunk(
    "chat/fetchChatMessages",
    async ({senderId,receiverId}:RequestChatMessages, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`chat/get-chat/${senderId}/${receiverId}`);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Failed to get chat messages");
        }
      }
    }
)

export const getTrainerChatList = createAsyncThunk(
  "chat/getTrainerChatList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`chat/trainer`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get trainer chat list");
      }
    }
  }
)

export const getUserChatList = createAsyncThunk(
  "chat/getUserChatList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`chat/user`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get user chat list");
      }
    }
  }
);

// export const markMessageAsRead = createAsyncThunk(
//   "chat/markMessageAsRead",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`chat/user`);
//       return response.data;
//     } catch (error: any) {
//       console.log(error);
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue("Failed to get user chat list");
//       }
//     }
//   }
// );


