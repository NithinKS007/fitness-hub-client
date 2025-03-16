import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { createPlayList, AddVideo} from "./contentTypes";

export const addPlayList = createAsyncThunk(
    "content/addPlayList",
    async (title:createPlayList, { rejectWithValue }) => {

      console.log("title",title)
      try {
        const response = await axiosInstance.post(`trainer/create-playlist/`,title);
        return response.data;
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue("Failed to create playlist");
        }
      }
    }
);


export const getPlayListsOfTrainer = createAsyncThunk(
  "content/getPlayListsOfTrainer",
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`trainer/playlists/`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get playlists of trainer");
      }
    }
  }
);

export const addVideo = createAsyncThunk(
  "content/addVideos",
  async (createdVideoData:AddVideo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`trainer/upload-video/`,createdVideoData);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to upload video");
      }
    }
  }
);

export const getUploadedVideosOfTrainer = createAsyncThunk(
  "content/getUploadedVideosOfTrainer",
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get(`trainer/videos/`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get videos of trainer");
      }
    }
  }
);
