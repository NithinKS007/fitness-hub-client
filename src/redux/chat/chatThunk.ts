import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { ChatQueryParams, RequestChatMessages } from "./chatTypes";

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (
    { senderId, receiverId }: RequestChatMessages,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `chats/messages/${senderId}/${receiverId}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get chat messages");
      }
    }
  }
);

export const getTrainerChatList = createAsyncThunk(
  "chat/getTrainerChatList",
  async (params: ChatQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`chats/trainer`, { params });
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
);

export const getUserChatList = createAsyncThunk(
  "chat/getUserChatList",
  async (params: ChatQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`chats/user`, { params });
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
