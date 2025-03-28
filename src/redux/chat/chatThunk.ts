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


